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
    public function postMessage()
    {
        $dao= new messageDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());

        $id= $_POST["id"];
        $texte= $_POST["texte"];
        $iddialogue= $_POST["iddialogue"];
        $textdialogue= $_POST["textdialogue"];
        $isachoice= $_POST["isachoice"];
        $idsuivant= $_POST["idSuivant"];

        return $dao->post($id,$texte,$iddialogue,$textdialogue,$isachoice,$idsuivant);
    }
    public function postCreateMessage()
    {
        $dao= new messageDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());
        return $dao->postInit();
    }
    public function update()
    {
        $dao= new messageDao();
        $bddClass = new DatabaseClass();

        $dao->setBdd($bddClass->getDbbConnection());

        $id= $_POST["id"];
        $texte= $_POST["text"];
        $iddialogue= $_POST["iddialogue"];
        $isachoice= $_POST["isAchoice"];
        $idsuivant= $_POST["idSuivant"];
        return $dao->update($id,$texte,$iddialogue,$isachoice,$idsuivant);
        

    }
}