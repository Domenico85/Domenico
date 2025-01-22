<?php

trait TaxCalculator {
    public function calculateTax($price, $taxRate = 0.22) {
        return $price * $taxRate;
    }
}

abstract class Product {
    protected $name;
    protected $price;

    public function __construct($name, $price) {
        $this->name = $name;
        $this->price = $price;
    }

    abstract public function printInfo();
}

class PhysicalProduct extends Product {
    use TaxCalculator;

    private $storeName;

    public function __construct($name, $price, $storeName) {
        parent::__construct($name, $price);
        $this->storeName = $storeName;
    }

    public function printInfo() {
        $tax = $this->calculateTax($this->price);
        $total = $this->price + $tax;
        echo "Physical Product: $this->name, Price: $" . number_format($this->price, 2) . ", Tax: $" . number_format($tax, 2) . ", Total: $" . number_format($total, 2) . ", Store: $this->storeName\n";
    }
}

class DigitalProduct extends Product {
    use TaxCalculator;

    private $ecommerceName;

    public function __construct($name, $price, $ecommerceName) {
        parent::__construct($name, $price);
        $this->ecommerceName = $ecommerceName;
    }

    public function printInfo() {
        $tax = $this->calculateTax($this->price);
        $total = $this->price + $tax;
        echo "Digital Product: $this->name, Price: $" . number_format($this->price, 2) . ", Tax: $" . number_format($tax, 2) . ", Total: $" . number_format($total, 2) . ", E-commerce: $this->ecommerceName\n";
    }
}

$physicalProduct = new PhysicalProduct("Table", 200, "Furniture Store");
$digitalProduct = new DigitalProduct("E-book", 50, "Online Bookstore");

$physicalProduct->printInfo();
$digitalProduct->printInfo();

?>
