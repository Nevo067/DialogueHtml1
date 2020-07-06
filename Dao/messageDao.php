<?php


class messageDao
{
    //TODO:Ameliorer update
    private $bdd;
    private $data;
    private $variable;
   
    //Requette 
    private $update ='UPDATE nevo067_dialogueharmonia.message
SET texte=:texte, iddialogue=:idDialogue, textanglais=NULL, isAChoice=:isAChoice, idSuivant=:idSuivant
WHERE id=:id;
';
    private $post ="INSERT INTO nevo067_dialogueharmonia.message
(texte, iddialogue, textanglais, isAChoice,idSuivant)
VALUES(:texte, :iddialogue, :textanglais, :isAChoice,:idSuivant);";
    private $lastId ='SELECT LAST_INSERT_ID()';
    private $reqDelete = "delele into message where id =:id";
    private $requetteCreate ="INSERT INTO nevo067_dialogueharmonia.message 
(texte, iddialogue, textanglais, isAChoice, idPersonnage, idSuivant)
VALUES(NULL, 0, NULL, 0, NULL, 0);";


    /**
     * messageDao constructor.
     */
    public function __construct()
    {
        $this->init();
    }


    public function init()
    {
        $data = new DatabaseClass();
        $bdd = $data->getDbbConnection();
    }

    public function update($id,$texte,$iddialogue,$isAChoice,$idSuivant)
    {
        $requette=$this->bdd->prepare($this->update);
        $requette->bindParam(":id",$id,PDO::PARAM_INT);
        $requette->bindParam(":idDialogue",$iddialogue,PDO::PARAM_INT);
        //$requette->bindParam(":textanglais",$textanglais,PDO::PARAM_STR);
        $requette->bindParam(":texte",$texte,PDO::PARAM_STR);
        $requette->bindParam(":isAChoice",$isAChoice,PDO::PARAM_BOOL);
        $requette->bindParam(":idSuivant",$idSuivant,PDO::PARAM_INT);
        return $requette->execute();
    }
    public function post($texte,$iddialogue,$textanglais,$isAChoice,$idSuivant)
    {
        $requette=$this->bdd->prepare($this->postRequette);
        $requette->bindParam(":iddialogue",$iddialogue,PDO::PARAM_INT);
        //$requette->bindParam(":textanglais",$textanglais,PDO::PARAM_STR);
        $requette->bindParam(":texte",$texte,PDO::PARAM_STR);
        $requette->bindParam(":isAChoice",$isAChoice,PDO::PARAM_BOOL);
        $requette->bindParam(":idSuivant",$idSuivant,PDO::PARAM_INT);
        $requette->execute();
        return $this->getLastId();

    }
    public function delete($id)
    {
        $requette = $this->bdd->prepare($this->reqDelete);
        $requette->bindParam(":id",$id,PDO::PARAM_INT);
        return $requette->execute();
    }
    public function getLastId()
    {
     $requette2 = $this->bdd->prepare($this->lastId);
     $requette2->execute();
     return $requette2->fetchAll();
     
    }
    public function postInit()
    {
        $requette=$this->bdd->prepare($this->requetteCreate);
        $requette->execute();
        return $this->getLastId();

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

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data): void
    {
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getVariable()
    {
        return $this->variable;
    }

    /**
     * @param mixed $variable
     */
    public function setVariable($variable): void
    {

        $this->variable = $variable;
    }

}