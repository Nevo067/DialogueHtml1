<?php
require "D:\wamp641\www\Dialogue\Dto\DtoDialogue.php";


class ControllerDialogue
{

    /**
     * ControllerDialogue constructor.
     */
    public function __construct()
    {
    }

    public function getDialogue()
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

    public function getDialogueById($id)
    {
        $dial = new message();
        $dao = new ParentDao();
        $bddClass = new DatabaseClass();
        $dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());
        //$bddClass->DbbConnection($dao->getBdd());

        $val =$dao->QuerryById($dial,$id);
        //echo $val;
        return json_encode($val);
        //return $val;
    }

    public function postDialogue($tab)
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