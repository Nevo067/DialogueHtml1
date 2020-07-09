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
    public function postInit($id)
    {
        $dial = new DtoDialogue();
        $dao = new ChoixDao();
        $bddClass = new DatabaseClass();
        //$dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());
        return $dao->postCreate($id);
    }
    public function update($id)
    {
        $dial = new DtoDialogue();
        $dao = new ChoixDao();
        $bddClass = new DatabaseClass();
        //$dao->setVariable($dial);
        $dao->setBdd($bddClass->getDbbConnection());

        $id= $_POST["id"];
        $texte= $_POST["text"];
        $iddialogue= $_POST["iddialogue"];
        $idsuivant= $_POST["idSuivant"];
        $idMessage = $_POST["idMessage"];

        return $dao->update($idMessage,$idsuivant,$iddialogue,$id);
    }
}