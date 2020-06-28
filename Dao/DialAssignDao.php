<?php


class DialAssignDao
{
    private $bdd;
    private $data;
    private $variable;

    private $query ="SELECT * FROM nevo067_dialogueharmonia.dialogueassignable";
    private $postRequette ="INSERT INTO nevo067_dialogueharmonia.dialogueassignable 
(iddialogue, idcompte, isVerif) 
VALUES(:idDialogue, :idCompte, :isVerif);
";
    private $queryByName = "SELECT * FROM dialogueassignable JOIN compte ON idcompte = compte.id
WHERE nom LIKE ";
    private $delete = "DELETE FROM nevo067_dialogueharmonia.dialogueassignable
WHERE id=:val;";
    

    /**
     * DialAssignDao constructor.
     */
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


    public function QuerryDialAssign()
    {
        $requette=$this->bdd->prepare($this->query);
        $requette->execute();
        $tab = $requette->fetchall();
        return $tab;
    }
    public function PostDialAssign($idD,$idC,$idV)
    {
        $requette=$this->bdd->prepare($this->postRequette);
        $requette->bindParam(":idDialogue",$idD,PDO::PARAM_INT);
        $requette->bindParam(":idCompte",$idC,PDO::PARAM_INT);
        $requette->bindParam(":isVerif",$idV,PDO::PARAM_INT);
        return $requette->execute();

    }
    public function querryByName($val)
    {

        $this->queryByName = $this->queryByName."'".$val."%';";

        $requette=$this->bdd->prepare($this->queryByName);
        //$requette->bindParam(":val",$val,PDO::PARAM_STR);
        $requette->execute();

        $tab = $requette->fetchall();
        return $tab;
    }
    public function deleteM($val)
    {
        $requette=$this->bdd->prepare($this->delete);
        $requette->bindParam(":val",$val,PDO::PARAM_INT);
        echo $val;
        return $requette->execute();
    }

}