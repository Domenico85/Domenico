<?php

$garage = [
    ["brand" => "Toyota", "model" => "Corolla"],
    ["brand" => "Ford", "model" => "Mustang"],
    ["brand" => "Toyota", "model" => "Yaris"],
    ["brand" => "BMW", "model" => "X5"],
    ["brand" => "Ford", "model" => "Focus"]
];

function filterModelsByBrand($garage, $brand) {
    $models = []; 

    foreach ($garage as $car) {
      
        if ($car["brand"] === $brand) {
            array_push($models, $car["model"]); 
        }
    }

    return $models;
}


$brand = "Toyota";
$result = filterModelsByBrand($garage, $brand);
print_r($result);
?>
