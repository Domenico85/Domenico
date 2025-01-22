<?php

$products = [
    [
        "name" => "Laptop",
        "category" => "Electronics",
        "price" => 1000,
        "quantity_available" => 10
    ],
    [
        "name" => "Smartphone",
        "category" => "Electronics",
        "price" => 600,
        "quantity_available" => 20
    ],
    [
        "name" => "Table",
        "category" => "Furniture",
        "price" => 150,
        "quantity_available" => 5
    ],
    [
        "name" => "Chair",
        "category" => "Furniture",
        "price" => 50,
        "quantity_available" => 30
    ],
    [
        "name" => "Refrigerator",
        "category" => "Appliances",
        "price" => 500,
        "quantity_available" => 8
    ]
];


function displayProducts($products) {
    echo "Product List:\n";
    foreach ($products as $product) {
        echo "- {$product['name']} (Category: {$product['category']}, Price: {$product['price']}, Quantity Available: {$product['quantity_available']})\n";
    }
}


function updateProductQuantity(&$products, $productName, $newQuantity) {
    foreach ($products as &$product) {
        if (strtolower($product['name']) === strtolower($productName)) {
            $product['quantity_available'] = $newQuantity;
            echo "Quantity for '{$productName}' has been updated to {$newQuantity}.\n";
            return;
        }
    }
    echo "Product '{$productName}' not found.\n";
}


function calculateTotalInventoryValue($products) {
    $totalValue = 0;
    foreach ($products as $product) {
        $totalValue += $product['price'] * $product['quantity_available'];
    }
    return $totalValue;
}


displayProducts($products);
echo "\n";


updateProductQuantity($products, "Laptop", 15);
echo "\n";


$totalValue = calculateTotalInventoryValue($products);
echo "Total Inventory Value: " . number_format($totalValue, 2) . "\n";
?>
