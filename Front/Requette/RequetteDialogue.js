 UrlGeneral ="http://localhost/";
UrlMessage ="Dialogue/Routeur/Routeur.php/api/message";
Urldialogue ="Dialogue/Routeur/Routeur.php/api/dialogue";

 realUrlMessage = UrlGeneral + UrlMessage;
 realUrlDialogue = UrlGeneral+ Urldialogue;
var listObject;
var canvas;
 //draw();


    //DefaultLoad

    var routerToUse;
    var app;
    document.addEventListener("DOMContentLoaded",function () {

        routerToUse =new draw2d.layout.connection.InteractiveManhattanConnectionRouter();
        app  = new example.Application();
        app.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function(){
                var connection = new draw2d.Connection({
                    stroke:3,
                    outlineStroke:1,
                    outlineColor:"#303030",
                    color:"91B93E",
                    router:routerToUse
                });
                return connection;
            }
        }));


        // unmarshal the JSON document into the canvas
        // (load)

        var reader = new draw2d.io.json.Reader();
        setTimeout(function(){reader.unmarshal(app.view, jsonDocument);}, 5 );
       // reader.unmarshal(app.view, jsonDocument);
        app.view.getMessage(96);

    });
 $(document).ready(function(){
    fillDialogueSelect("#selectDialogue");

    //console.log(getAllMessage());
    //Click Action
     /*
    $("#message").click(function() {
            UrlGeneral= UrlGeneral + UrlMessage;
        $.ajax({
            url: realUrl,
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
                alert(data);
                listObject = JSON.parse(data);
                alert(listObject);
                ///test ajout donnée dans dans select


            },

            error: function (resultat, statut, erreur) {
                alert(resultat);

            },

            complete: function (resultat, statut) {

            }

        });
    });

      */
    $("#messageId").click(function () {
        nb = $("#selectDialogue").val();
        getMessage(nb);
        app.view.getMessage(nb);
    });
    $("#save").click(function () {
        postSave();
    });
    $("#message").click(function () {
        loadTab();
    });
     


    //Change Action


});


//Methode fill




 function fillDialogueSelect(idJquerry) {

     $.ajax({
         url: realUrlDialogue,
         type: 'GET',
         dataType: 'html',
         success: function (data) {
             // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
             var str ="";
             alert(data);
             alert("reussi");
             listObject = JSON.parse(data);
             for (let i = 0; i < listObject.length; i++) {
                 objetRemplis = JSON.parse(listObject[i]);
                 str +="<option value='"+
                     objetRemplis['id']
                     +"'>" +
                     objetRemplis["nom"] +
                     "</option>";
             }

             //str += listObject;
             //alert(listObject[0].id);
             //$(idJquerry).html(str);
             $(idJquerry).html(str);
             //alert($(idJquerry).);

         },

         error: function (resultat, statut, erreur) {
             alert(resultat);

         },

         complete: function (resultat, statut) {

         }

     });


 }
//fUNCTION A SUPRIMER
 function getAllMessage(y) {
     $.ajax({
         url: realUrlMessage+"/137",
         type: 'GET',
         dataType: 'html',
         success: function (data) {
            alert("cela marche");
             var str ="";
             listObject = JSON.parse(data);
             //alert(listObject+"objet");
             //console.log(listObject);


             //str += listObject;
             //alert(listObject[0].id);
             //$(idJquerry).html(str);
             //$(idQuerry).html(str);
             //alert($(idJquerry).);

         },

         error: function (resultat, statut, erreur) {
             alert(resultat);
             return null;
         },

         complete: function (resultat, statut) {
            return null;
         }

     });
 }

 //GetMessage
 function getMessage(nbDialogue)
 {
     $.ajax({
         url: (realUrlMessage+"/dialogue/" + nbDialogue),
         type: 'GET',
         dataType: 'html',
         success: function (data) {
             alert("cela marche");
             var str ="";
             alert(realUrlMessage+"/dialogue/" + nbDialogue);
             //alert(data);
             listObject = JSON.parse(data);
             alert(listObject[0]);
             var te=JSON.parse(listObject[0]);
             console.log(te['id']);

             //alert(listObject+"objet");
             //console.log(listObject);


             //str += listObject;
             //alert(listObject[0].id);
             //$(idJquerry).html(str);
             //$(idQuerry).html(str);
             //alert($(idJquerry).);

         },

         error: function (resultat, statut, erreur) {
             alert(resultat);
             return null;
         },

         complete: function (resultat, statut) {
             return null;
         }

     });
 }
 
 function loadTab() {
     UrlText= UrlGeneral + Urldialogue+"/text/";
     UrlText =(UrlText+ $("#selectDialogue").val());
     $.ajax({
         url:UrlText ,
         type: 'GET',
         dataType: 'html',
         success: function (data) {
             alert("marche");
             listObject = JSON.parse(data);
             app.view.loadTab(listObject[0][0]);
           //app.view.loadTab(data)
         },
         error: function (resultat, statut, erreur) {
             alert(resultat);

         },
     });

 }

//Save Tableau
function saveTab() {

   return app.view.saveTab();
}
 function postSave(){
     console.log(saveTab());
     $.ajax({
         type: "POST",
         url: realUrlDialogue,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         data: {
             'id': $("#selectDialogue").val(),
             'text':(saveTab())
         },
         success: function (response) {
            alert("Le fichier a été sauvegarder");// You will get response from your PHP page (what you echo or print)
         },

     });
 }


 //Draw Methode
 function draw() {
     document.addEventListener("DOMContentLoaded",function () {
         //Permet de load dans le div ayant son id
         canvas = new draw2d.Canvas("gfx_holder");
        //Change la police du cube
         //canvas.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy());
         //canvas.installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy());
         canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
             createConnection: function(){
                 return new MyConnection();
             }
         }));
         hbus = new draw2d.shape.node.HorizontalBus({width:600, height:400, label:"Le choix est un choix",resizeable:true});
         var start = new draw2d.shape.node.Start({x:275,y:180});
         var end = new draw2d.shape.node.End({x:230,y:130});
         //Ajout
         canvas.add(new draw2d.shape.basic.Rectangle({width:80,height:100, x:50, y:100, resizeable:true}));
         //canvas.add(hbus);
         canvas.add(start);
         canvas.add(end);

         var c = new MyConnection({
             source:start.getOutputPort(0),
             target:end.getInputPort(0)
         });
         canvas.add(c);
     });
 }

 


