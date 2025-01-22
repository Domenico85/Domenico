<?php
class Car {
    protected static $count = 0; 
    protected $brand;
    protected $model;
    protected $doors;
    protected $price;

    public function __construct($brand, $model, $doors, $price) {
        $this->brand = $brand;
        $this->model = $model;
        $this->doors = $doors;
        $this->price = $price;
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "Brand: {$this->brand}, Model: {$this->model}, Doors: {$this->doors}, Price: {$this->price}";
    }
}

class SUV extends Car {
    protected static $count = 0;

    public function __construct($brand, $model, $doors, $price) {
        parent::__construct($brand, $model, $doors, $price);
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "[SUV] " . parent::getDetails();
    }
}

class CompactCar extends Car {
    protected static $count = 0;

    public function __construct($brand, $model, $doors, $price) {
        parent::__construct($brand, $model, $doors, $price);
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "[CompactCar] " . parent::getDetails();
    }
}

class SportsCar extends Car {
    protected static $count = 0;

    public function __construct($brand, $model, $doors, $price) {
        parent::__construct($brand, $model, $doors, $price);
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "[SportsCar] " . parent::getDetails();
    }
}


$suv1 = new SUV("Toyota", "RAV4", 5, 35000);
$suv2 = new SUV("Honda", "CR-V", 5, 32000);

$CompactCar1 = new CompactCar("Fiat", "Panda", 3, 15000);
$CompactCar2 = new CompactCar("Volkswagen", "Polo", 5, 20000);

$SportsCar1 = new SportsCar("Ferrari", "488", 2, 250000);
$SportsCar2 = new SportsCar("Lamborghini", "Huracan", 2, 300000);


echo $suv1->getDetails() . "\n";
echo $suv2->getDetails() . "\n";
echo $CompactCar1->getDetails() . "\n";
echo $CompactCar2->getDetails() . "\n";
echo $SportsCar1->getDetails() . "\n";
echo $SportsCar2->getDetails() . "\n";


echo "Total Cars: " . Car::getCount() . "\n";
echo "Total SUVs: " . SUV::getCount() . "\n";
echo "Total CompactCars: " . CompactCar::getCount() . "\n";
echo "Total Sportive: " . SportsCar::getCount() . "\n";
?>
