<?php


class DtoPrincipal
{

    /**
     * DtoPrincipal constructor.
     */
    public function __construct()
    {
    }


    public function hydrates(array $donnees)
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
}