<?php

class Product {
    public $name;
    public $price;

    public function __construct($name, $price) {
        $this->name = $name;
        $this->price = $price;
    }
}

class Cart {
    private $products = [];

    public function addProduct(Product $product) {
        $this->products[] = $product;
    }

    public function calculateTotal() {
        $total = 0;
        foreach ($this->products as $product) {
            $total += $product->price;
        }
        return $total;
    }

    public function listProducts() {
        $productList = [];
        foreach ($this->products as $product) {
            $productList[] = $product->name . " ($" . number_format($product->price, 2) . ")";
        }
        return $productList;
    }
}

$cart = new Cart();
$cart->addProduct(new Product("Laptop", 1200.50));
$cart->addProduct(new Product("Phone", 799.99));
$cart->addProduct(new Product("Headphones", 149.99));

echo "Products in the cart:\n";
echo implode("\n", $cart->listProducts()) . "\n";

echo "Total price: $" . number_format($cart->calculateTotal(), 2) . "\n";

?>
