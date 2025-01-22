<?php

abstract class Interior {
    public $sqm;

    public function __construct($squareMeters) {
        $this->sqm = $squareMeters;
    }

    abstract public function interiorInfo();
}

abstract class Exterior {
    public $sqm;

    public function __construct($squareMeters) {
        $this->sqm = $squareMeters;
    }

    abstract public function exteriorInfo();
}

class LivingRoom extends Interior {
    public function interiorInfo() {
        echo "Square meters of living room: $this->sqm \n";
    }
}

class Office extends Interior {
    public function interiorInfo() {
        echo "Square meters of office: $this->sqm \n";
    }
}

class Pool extends Exterior {
    public function exteriorInfo() {
        echo "Square meters of pool area: $this->sqm \n";
    }
}

class Veranda extends Exterior {
    public function exteriorInfo() {
        echo "Square meters of veranda area: $this->sqm \n";
    }
}

class TinyHouse {
    public $interior;
    public $exterior;

    public static $totalSqm = 60;

    public function __construct(Interior $interior, Exterior $exterior) {
        $this->interior = $interior;
        $this->exterior = $exterior;
    }

    public function interiorSqm() {
        $this->interior->interiorInfo();
    }

    public function exteriorSqm() {
        $this->exterior->exteriorInfo();
    }

    public function totalSqm() {
        $total = self::$totalSqm + $this->interior->sqm + $this->exterior->sqm;
        echo "Total square meters of the tiny house: $total \n";
    }
}


$home1 = new TinyHouse(new LivingRoom(40), new Pool(30));
$home1->interiorSqm();
$home1->exteriorSqm();
$home1->totalSqm();

$home2 = new TinyHouse(new Office(20), new Veranda(10));
$home2->interiorSqm();
$home2->exteriorSqm();
$home2->totalSqm();
