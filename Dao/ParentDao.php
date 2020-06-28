<?php


class ParentDao
{
    private $bdd;
    private $data;
    private $variable;

    /**
     * @return mixed
     */
    public function getVariable()
    {
        return $this->variable;
    }

    /**
     * @param mixed $variable
     */
    public function setVariable($variable): void
    {
        $this->variable = $variable;
    }

    /**
     * ParentDao constructor.
     */

    public function init()
    {
        $data = new DatabaseClass();
        $bdd = $data->getDbbConnection();
    }

    /**
     * @return mixed
     */
    public function getBdd()
    {
        return $this->bdd;
    }

    /**
     * @param mixed $bdd
     */
    public function setBdd($bdd)
    {
        $this->bdd = $bdd;
    }
    //Enable to get all data
    public function Querry($attribut)
    {
        $this->init();
        $class = new ReflectionClass($attribut);
        $attri = $class->getProperty('TABLE_NAME');
        $newAttri = $class->newInstance();
        $tabToSend = array();



        $val =$attri->getValue($this->getVariable());

        $command =  'SELECT * from ' . $val;
        //echo $command;
        $requette =$this->bdd->prepare($command);

        //$requette->bindValue(":TABLE_NAME",$val,PDO::PARAM_STR);
        //echo $val;
        $requette->execute();
        //$requette->debugDumpParams();


        //echo var_dump($requette->fetch());
        $object=$class->newInstance();



        $method = "hydrate";
        /*
        foreach($requette->fetchall() as $tabResult )
        {
            echo "</br>";
            echo "test";
            $obj = $class->newInstance();
            foreach ($tabResult as $tab) {
                echo "new object";
                echo $tab;
                echo var_dump($tab);
                /*
                if (method_exists($obj, 'hydrate')) ;
                {

                    $object->$method($tab);
                    array_push($tabToSend, $object);
                }

            }

        }
        return $tabToSend;
*/

        /*
        for ($i = 0;i<count(var_dump($tabResult).array());$i++)
        {
            $tabResult=$requette->fetch();
            echo var_dump($requette->fetch());

        }
        */
        $i = 0;
        while ($tabresult = $requette->fetch())
        {
            $i++;
            //echo $i;
            //echo var_dump($tabresult);
            $obj = $class->newInstance();

                //echo "new object";



                if (method_exists($obj, 'hydrate'))
                {

                    $obj->$method($tabresult);
                    array_push($tabToSend, $obj);
                }
        }

        return $tabToSend;
    }
    public function QuerryById($attribut,$id)
    {
        $this->init();
        $class = new ReflectionClass($attribut);
        $attri = $class->getProperty('TABLE_NAME');
        $newAttri = $class->newInstance();
        $tabToSend = array();



        $val =$attri->getValue($this->getVariable());

        $command =  'SELECT * from ' . $val .' where id = :id';
        //echo $command;
        $requette =$this->bdd->prepare($command);

        $requette->bindValue(":id",$id,PDO::PARAM_INT);
        //echo $val;
        $requette->execute();
        //$requette->debugDumpParams();

        $method = "hydrate";

        $i = 0;
        while ($tabresult = $requette->fetch())
        {
            $i++;
            //echo $i;
            //echo var_dump($tabresult);
            $obj = $class->newInstance();

            //echo "new object";



            if (method_exists($obj, 'hydrate'))
            {

                $obj->$method($tabresult);
                array_push($tabToSend, $obj);
            }
        }
        return $tabToSend;
    }
    public function QuerryByAttribut($attribut,$id,$NameAtribut)
    {
        $this->init();
        $class = new ReflectionClass($attribut);
        $attri = $class->getProperty('TABLE_NAME');
        //$nameAttri = $class->getProperty($NameAtribut);
        $newAttri = $class->newInstance();
        $tabToSend = array();



        $val =$attri->getValue($this->getVariable());

        $command =  'SELECT * from ' . $val .' where '."$NameAtribut".' = :id';
        //echo $command;
        $requette =$this->bdd->prepare($command);

        $requette->bindValue(":id",$id,PDO::PARAM_INT);
        //echo $val;
        $requette->execute();
        //$requette->debugDumpParams();

        $method = "hydrate";

        $i = 0;
        while ($tabresult = $requette->fetch())
        {
            $i++;
            //echo $i;
            //echo var_dump($tabresult);
            $obj = $class->newInstance();

            //echo "new object";



            if (method_exists($obj, 'hydrate'))
            {

                $obj->$method($tabresult);
                array_push($tabToSend, $obj);
            }
        }

        return $tabToSend;
    }
    public function Post($tab)
    {
        $i =0;
        $this->init();
        $class = new ReflectionClass($tab);
        $attri = $class->getProperty('TABLE_NAME');
        $newAttri = $class->newInstance();
        $tabToSend =[];
        $val =$attri->getValue($this->getVariable());

        $command =  'INSERT INTO '. $val .'(';
        echo $command;
        foreach ($newAttri as $key => $value) {
            $command += $key.',';
        }
        $command+= ') VALUES (';
        foreach ($newAttri as $key => $value) {
            $command += $value.',';
        }
        $i = strlen($command);
        $i--;
        $command = substr($command,$i);
        $command +=');';


        $requette =$this->bdd->prepare($command);
        
        echo $tab;
        //return $requette->execute();
    }
    public function update($tab)
    {
        $this->init();
        $class = new ReflectionClass($tab);
        $attri = $class->getProperty('TABLE_NAME');
        $newAttri = $class->newInstance();
        $tabToSend =[];
        $val =$attri->getValue($this->getVariable());

        $command =  'UPDATE'. $attri .' SET ';
        echo $command;
        foreach ($newAttri as $key => $value) {
            $command += $key.'=';
            $command += $value.',';

        }
        $i = strlen($command);
        $i--;
        $command = substr($command,$i);
        $command+= ')';

    }




}