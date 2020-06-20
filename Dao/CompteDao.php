<?php


class CompteDao
{
    private $bdd;
    private $data;
    private $variable;

    private $query ="SELECT * FROM nevo067_dialogueharmonia.compte;";




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



}