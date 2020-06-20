
//Requette Manager
class RequetteManager {
    constructor()
    {
        
    }
}

class requetteMessage extends RequetteManager{
    get isAchoice() {
        return this._isAchoice;
    }

    set isAchoice(value) {
        this._isAchoice = value;
    }

    get idDialogue() {
        return this._idDialogue;
    }

    set idDialogue(value) {
        this._idDialogue = value;
    }

    //constructeur
    constructor()
    {
        super();

        this._id = 0;
        this._text ="vide";
        this._idSuivant = 0;
        this._isAchoice = false;
        this._idDialogue = 0;


    }
    init(id,text,idSuivant,idDialogue)
    {
        this._id = id;
        this._text =text;
        this._idSuivant = idSuivant;
    }

    post(result)
    {
        $.ajax({
            url :"Dialogue/Routeur/Routeur.php/api/message",
            type : 'POST', // Le type de la requête HTTP, ici devenu POST
            data : {
                id:this._id,
                text:this._text,
                idSuivant:this._idSuivant,
                isAchoice:this._isAchoice,
                idDialogue:this._idDialogue
            },
            dataType : 'html',
            success : function(code_html, statut){
                alert(code_html);
                result = true;
            },
        });
    }
    update(url)
    {
        $.ajax({
            url : url,
            type : 'POST', // Le type de la requête HTTP, ici devenu POST
            data : {
                id:this._id,
                text:this._text,
                idSuivant:this._idSuivant,
                isAchoice:this._isAchoice,
                idDialogue:this._idDialogue
            },
            dataType : 'html',
            success : function(code_html, statut){
                alert(code_html);
            },
        });
    }



    //Getteur et setteur
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get idSuivant() {
        return this._idSuivant;
    }

    set idSuivant(value) {
        this._idSuivant = value;
    }

}

class RequetteChoix extends RequetteManager{
    constructor()
    {
        super();

        this._id = 0;
        this._text ="vide";
        this._idSuivant = 0;
        this._idMessage = 0;
        this._idDialogue = 0;


    }
    init(id,text,idSuivant,idMessage,idDialogue)
    {
        this._id = id;
        this._text =text;
        this._idSuivant = idSuivant;
        this._idMessage = idMessage;
        this._idDialogue = idDialogue;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get idSuivant() {
        return this._idSuivant;
    }

    set idSuivant(value) {
        this._idSuivant = value;
    }

    get idMessage() {
        return this._idMessage;
    }

    set idMessage(value) {
        this._idMessage = value;
    }

    get idDialogue() {
        return this._idDialogue;
    }

    set idDialogue(value) {
        this._idDialogue = value;
    }
}

//Gestionnaire
class GestionnaireDialogue {
    constructor()
    {
        this.typeRequette = [];
        this.objetRequette =[];
    }
    //Methode permetant d'envoyer les un apres les autres
    commitRequette()
    {
        //Variable modifier pendant la methode
       var t = 0;
       var isMake = false;
       var isCurrent = false;
       while (t <this.typeRequette.length) {
           switch (this.typeRequette[t]) {
               case "post":
                   while (!isMake) {
                       if (!isCurrent) {
                           isCurrent = true;
                           this.objetRequette[t].post(isMake);
                       }
                   }
                   break;
           }
           isMake = false;
           isCurrent = false;
           t++;
       }

    }
    addRequette(typeText,typeObject)
    {
        this.typeRequette.push(typeText);
        this.objetRequette.push(typeObject);
    }
    deleteRequette(id)
    {
        for (let i = 0; i < this.objetRequette.length ; i++) {
            this.objetRequette.splice(id,1);
            this.typeRequette.splice(id,1);

        }
    }
    deleteRequetteId(id)
    {
        var t = 0;

    }
}
