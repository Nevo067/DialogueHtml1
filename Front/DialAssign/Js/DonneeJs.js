UrlGeneral ="http://localhost/";
UrlMessage ="Dialogue/Routeur/Routeur.php/api/compte";
Urldialogue ="Dialogue/Routeur/Routeur.php/api/dialogue";
UrldialogueAssign ="Dialogue/Routeur/Routeur.php/api/dialAssign";

realUrlMessage = UrlGeneral + UrlMessage;
realUrlDialogue = UrlGeneral+ Urldialogue;

$(document).ready(function() {
    //Load Tab
    fillDelete();
    realUrl = UrlGeneral + UrldialogueAssign;
    $.ajax({
        url: realUrl,
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

            var str = "";

            listObject = JSON.parse(data);
            console.log(listObject);
            for (let i = 0; i < listObject.length; i++) {
                str += "<tr><th scope='row'></th> " +
                    "<td>" + listObject[i]['id'] + "</td> " +
                    "<td>" + listObject[i]['iddialogue'] + "</td> " +
                    "<td>" + listObject[i]['idcompte'] + "</td> " +
                    "</tr>"
            }

            /*
            alert(listObject);
            ///test ajout donnée dans dans select
            */
            $("#remplirTab").html(str);
        },

        error: function (resultat, statut, erreur) {
            alert(resultat);

        },

        complete: function (resultat, statut) {

        }

    });
    realUrlS = UrlGeneral + Urldialogue;
    $.ajax({
        url: realUrlS,
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

            var str = "";

            listObject = JSON.parse(data);
            console.log(listObject);
            for (let i = 0; i < listObject.length; i++) {
                newObject = JSON.parse(listObject[i]);
                str += "<option value='" + newObject['id'] + "'>" + newObject['nom'] + "</option>";
            }

            /*
            alert(listObject);
            ///test ajout donnée dans dans select
            */
            $("#selectDial").html(str);
        },

        error: function (resultat, statut, erreur) {
            alert(resultat);

        },

        complete: function (resultat, statut) {

        }

    });
    realUrlSS = UrlGeneral + UrlMessage;
    $.ajax({
        url: realUrlSS,
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

            var str = "";
            console.log(data);
            listObject = JSON.parse(data);
            console.log(listObject);
            for (let i = 0; i < listObject.length; i++) {
                newObject = listObject[i];
                str += "<option value='" + newObject['id'] + "'>" + newObject['nom'] + "</option>";
            }

            /*
            alert(listObject);
            ///test ajout donnée dans dans select
            */
            $("#selectCompte").html(str);
        },

        error: function (resultat, statut, erreur) {
            alert(resultat);

        },

        complete: function (resultat, statut) {
            realUrl = UrlGeneral + UrldialogueAssign;
            $.ajax({
                url: realUrl,
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

                    var str = "";

                    listObject = JSON.parse(data);
                    console.log(listObject);
                    for (let i = 0; i < listObject.length; i++) {
                        str += "<tr><th scope='row'></th> " +
                            "<td>" + listObject[i]['id'] + "</td> " +
                            "<td>" + listObject[i]['iddialogue'] + "</td> " +
                            "<td>" + listObject[i]['idcompte'] + "</td> " +
                            "</tr>"
                    }

                    /*
                    alert(listObject);
                    ///test ajout donnée dans dans select
                    */
                    $("#remplirTab").html(str);
                },

                error: function (resultat, statut, erreur) {
                    alert(resultat);

                },

                complete: function (resultat, statut) {

                }

            });
        }

    });
    $("#ajoutForm").submit(function (e) {
        e.preventDefault();
        realUrlSS = UrlGeneral + UrldialogueAssign;
        console.log($("#selectDial").val());
        $.ajax({
            url: realUrlSS,
            type: 'POST',
            dataType: 'html',
            data: {

                "idDial": $("#selectDial").val(),
                "idCompte": $("#selectCompte").val(),
                "idVal": "0"

            },
            success: function (data) {
                // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

                alert(data);
                fillTab();

                /*
                alert(listObject);
                ///test ajout donnée dans dans select
                */

            },

            error: function (resultat, statut, erreur) {
                alert(resultat);

            },

            complete: function (resultat, statut) {

            }

        });
    });
    $("#suppresion").submit(function (e) {
        e.preventDefault();
        realUrlSS = (UrlGeneral + UrldialogueAssign+"/delete/"+$("#selectDialAssign").val());
        console.log($("#selectDial").val());
        $.ajax({
            url: realUrlSS,
            type: 'GET',
            dataType: 'html',

            success: function (data) {
                // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

                alert(data);
                fillTab();

                /*
                alert(listObject);
                ///test ajout donnée dans dans select
                */

            },

            error: function (resultat, statut, erreur) {
                alert(resultat);

            },

            complete: function (resultat, statut) {

            }

        });
    });
    $("#filtreNom").change(function () {
        realUrl = (UrlGeneral + UrldialogueAssign + "/" + $("#filtreNom").val());
        $.ajax({
            url: realUrl,
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

                var str = "";
                console.log(data);
                listObject = JSON.parse(data);
                console.log(listObject);
                for (let i = 0; i < listObject.length; i++) {
                    str += "<tr><th scope='row'></th> " +
                        "<td>" + listObject[i]['id'] + "</td> " +
                        "<td>" + listObject[i]['iddialogue'] + "</td> " +
                        "<td>" + listObject[i]['idcompte'] + "</td> " +
                        "</tr>"
                }

                /*
                alert(listObject);
                ///test ajout donnée dans dans select
                */
                $("#remplirTab").html(str);
            },

            error: function (resultat, statut, erreur) {
                alert(resultat);

            },

            complete: function (resultat, statut) {

            }

        })
    });

//methode fill
    function fillTab() {
        realUrl = UrlGeneral + UrldialogueAssign;
        $.ajax({
            url: realUrl,
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

                var str = "";

                listObject = JSON.parse(data);
                console.log(listObject);
                for (let i = 0; i < listObject.length; i++) {
                    str += "<tr><th scope='row'></th> " +
                        "<td>" + listObject[i]['id'] + "</td> " +
                        "<td>" + listObject[i]['iddialogue'] + "</td> " +
                        "<td>" + listObject[i]['idcompte'] + "</td> " +
                        "</tr>"
                }

                /*
                alert(listObject);
                ///test ajout donnée dans dans select
                */
                $("#remplirTab").html(str);
            },

            error: function (resultat, statut, erreur) {
                alert(resultat);

            },

            complete: function (resultat, statut) {

            }

        });
    }});
function fillDelete() {
    realUrl = UrlGeneral + UrldialogueAssign;
    $.ajax({
        url: realUrl,
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            // On passe code_html à jQuery() qui va nous créer l'arbre DOM !

            var str = "";

            listObject = JSON.parse(data);
            console.log(listObject);
            for (let i = 0; i < listObject.length; i++) {
                str+="<option value='"+listObject[i]['id']+"'>"+listObject[i]['id']+"</option>";
            }
            /*
            alert(listObject);
            ///test ajout donnée dans dans select
            */
            $("#selectDialAssign").html(str);
        },

        error: function (resultat, statut, erreur) {
            alert(resultat);

        },

        complete: function (resultat, statut) {

        }

    });

};

