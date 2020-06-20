<?php


require "../Dto/message.php";



class ControllerMessage
{

    public function __construct()
    {
    }

    public function getMessage()
    {

        $dial = new message();
        $dao = new ParentDao();
        $bddClass = new DatabaseClass();
        $dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());
        //$bddClass->DbbConnection($dao->getBdd());

        $val =$dao->Querry($dial);
        //echo $val;
        return json_encode($val);
        //return $val;
    }
    public function getMessageById($id)
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
    public function getMessageByattribut($id,$attribut)
    {
        $dial = new message();
        $dao = new ParentDao();
        $bddClass = new DatabaseClass();
        $dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());
        //$bddClass->DbbConnection($dao->getBdd());

        $val =$dao->QuerryByAttribut($dial,$id,$attribut);
        //echo $val;
        return json_encode($val);
        //return $val;
    }
    public function postMessage($tab)
    {
        $dial = new message();
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