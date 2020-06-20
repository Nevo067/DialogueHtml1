<?php

require "../Dto/DtoPrincipal.php.php";

class dtoChoix extends DtoPrincipal implements JsonSerializable
{
    private $id;
    private $idMessage;
    private $isGoodChoice;
    private $idSuivant;
    private $idDialogue;

    public $FIELD_ID="id";
    public $FIELD_IDMESSAGE="idMessage";
    public $FIELD_ISGOODCHOICE="idGoodQuestion";
    public $FIELD_IDSUIVANT="idSuivant";
    public $FIELD_IDDIALOGUE="idDialogue";
    public $TABLE_NAME="choix";

    /**
     * dtoChoix constructor.
     */
    public function __construct()
    {
    }


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
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getIdMessage()
    {
        return $this->idMessage;
    }

    /**
     * @param mixed $idMessage
     */
    public function setIdMessage($idMessage): void
    {
        $this->idMessage = $idMessage;
    }

    /**
     * @return mixed
     */
    public function getIsGoodChoice()
    {
        return $this->isGoodChoice;
    }

    /**
     * @param mixed $isGoodChoice
     */
    public function setIsGoodChoice($isGoodChoice): void
    {
        $this->isGoodChoice = $isGoodChoice;
    }

    /**
     * @return mixed
     */
    public function getIdSuivant()
    {
        return $this->idSuivant;
    }

    /**
     * @param mixed $idSuivant
     */
    public function setIdSuivant($idSuivant): void
    {
        $this->idSuivant = $idSuivant;
    }

    /**
     * @return mixed
     */
    public function getIdDialogue()
    {
        return $this->idDialogue;
    }

    /**
     * @param mixed $idDialogue
     */
    public function setIdDialogue($idDialogue)
    {
        $this->idDialogue = $idDialogue;

    }
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
        echo json_encode(get_object_vars($this));
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