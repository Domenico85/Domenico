<?php

$garage = [
    ["brand" => "Toyota", "model" => "Corolla"],
    ["brand" => "Ford", "model" => "Mustang"],
    ["brand" => "Toyota", "model" => "Yaris"],
    ["brand" => "BMW", "model" => "X5"],
    ["brand" => "Ford", "model" => "Focus"]
];

function filterModelsByBrand($garage, $brand) {
    
    $filteredCars = array_filter($garage, function($car) use ($brand) {
        return $car["brand"] === $brand;
    });


    $models = array_map(function($car) {
        return $car["model"];
    }, $filteredCars);

    return $models;
}


$brand = "Toyota";
$result = filterModelsByBrand($garage, $brand);
print_r($result);
?>
