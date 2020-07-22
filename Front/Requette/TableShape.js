TableShape = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "TableShape",
    T:"",

    init : function(attr)
    {
        this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));


        this.classLabel = new draw2d.shape.basic.Label({
            text:"ClassName",
            stroke:1,
            fontColor:"#5856d6",
            bgColor:"#f7f7f7",
            radius: this.getRadius(),
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        this.eventManager = new eventManager();
        this.eventManager.setParent(this);
        this.eventManager.setParent(this.eventManager);


        T = this;

        this.add(this.classLabel);
        let t = this;
        this.eventManager.addEventListener("updateTable",function(e){
            console.log(t);
            donne = [];
            if(t.children.get(1).figure['text']!== "id")
            {
                for (let index = 0; index < t.getLength(); index++) {
                    console.log(t.children.get(index).figure);
                    donne.push(t.children.get(index).figure.getText());
                }
                console.log(t.children.get(0).figure['text']);
                if(t.children.get(0).figure['text'] === "Message")
                {
                    t.sendUpdateMessage(donne);
                }
                else
                {
                    t.sendUpdateChoix(donne);
                }
            }
        });
    },



    /**
     * @method
     * Add an entity to the db shape
     *
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(txt, optionalIndex)
    {
        var label =new draw2d.shape.basic.Label({
            text:txt,
            stroke:0,
            radius:0,
            bgColor:null,
            padding:{left:10, top:3, right:10, bottom:5},
            fontColor:"#4a4a4a",
            resizeable:true,
            editor:new draw2d.ui.LabelEditor()
        });

//        label.installEditor(new draw2d.ui.LabelEditor());

        var input = label.createPort("input");
        var output= label.createPort("output");









        console.log(this);
        console.log(this.id);
        console.log(document.getElementById(this.id));
        console.log(label);
        input.setName("input_"+label.id);
        output.setName("output_"+label.id);

        var _table=this;
        label.on("contextmenu", function(emitter, event){
            $.contextMenu({
                selector: 'body',
                events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },
                callback: $.proxy(function(key, options)
                {
                    switch(key){
                        case "rename":
                            setTimeout(function(){
                                emitter.onDoubleClick();
                            },10);
                            break;
                        case "new":
                            setTimeout(function(){
                                _table.addEntity("_new_").onDoubleClick();
                            },10);
                            break;
                        case "delete":
                            // with undo/redo support
                            var cmd = new draw2d.command.CommandDelete(emitter);
                            emitter.getCanvas().getCommandStack().execute(cmd);
                        default:
                            break;
                    }

                },this),
                x:event.x,
                y:event.y,
                items:
                    {
                        "rename": {name: "Rename"},
                        "new":    {name: "New Entity"},
                        "sep1":   "---------",
                        "delete": {name: "Delete"}
                    }
            });
        });
        /*
        let x = this;
        const handler ={
            set(obj, prop, value) {
                if(prop === "text")
                {
                    donne = [];
                    if(x.children.get(1).figure['text']!== "id")
                    {
                        for (let index = 0; index < x.getLength()-1; index++) {
                            donne.push(x.children.get(1).figure.getText());
                        }
                        console.log("evenement activer");
                        sendUpdateMessage(donne);

                    }
                    return Reflect.set(...arguments);
                }
            }


        };
        const proxy = new Proxy(label,handler)
         */

        label.on("updateTable",function(){
            console.log("test");
            donne = [];
            if(x.children.get(1).figure['text']!== "id")
            {
                for (let index = 0; index < x.getLength()-1; index++) {
                    donne.push(x.children.get(1).figure.getText());
                }
                console.log("evenement activer");
                this.sendUpdateMessage(donne);

            }
        });


        if($.isNumeric(optionalIndex)){
            this.add(label, null, optionalIndex+1);
            this.T = this;
        }
        else{
            this.add(label);
            this.T = this;
        }
        let event = new CustomEvent('updateTable',{});
        console.log(this["classLabel"]);
        console.log(T["children"]);
        console.log(T["children"]["data"].length);
        console.log(this["children"]["data"]["1"]["figure"]["text"]);
        console.log(T["children"]["data"]["0"]["figure"]["text"]);
        console.log(label);

        label.getInputPort(0).on("connect", function (emitterPort, connection) {
                if(T["children"]["data"]["0"]["figure"]["text"] === "Message") {
                    console.log(connection['connection']['sourcePort']['parent']['parent']['children']['data']['0']["figure"].getText());
                    console.log(connection['connection']['targetPort']['parent']['parent']['children']['data']['0']["figure"].getText());

                    if (connection['connection']['sourcePort']['parent']['parent']['children']['data']['0']["figure"].getText() === "Choix") {
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['3']['figure'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                        //connection['connection']['sourcePort']['parent']['parent']['children']['data']['4']['figure'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());

                        console.log(connection['connection']['sourcePort']['parent']['parent']);
                        
                        connection['connection']['sourcePort']['parent']['parent'].eventManager.dispatchEvent(event);
                    } else {
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['5']['figure'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                        t = connection['connection']['sourcePort']['parent']['parent'];
                        console.log(t);
                        t.eventManager.dispatchEvent(event);
                    }
                    //Target Port
                }
                else
                {
                    console.log(connection['connection']['targetPort']["parent"]['parent']['children']['data']['3']['figure'].getText());
                    connection['connection']['sourcePort']['parent']['parent']['children']['data']['5']['figure'].setText(connection['connection']['targetPort']["parent"]['parent']['children']['data']['3']['figure'].getText());
                    connection['connection']['sourcePort']['parent']['parent']['children']['data']['4']['figure'].setText("1");
                    t = connection['connection']['sourcePort']['parent']['parent'];
                    T.eventManager.dispatchEvent(event);

                    connection['connection']['targetPort']["parent"]['parent']['children']['data']['4']['figure'].setText(connection['connection']['sourcePort']['parent']['parent']['children']['data']['1']['figure'].getText());
                    //Event enable to send request about the tableshap
                    t = connection['connection']['targetPort']['parent']['parent'];
                    T.eventManager.dispatchEvent(event);
                }

            });
        return label;
    },

    /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     *
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     *
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return (this.children.get(index+1).figure);
    },
    getLength:function()
    {
        let x = 0;
        this.children.each(function(i,e) {
        x++;
        });
        return  x;
    },



    /**
     * @method
     * Set the name of the DB table. Visually it is the header of the shape
     *
     * @param name
     */
    setName: function(name)
    {
        this.classLabel.setText(name);

        return this;
    },
    getName: function()
    {
        return this.classLabel["text"];


    },
    createMessageDb:function(object)
    {
        UrlGeneral = "http://localhost/";
        UrlMessage = "Dialogue/Routeur/Routeur.php/api/message/create/";
        nbDialogue = $("#selectDialogue").val();

        urls = (UrlGeneral+UrlMessage+nbDialogue);
        $.ajax({
            type: "GET",
            url: urls,
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function (response) {
                console.log(response);
                object.setText(JSON.parse(response));
            },

        });
    },
    createChoixDb:function(object)
    {
        UrlGeneral = "http://localhost/";
        UrlMessage = "Dialogue/Routeur/Routeur.php/api/choix/create/";
        nbDialogue = $("#selectDialogue").val();

        urls = (UrlGeneral+UrlMessage+nbDialogue);
        $.ajax({
            type: "GET",
            url: urls,
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function (response) {
                console.log();
                object.setText(JSON.parse(response)[0][0]);
            },

        });
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento= this._super();

        memento.name = this.classLabel.getText();
        memento.entities   = [];
        this.children.each(function(i,e){

            if(i>0){ // skip the header of the figure
                memento.entities.push({
                    text:e.figure.getText(),
                    id: e.figure.id
                });
            }
        });

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @return
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        this.setName(memento.name);

        if(typeof memento.entities !== "undefined"){
            $.each(memento.entities, $.proxy(function(i,e){
                var entity =this.addEntity(e.text);
                entity.id = e.id;
                entity.getInputPort(0).setName("input_"+e.id);
                entity.getOutputPort(0).setName("output_"+e.id);
            },this));
        }

        return this;
    },



//Requette Update message and choice
sendUpdateMessage:function(donnee) {
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/message/update";
    urls = (UrlGeneral+UrlMessage);
    console.log(donnee[4]);
    console.log(new Boolean(donnee[4]));
    let val;


    $.ajax({
        type: "POST",
        url: urls,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            "id":Number(donnee[1]),
            "text":donnee[2],
            "isAchoice": donnee[4],
            "idSuivant":Number(donnee[5]),
            "iddialogue":Number($("#selectDialogue").val())
        },
        success: function (response) {
            console.log(response);
        },

    });
},
sendUpdateChoix:function(donnee) {
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/choix/update";
    console.log(donnee);
    urls = (UrlGeneral+UrlMessage);
    $.ajax({
        type: "POST",
        url: urls,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            "id":Number(donnee[1]),
            "text":donnee[2],
            "idSuivant":Number(donnee[3]),
            "idMessage":Number(donnee[4]),
            "iddialogue":Number($("#selectDialogue").val()),
        },
        success: function (response) {
            console.log(response);
        },
        error: function (resultat, statut, erreur) {
            console.log(resultat);

        },

    });
},

 CreateMesageDb:function(object)
{
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/message/create/";
    nbDialogue = $("#selectDialogue").val();

    urls = (UrlGeneral+UrlMessage+nbDialogue);
    $.ajax({
        type: "GET",
        url: urls,
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: function (response) {
            alert(response);
            object.children.get(1).setText(JSON.parse(response));
        },

    });
},
DeleteMessage:function(del) {
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/message/delete";

    urls = (UrlGeneral+UrlMessage);

    $.ajax({
        type: "POST",
        url: urls,
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            "id":del,
        },
        success: function (response) {

        },

    });


},
DeleteChoice:function(del) {
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/message/delete";

    urls = (UrlGeneral + UrlMessage);

    $.ajax({
        type: "POST",
        url: urls,
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            "id": del,
        },
        success: function (response) {

        },

    });


}
});
class eventManager extends EventTarget{

    constructor() {
        super();

    }
    setParent = function(o) {
        if (o.nodes != undefined) {
            for (n in o.nodes) {
                o.nodes[n].parent = o;
                setParent(o.nodes[n]);
            }
        }
    }
}
