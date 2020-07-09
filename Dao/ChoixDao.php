<?php


class ChoixDao
{
    private $bdd;
    private $data;
    private $variable;

    private $post = "INSERT INTO nevo067_dialogueharmonia.choix
(idMessage, idMessageQuestion, isGoodChoice, text, nbEffect, IdSuivant, idDialogue, effect, textAnglais)
VALUES(217, NULL, NULL, NULL, NULL, NULL, :idDialogue, NULL, NULL);";

    private $update = "UPDATE nevo067_dialogueharmonia.choix
SET idMessage=:idMessage, idMessageQuestion=NULL, isGoodChoice=NULL, text=:text, nbEffect=NULL, IdSuivant=:idSuivant, idDialogue=:idDialogue, effect=NULL, textAnglais=NULL
WHERE Id=:id;";

    private $lastId ='SELECT max(id) from dialogueharmania.choix ';



    public function __construct()
    {
        $this->init();
    }
    public function init()
    {
        $data = new DatabaseClass();
        $bdd = $data->getDbbConnection();
    }
    public function postCreate($id)
    {
        $requette=$this->bdd->prepare($this->bdd->post);
        $requette->bindParam(":idDialogue",$id,PDO::PARAM_INT);
        $requette->execute();
        $requette2=$this->bdd->prepare($this->bdd->lastId);
        echo $requette2->execute();

    }
    public function update($idMessage,$idSuivant,$idDialogue,$id,$text)
    {
        $requette = $this->bdd->prepare($this->bdd->post);
        $requette->bindParam(":id",$id,PDO::PARAM_INT);
        $requette->bindParam(":idSuivant",$idSuivant,PDO::PARAM_INT);
        $requette->bindParam(":idDialogue",$idDialogue,PDO::PARAM_INT);
        $requette->bindParam(":idMessage",$idMessage,PDO::PARAM_INT);
        $requette->bindParam(":text",$text,PDO::PARAM_STR);
        echo $requette->execute();

    }

}