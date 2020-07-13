

//Create different table
example.View = draw2d.Canvas.extend({


    init: function (id) {
        this._super(id,2000,1000);

        this.setScrollArea("#" + id);

        this.setZoom(1);

        var canvas = this;
        canvas.fromDocumentToCanvasCoordinate = $.proxy(function(x, y) {
            return new draw2d.geo.Point(
                (x + window.pageXOffset - this.getAbsoluteX() + this.getScrollLeft())*this.zoomFactor,
                (y + window.pageYOffset - this.getAbsoluteY() + this.getScrollTop())*this.zoomFactor);
        },canvas);

        canvas.fromCanvasToDocumentCoordinate = $.proxy(function(x,y) {
            return new draw2d.geo.Point(
                ((x*(1/this.zoomFactor)) + this.getAbsoluteX() - this.getScrollLeft() - window.pageXOffset),
                ((y*(1/this.zoomFactor)) + this.getAbsoluteY() - this.getScrollTop() - window.pageYOffset));
        },canvas);
    },



    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    //enable to drop table on canvas
    onDrop: function (droppedDomNode, x, y, shiftKey, ctrlKey) {
        let type = $(droppedDomNode).data("shape");
        let figure = eval("new " + type + "();");
        let event = new CustomEvent('updateTable',{});

        let t = figure;

        figure.eventManager.addEventListener("updateTable",function(e){
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
                    sendUpdateMessage(donne);
                }
                else
                {
                    sendUpdateChoix(donne);
                }
            }
        });




        //Creer une figure Message
        if ($(droppedDomNode).attr('id') === "tableMessage") {
            figure.addEntity("id");
            figure.addEntity("text");
            figure.addEntity("textAnglais");
            figure.addEntity("isAchoice");
            figure.addEntity("idSuivant");
            figure.setName("Message");
            console.log(figure.getLength());
            //Pour optimiser

            for (let j = 0; j < figure.getLength() - 1; j++){
                 let verif = false;
                console.log(figure);
                figure.getEntity(Number(j)).getInputPort(0).on("connect", function (emitterPort, connection) {
                    console.log( connection['connection']['sourcePort']['parent']['parent']['children']['data']['0']["figure"].getText() );
                    console.log( connection['connection']['targetPort']['parent']['parent']['children']['data']['0']["figure"].getText() );

                    if(connection['connection']['sourcePort']['parent']['parent']['children']['data']['0']["figure"].getText() === "Choix")
                    {
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['3']['figure'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                        //connection['connection']['sourcePort']['parent']['parent']['children']['data']['4']['figure'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                        figure.getEntity(j).getInputPort(0);
                        console.log( connection['connection']['sourcePort']['parent']['parent']);
                        t = figure;
                        connection['connection']['sourcePort']['parent']['parent'].eventManager.dispatchEvent(event);
                    }
                    else
                    {
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['5']['figure'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                        t =connection['connection']['sourcePort']['parent']['parent'];
                    }
                    //Target Port
                });
                //TODO:A OPTIMISER FAIRE DES METHODE PAR LIGNE
                console.log( figure.getEntity(Number(j))['text']);
                
                /*
                figure.getEntity(Number(j)).on("change",function(){
                    donne = [];
                    if(figure.getEntity(Number(1))['text']!== "id")
                    {

                        {
                            for (let index = 0; index < figure.getLength()-1; index++) {
                                donne.push(figure.getEntity(Number(index)).getText());
                            }
                            sendUpdateMessage(donne);
                            verif = true;
                        }

                    }
                });

                 */

            }
            var verif = true;
            figure.createMessageDb(figure.getEntity(0));

            //figure.setName("NewTable");
            //Create tableChoix
        } else if ($(droppedDomNode).attr('id') === "tableChoix") {
            figure.addEntity("id");
            figure.addEntity("text");
            figure.addEntity("idSuivant");
            figure.addEntity("idMessage");
            figure.setName("Choix");

            figure.setName("Choix");
            console.log(figure.getLength());
            for (let j = 0; j < figure.getLength() - 1; j++) {
                console.log(figure);
                //manage connection beetwheen two table
                figure.getEntity(Number(j)).getInputPort(0).on("connect", function (emitterPort, connection) {
                    if(connection['connection']['targetPort']['parent']['parent']['children']['data']['0']["figure"].getText() === "Choix")
                    {
                        console.log(connection['connection']['targetPort']["parent"]['parent']['children']['data']['3']['figure'].getText());
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['5']['figure'].setText(connection['connection']['targetPort']["parent"]['parent']['children']['data']['3']['figure'].getText());
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['4']['figure'].setText("1");
                        t = connection['connection']['sourcePort']['parent']['parent'];
                        figure.eventManager.dispatchEvent(event);

                        connection['connection']['targetPort']["parent"]['parent']['children']['data']['4']['figure'].setText(connection['connection']['sourcePort']['parent']['parent']['children']['data']['1']['figure'].getText());
                        //Event enable to send request about the tableshap
                        t = connection['connection']['targetPort']['parent']['parent'];

                        //connection['connection']['sourcePort']['parent']['parent'].eventManager.dispatchEvent(event);



                    }
                    figure.eventManager.dispatchEvent(event);
                    /*
                    connection['connection']['sourcePort']['parent']['parent']['children']['data']['5']['figure'].setText(connection['connection']['targetPort']["parent"]['parent']['children']['data']['3']['figure'].getText());
                    connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['3']['figure'].setText(connection['connection']['sourcePort']['parent']['parent']['children']['data']['1']['figure'].getText());

                     */
                });
                /*
                figure.getEntity(Number(j)).getOutputPort(0).on("connect", function (emitterPort, connection) {
                    console.log(connection['connection']);
                    //console.log(connection['connection']['sourcePort']);
                    //connection['connection']['targetPort']['parent']['parent']['children']['data']['1']['figure'].setText(connection['connection']['sourcePort']['parent']['parent']['children']['data']['3']['figure'].getText());

                });

                 */
            }
            figure.createChoixDb(figure.getEntity(0));
        }
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);

        this.getCommandStack().execute(command);


    },
    //TODO:A Changer
    //Function to load message
    getMessage: function (nbDialogue) {
        var objet = this;
        UrlGeneral = "http://localhost/";
        UrlMessage = "Dialogue/Routeur/Routeur.php/api/message";
        Urldialogue = "Dialogue/Routeur/Routeur.php/api/dialogue";

        realUrlMessage = UrlGeneral + UrlMessage;
        realUrlDialogue = UrlGeneral + Urldialogue;
        x = 100;

        function loadMessage(te, obj) {
            var type = $("#tableMessage").data("shape");
            var figure = eval("new " + type + "();");


            console.log(tableau['id']);
            figure.addEntity(tableau['id']);
            figure.addEntity(tableau['texte']);
            figure.addEntity(tableau['idSuivant']);

            figure.setName("Message");
            figure.setUserData(te);
            console.log(figure);

            //console.log(figure.getChildren());
            console.log(figure.getLength());
            figure.setUserData(te);
            console.log(figure);


            //console.log(figure.getChildren());
            console.log(figure.getLength());
            for (let j = 0; j < figure.getLength() - 1; j++) {
                console.log(j);
                figure.getEntity(Number(j)).getInputPort(0).on("connect", function (emitterPort, connection) {
                    var nameFigure = connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['0']['figure'].getText();
                    console.log(nameFigure);
                    if (nameFigure === "Message") {
                        connection['connection']['sourcePort']['parent'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                    } else if (nameFigure === "Choix") {
                        connection['connection']['sourcePort']['parent']['parent']['children']['data']['3']['figure'].setText("1");
                    }
                });
            }
            return figure;
            //var command = new draw2d.command.CommandAdd(this, figure, 25, 25);
            //obj.getCommandStack().execute(command);
        }

        $.ajax({
            url: (realUrlMessage + "/dialogue/" + nbDialogue),
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                alert("cela marche");
                var str = "";
                alert(realUrlMessage + "/dialogue/" + nbDialogue);
                //alert(data);
                var listObject = JSON.parse(data);
                //alert(listObject[0]['id']);
                console.log(listObject);
                for (let i = 0; i < listObject.length; i++) {
                    var te = JSON.parse(listObject[i]);

                    var type = $("#tableMessage").data("shape");
                    var figure = eval("new " + type + "();");


                    console.log(te['id']);
                    figure.addEntity(te['id']);
                    figure.addEntity(te['texte']);
                    figure.addEntity(te['isAChoice']);
                    figure.addEntity(te['idSuivant']);

                    figure.setName("Message");


                    //var figure = loadMessage(te,this);
                    //Gere l'evenement de la connexion
                    figure.setUserData(te);
                    console.log(figure.getUserData()['id']);

                    //console.log(figure.getChildren());
                    console.log(figure.getLength());
                    for (let j = 0; j < figure.getLength() - 1; j++) {
                        console.log(j);
                        figure.getEntity(Number(j)).getInputPort(0).on("connect", function (emitterPort, connection) {
                            var nameFigure = connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['0']['figure'].getText();
                            console.log(nameFigure);
                            if (nameFigure === "Message") {
                                connection['connection']['sourcePort']['parent'].setText(connection["connection"]["targetPort"]["parent"]['parent']['children']['data']['1']['figure'].getText());
                            } else if (nameFigure === "Choix") {
                                connection['connection']['sourcePort']['parent']['parent']['children']['data']['3']['figure'].setText("1");
                            }
                        });
                    }


                    var command = new draw2d.command.CommandAdd(objet, figure, (25 + (x * i)), 25);
                    objet.getCommandStack().execute(command);
                }
            },
            error: function (resultat, statut, erreur) {
                alert(resultat);
                alert(statut);
                return null;
            },

            complete: function (resultat, statut) {
                return null;
            }
        });
    },
    saveTab:function() {
        let str ="";
        var writer = new draw2d.io.json.Writer();
        writer.marshal(this,function(json){
           str = JSON.stringify(json, null, 2);
        });
        return str;
    },
    //Load in the canvas the scheme
    loadTab:function (str) {
        var reader = new draw2d.io.json.Reader();
        console.log(str);
        reader.unmarshal(this, str);
    },
    //#region Code that send data
    //#endregion



});
