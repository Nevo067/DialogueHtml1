<?php

//this example class for dao

require "../Dto/DtoPrincipal.php";

class DtoDialogue extends DtoPrincipal implements JsonSerializable
{
    private $id;
    private $nom;
    private $idFindMessage;
    private $startindex;
    private $nextDialogue;
    private $isverif;

    public $FIELD_ID ="id";
    public $FIELD_NOM="nom";
    public $FIELD_IDFINDMESSAGE ="idFindMessage";
    public $FIELD_STARTINDEX="startIndex";
    public $FIELD_NEXTDIALOGUE="nextDialogue";
    public $FIELD_ISVERIF="isverif";
    public $TABLE_NAME="dialogue";

    /*
     * https://www.php.net/manual/fr/reflectionclass.getproperty.php
     */

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * @param mixed $nom
     */
    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    /**
     * @return mixed
     */
    public function getIdFindMessage()
    {
        return $this->idFindMessage;
    }

    /**
     * @param mixed $idFindMessage
     */
    public function setIdFindMessage($idFindMessage)
    {
        $this->idFindMessage = $idFindMessage;
    }

    /**
     * @return mixed
     */
    public function getStartindex()
    {
        return $this->startindex;
    }

    /**
     * @param mixed $startindex
     */
    public function setStartindex($startindex)
    {
        $this->startindex = $startindex;
    }

    /**
     * @return mixed
     */
    public function getNextDialogue()
    {
        return $this->nextDialogue;
    }

    /**
     * @param mixed $nextDialogue
     */
    public function setNextDialogue($nextDialogue)
    {
        $this->nextDialogue = $nextDialogue;
    }

    /**
     * @return mixed
     */
    public function getIsverif()
    {
        return $this->isverif;
    }

    /**
     * @param mixed $isverif
     */
    public function setIsverif($isverif)
    {
        $this->isverif = $isverif;
    }

//enable to fill data

    public function hydrate(array $donnees)
    {
        //echo "nouvel objet";
        foreach ($donnees as $key => $value) {
            // On récupère le nom du setter correspondant à l'attribut.
            $method = 'set' . ucfirst($key);
            //echo $value;

            // Si le setter correspondant existe.
            if (method_exists($this, $method)) {
                // On appelle le setter.
                $this->$method($value);
                //echo "</br>";
            }
        }
    }

    public function getJSONEncode() {
        //echo json_encode(get_object_vars($this));
        return json_encode(get_object_vars($this));
    }


    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.

        return $this->getJSONEncode();
    }
}