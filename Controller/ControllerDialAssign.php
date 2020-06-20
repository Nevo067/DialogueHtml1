<?php

require "../Dao/DialAssignDao.php";
class ControllerDialAssign
{


    /**
     * ControllerDialAssign constructor.
     */
    public function __construct()
    {

    }


    public function QueryDialAssign()
    {
        $dao= new DialAssignDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());
        return json_encode($dao->QuerryDialAssign());
    }
    public function QueryByName($val)
    {
        $dao= new DialAssignDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());
        return json_encode($dao->querryByName($val));
    }
    public function postDialAssign()
    {
        $dao= new DialAssignDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());

        $idD =$_POST["idDial"];
        $idC = $_POST["idCompte"];
        $idV = $_POST["idVal"];
        return $dao->PostDialAssign($idD,$idC,$idV);
    }
    public function delete($val)
    {
        $dao= new DialAssignDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());
        return $dao->deleteM($val);
    }


    /**
     * @return mixed
     */
    public function getDaoDialAssign()
    {
        return $this->daoDialAssign;
    }

    /**
     * @param mixed $daoDialAssign
     */
    public function setDaoDialAssign($daoDialAssign): void
    {
        $this->daoDialAssign = $daoDialAssign;
    }


}