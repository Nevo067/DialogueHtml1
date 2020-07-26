<?php


class ChoixDao
{
    private $bdd;
    private $data;
    private $variable;

    private $post = "INSERT INTO nevo067_dialogueharmonia.choix
(idMessageQuestion, isGoodChoice, text, nbEffect, IdSuivant, idDialogue, effect, textAnglais)
VALUES(NULL, 0, NULL, NULL, NULL, :idDialogue, NULL, NULL);";

    private $update = "Update nevo067_dialogueharmonia.choix
SET idMessage=:idMessage, idMessageQuestion=NULL, isGoodChoice=NULL, text=:text, nbEffect=NULL, IdSuivant=:idSuivant, idDialogue=:idDialogue, effect=NULL, textAnglais=NULL
WHERE Id=:id;";

    private $lastId ='SELECT max(id) from nevo067_dialogueharmonia.choix';

    private $deleteReq = "DELETE FROM nevo067_dialogueharmonia.choix
WHERE Id=:id;";



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
        $requette=$this->bdd->prepare($this->post);
        $requette->bindParam(":idDialogue",$id,PDO::PARAM_INT);
        $requette->execute();
        $requette2=$this->bdd->prepare($this->lastId);
        $requette2->execute();
        return $requette2->fetchall();

    }
    public function update($idMessage,$idSuivant,$idDialogue,$id,$text)
    {

        echo $idMessage;
        echo "</Br>";
        echo $idSuivant;
        echo "</Br>";
        echo $idDialogue;
        echo "</Br>";
        echo $id;
        echo "</Br>";
        echo $text;
        echo "</Br>";

        if($idMessage == "NaN")
        {
           echo "idMessage";
           $idMessage = 217;
           echo $idMessage;
        }
        if($idSuivant == "NaN")
        {
            echo "idDialogue";
            $idSuivant = 217;
            echo $idSuivant;
        }

        $requette = $this->bdd->prepare($this->update);
        $requette->bindParam(":id",$id,PDO::PARAM_INT);
        $requette->bindParam(":idSuivant",$idSuivant,PDO::PARAM_INT);
        $requette->bindParam(":idDialogue",$idDialogue,PDO::PARAM_INT);
        $requette->bindParam(":idMessage",$idMessage,PDO::PARAM_INT);
        $requette->bindParam(":text",$text,PDO::PARAM_STR);
        echo $requette->execute();

    }
    public function delete($id)
    {
        $requette = $this->bdd->prepare($this->reqDelete);
        $requette->bindParam(":id",$id,PDO::PARAM_INT);
        return $requette->execute();
    }

    /**
     * @return mixed
     */
    public function getBdd()
    {
        return $this->bdd;
    }

    /**
     * @param mixed $bdd
     */
    public function setBdd($bdd): void
    {
        $this->bdd = $bdd;
    }

}