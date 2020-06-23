<?php
//Version Avec url
//Version avec les variables d'url
//Require
require "../Dto/Databases.php";
require "../Dto/DatabaseClass.php";
require "../Dao/ParentDao.php";
require "../Controller/ControllerDialogue.php";
require "../Controller/ControllerMessage.php";
require "../Controller/ControllerChoix.php";
require "../Controller/ControllerDialAssign.php";
require "../Controller/ControllerCompte.php";

//Objet
$controllerDialogue = new ControllerDialogue();
$controllerMessage = new ControllerMessage();
$controllerChoix = new ControllerChoix();
$controllerdialAssign = new ControllerDialAssign();
$controllerCompte = new ControllerCompte();


//Attribut
$url="";
$httpVerb="";

//NomClasse
$classeDialogue ="dialogue";
$classeMessage="message";
$classeChoix="choix";
$classeDialAssign ="dialAssign";
$classeCompte = "compte";

//




//echo $_SERVER['REQUEST_URI'];
if(isset($_SERVER['REQUEST_URI']))
{

    $url = explode('/',$_SERVER['PATH_INFO']);


    if($url[1] == "api")
    {
        //DtoDialogue
        if($url[2] == $classeDialogue)
        {
            //$controllerDialogue->getDialogue();
            if($_SERVER['REQUEST_METHOD'] =="GET")
            {
                echo $controllerDialogue->getDialogue();
            }
        }
        //Dto message
        elseif ($url[2] == $classeMessage)
        {
            if($_SERVER['REQUEST_METHOD'] =="GET")
            {
                if(count($url) ==4)
                {
                    echo "$url[3]";
                    echo $controllerMessage->getMessageById($url[3]);
                }
                elseif (count($url) >4)
                {
                    if($url[3] == $classeDialogue)
                    {
                        echo $controllerMessage->getMessageByattribut($url[4],"iddialogue");
                    }
                }
                else
                {
                    echo "test2";
                    echo $url.count();
                    echo $controllerMessage->getMessage();
                }

            }
            elseif ($_SERVER['REQUEST_METHOD'] =="POST")
            {
                if(count($url) ==4)
                {
                    if($url[3] =="post")
                    {
                        echo $controllerMessage->postMessage();
                    }
                    else if($url[3] == "update")
                    {
                        echo $controllerMessage->update();
                    }

                }
            }
        }
        //dto Choix
        elseif ($url[2] == $classeChoix)
        {
            if($_SERVER['REQUEST_METHOD'] =="GET")
            {
                $controllerChoix->getChoix();
            }
        }
        //dto dialAsign
        elseif ($url[2] == $classeDialAssign)
        {

            if($_SERVER['REQUEST_METHOD'] =="GET")
            {
                if(count($url)>3)
                {
                    if($url[3]== "delete")
                    {
                        echo $controllerdialAssign->delete($url[4]);
                    }
                    else
                    {
                        echo $controllerdialAssign->QueryByName($url[3]);
                    }

                }
                else
                {
                    echo $controllerdialAssign->QueryDialAssign();
                }

            }
            else if($_SERVER['REQUEST_METHOD'] =="POST")
            {
                echo $controllerdialAssign->postDialAssign();
            }
        }
        //dto compte
        elseif ($url[2] == $classeCompte)
        {
            if($_SERVER['REQUEST_METHOD'] =="GET")
            {
              echo json_encode($controllerCompte->QueryDialAssign());
            }
        }
    }
    /*
     * A supprimmer
     */

    /*
    if($_SERVER['REQUEST_METHOD'] =="GET")
    {
        $controllerDialogue->getDialogue();
    }
    */


    //echo var_dump($url);

}




