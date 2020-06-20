<?php


class ControllerChoix
{
    /**
     * ControllerDialogue constructor.
     */
    public function __construct()
    {
    }

    public function getChoix()
    {

        $dial = new DtoDialogue();
        $dao = new ParentDao();
        $bddClass = new DatabaseClass();
        $dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());
        //$bddClass->DbbConnection($dao->getBdd());
        $val =$dao->Querry($dial);
        return json_encode($val);

    }
    public function postChoix($tab)
    {
        $dial = new DtoDialogue();
        $dao = new ParentDao();
        $dial->hydrate($tab);
        $bddClass = new DatabaseClass();
        $dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());
        //$bddClass->DbbConnection($dao->getBdd());
        $val =$dao->Post($dial);
        return json_encode($val);
    }
}