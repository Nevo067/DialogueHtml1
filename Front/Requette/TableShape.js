TableShape = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "TableShape",

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




        this.add(this.classLabel);
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







        console.log(input.text);
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
                sendUpdateMessage(donne);

            }
        });


        if($.isNumeric(optionalIndex)){
            this.add(label, null, optionalIndex+1);
        }
        else{
            this.add(label);
        }


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
                console.log(response);
                object.setText(JSON.parse(response));
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


});
//Requette Update message and choice
function sendUpdateMessage(donnee) {
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/message/update";
    urls = (UrlGeneral+UrlMessage);
    $.ajax({
        type: "POST",
        url: urls,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            "id":Number(donnee[1]),
            "text":donnee[2],
            "isAchoice":Boolean(donnee[3]),
            "idSuivant":Number(donnee[4]),
            "iddialogue":Number($("#selectDialogue").val())
        },
        success: function (response) {
            console.log(response);
        },

    });
}
function sendUpdateChoix(donnee) {
    UrlGeneral = "http://localhost/";
    UrlMessage = "Dialogue/Routeur/Routeur.php/api/choix/update";
    urls = (UrlGeneral+UrlMessage);
    $.ajax({
        type: "POST",
        url: urls,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
            "id":Number(donnee[1]),
            "text":donnee[2],
            "idSuivant":Number(donnee[3]),
            "iddialogue":Number($("#selectDialogue").val())
        },
        success: function (response) {
            console.log(response);
        },

    });
}

function CreateMesageDb(object)
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
}
class eventManager extends EventTarget{

    constructor() {
        super();
    }
}
