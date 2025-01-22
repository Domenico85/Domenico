<?php

// Abstract class for a Computer Component
abstract class ComputerComponent {
    public $name;
    public $specification;

    public function __construct($name, $specification) {
        $this->name = $name;
        $this->specification = $specification;
    }

    // Abstract method to be implemented by subclasses
    abstract public function displayInfo();
}

// Class for RAM
class RAM extends ComputerComponent {
    public function displayInfo() {
        echo "RAM: $this->name, Specification: $this->specification \n";
    }
}

// Class for ROM
class ROM extends ComputerComponent {
    public function displayInfo() {
        echo "ROM: $this->name, Specification: $this->specification \n";
    }
}

// Class for GraphicsCard
class GraphicsCard extends ComputerComponent {
    public function displayInfo() {
        echo "Graphics Card: $this->name, Specification: $this->specification \n";
    }
}

// Computer class
class Computer {
    private $ram;
    private $rom;
    private $graphicsCard;

    public function __construct(RAM $ram, ROM $rom, GraphicsCard $graphicsCard) {
        $this->ram = $ram;
        $this->rom = $rom;
        $this->graphicsCard = $graphicsCard;
    }

    // Display RAM info
    public function displayRAMInfo() {
        $this->ram->displayInfo();
    }

    // Display ROM info
    public function displayROMInfo() {
        $this->rom->displayInfo();
    }

    // Display Graphics Card info
    public function displayGraphicsCardInfo() {
        $this->graphicsCard->displayInfo();
    }

    // Display all component info
    public function displayAllComponentsInfo() {
        echo "Computer Components:\n";
        $this->displayRAMInfo();
        $this->displayROMInfo();
        $this->displayGraphicsCardInfo();
    }
}

// Object Composition
$ram = new RAM("Corsair Vengeance", "16GB DDR4 3200MHz");
$rom = new ROM("Samsung 980 PRO", "1TB NVMe SSD");
$graphicsCard = new GraphicsCard("NVIDIA GeForce RTX 3080", "10GB GDDR6X");

$computer = new Computer($ram, $rom, $graphicsCard);

// Display information about each component
$computer->displayAllComponentsInfo();
