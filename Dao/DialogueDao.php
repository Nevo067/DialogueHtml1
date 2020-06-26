<?php


class DialogueDao
{
    private $bdd;
    private $data;
    private $variable;
    private $t;

    private $query ="SELECT * FROM nevo067_dialogueharmonia.compte;";
    private $queryText ="SELECT textDiagram FROM nevo067_dialogueharmonia.dialogue where id =:id;";
    private $update ="UPDATE nevo067_dialogueharmonia.dialogue SET textDiagram=':textDiagrame' WHERE id=:id;";





    public function __construct()
    {

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


    public function QuerryCompte()
    {
        $requette=$this->bdd->prepare($this->query);
        $requette->execute();
        $tab = $requette->fetchall();
        return $tab;
    }
    public function updateDialogue($text,$id)
    {

        //echo $text;
        $this->update ="UPDATE nevo067_dialogueharmonia.dialogue SET textDiagram='".$text."'WHERE id=:id;";;
        //echo $this->update;
        $requette=$this->bdd->prepare($this->update);
        $requette->bindParam(':id',$id,PDO::PARAM_INT);
        return $requette->execute();


    }
    public function QuerryText($id)
    {
        //echo $text;
        //echo $this->update;
        $requette=$this->bdd->prepare($this->queryText);
        $requette->bindParam(':id',$id,PDO::PARAM_INT);
        $requette->execute();
        $t = $requette->fetchall();
        return $t;

    }
}