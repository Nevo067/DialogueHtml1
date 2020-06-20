<?php



class message extends DtoPrincipal implements JsonSerializable
{
    private $id;
    private $texte;
    private $iddialogue;
    private $textdialogue;
    private $isAChoice;
    private $idPersonnage;
    private $idSuivant;


    public $FIELD_ID ="id";
    public $FielD_TEXTE="texte";
    public $FIELD_IDDIALOGUE="iddialogue";
    public $FIELD_TEXTDIALOGUE="textdialogue";
    public $FIELD_ISACHOICE="isachoice";
    public $FIELD_IDPERSONNAGE="idpersonnage";
    public $FIELD_IDSUIVANT="idSuivant";
    public $TABLE_NAME="message";

    /**
     * message constructor.
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
    public function getTexte()
    {
        return $this->texte;
    }

    /**
     * @param mixed $texte
     */
    public function setTexte($texte): void
    {
        $this->texte = $texte;
    }

    /**
     * @return mixed
     */
    public function getIddialogue()
    {
        return $this->iddialogue;
    }

    /**
     * @param mixed $iddialogue
     */
    public function setIddialogue($iddialogue): void
    {
        $this->iddialogue = $iddialogue;
    }

    /**
     * @return mixed
     */
    public function getTextdialogue()
    {
        return $this->textdialogue;
    }

    /**
     * @param mixed $textdialogue
     */
    public function setTextdialogue($textdialogue): void
    {
        $this->textdialogue = $textdialogue;
    }

    /**
     * @return mixed
     */
    public function getIsAChoice()
    {
        return $this->isAChoice;
    }

    /**
     * @param mixed $isAChoice
     */
    public function setIsAChoice($isAChoice): void
    {
        $this->isAChoice = $isAChoice;
    }

    /**
     * @return mixed
     */
    public function getIdPersonnage()
    {
        return $this->idPersonnage;
    }

    /**
     * @param mixed $idPersonnage
     */
    public function setIdPersonnage($idPersonnage): void
    {
        $this->idPersonnage = $idPersonnage;
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
    public function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.

        return $this->getJSONEncode();
    }

}