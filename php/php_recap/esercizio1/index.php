<?php


$products = array();


echo "Enter product names and prices:\n";
for ($i = 0; $i < 5; $i++) {
    echo "Product " . ($i + 1) . " name: ";
    $productName = readline();
    echo "Product " . ($i + 1) . " price: ";
    $productPrice = floatval(readline());

    
    $products[$productName] = $productPrice;
}


$totalPrice = 0;
foreach ($products as $price) {
    $totalPrice += $price;
}


echo "Total price of all products: $" . number_format($totalPrice, 2) . "\n";

?>
