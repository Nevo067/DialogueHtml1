<?php

require "../Dao/CompteDao.php";
class ControllerCompte
{
    public function QueryDialAssign()
    {
        $dao = new CompteDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());
        return $dao->QuerryCompte();
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