<?php

interface Operation {
    public function calculate($a, $b);
}

class Addition implements Operation {
    public function calculate($a, $b) {
        return $a + $b;
    }
}

class Subtraction implements Operation {
    public function calculate($a, $b) {
        return $a - $b;
    }
}

class Multiplication implements Operation {
    public function calculate($a, $b) {
        return $a * $b;
    }
}

class Division implements Operation {
    public function calculate($a, $b) {
        if ($b == 0) {
            throw new Exception("Division by zero is not allowed.");
        }
        return $a / $b;
    }
}

class Calculator {
    private $operation;

    public function setOperation(Operation $operation) {
        $this->operation = $operation;
    }

    public function execute($a, $b) {
        if (!$this->operation) {
            throw new Exception("No operation set.");
        }
        return $this->operation->calculate($a, $b);
    }
}

$calculator = new Calculator();
$calculator->setOperation(new Addition());
echo "Addition: " . $calculator->execute(10, 5) . "\n";
$calculator->setOperation(new Subtraction());
echo "Subtraction: " . $calculator->execute(10, 5) . "\n";
$calculator->setOperation(new Multiplication());
echo "Multiplication: " . $calculator->execute(10, 5) . "\n";
$calculator->setOperation(new Division());
echo "Division: " . $calculator->execute(10, 5) . "\n";

?>
