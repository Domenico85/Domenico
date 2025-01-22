<?php

interface Animal {
    public function makeSound();
    public function move();
}

class Dog implements Animal {
    public function makeSound() {
        return "Dog: Bark!";
    }

    public function move() {
        return "Dog: Walking on four legs.";
    }
}

class Bird implements Animal {
    public function makeSound() {
        return "Bird: Chirp!";
    }

    public function move() {
        return "Bird: Flying in the sky.";
    }
}

class Fish implements Animal {
    public function makeSound() {
        return "Fish: No sound.";
    }

    public function move() {
        return "Fish: Swimming in water.";
    }
}

$animals = [
    new Dog(),
    new Bird(),
    new Fish()
];

foreach ($animals as $animal) {
    echo $animal->makeSound() . "\n";
    echo $animal->move() . "\n";
}

?>
