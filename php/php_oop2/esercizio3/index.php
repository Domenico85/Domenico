<?php

// Abstract class for Payment
abstract class Payment {
    protected $amount;

    public function __construct($amount) {
        $this->amount = $amount;
    }

    // Abstract method to be implemented by subclasses
    abstract public function processPayment();
}

// Class for Credit Card Payment
class CreditCardPayment extends Payment {
    public function processPayment() {
        echo "Processing a credit card payment of $this->amount \n";
    }
}

// Class for PayPal Payment
class PayPalPayment extends Payment {
    public function processPayment() {
        echo "Processing a PayPal payment of $this->amount \n";
    }
}

//  Class for Cash Payment
class CashPayment extends Payment {
    public function processPayment() {
        echo "Processing a cash payment of $this->amount \n";
    }
}

// Transaction class
class Transaction {
    private $payment;

    // Accepts an instance of Payment using Dependency Injection
    public function __construct(Payment $payment) {
        $this->payment = $payment;
    }

    // Executes the transaction
    public function execute() {
        echo "Executing transaction...\n";
        $this->payment->processPayment();
    }
}



// Example 1: Credit Card Payment
$creditCardPayment = new CreditCardPayment(100);
$transaction1 = new Transaction($creditCardPayment);
$transaction1->execute();

// Example 2: PayPal Payment
$payPalPayment = new PayPalPayment(250);
$transaction2 = new Transaction($payPalPayment);
$transaction2->execute();

// Example 3: Cash Payment
$cashPayment = new CashPayment(50);
$transaction3 = new Transaction($cashPayment);
$transaction3->execute();
