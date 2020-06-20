<?php


class DatabaseClass
{
    public function DbbConnection($bdd)
    {
        try
        {
            $bdd = new PDO('mysql:host=mysql-nevo067.alwaysdata.net;dbname=nevo067_dialogueharmonia;charset=utf8', 'nevo067_visi', 'kevingeo0');
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
    }
    public function getDbbConnection()
    {
        try
        {
             $bdd = new PDO('mysql:host=mysql-nevo067.alwaysdata.net;dbname=nevo067_dialogueharmonia;charset=utf8', 'nevo067_visi', 'kevingeo0');
             /*
             $method=$bdd->prepare("select * from dialogue");
             $method->execute();
             */

             return $bdd;

        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
    }
}