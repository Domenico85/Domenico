<?php
function greetUsers($users) {
    foreach ($users as $user) {
        $name = $user['name'];
        $surname = $user['surname'];
        $gender = strtolower($user['gender']);

        if ($gender === 'male') {
            echo "Good morning Mr. $name $surname<br>";
        } elseif ($gender === 'female') {
            echo "Good morning Ms. $name $surname<br>";
        } else {
            echo "Good morning $name $surname<br>";
        }
    }
}

$users = [
    ["name" => "John", "surname" => "Doe", "gender" => "Male"],
    ["name" => "Jane", "surname" => "Smith", "gender" => "Female"],
    ["name" => "Alex", "surname" => "Johnson", "gender" => "Unspecified"],
    ["name" => "Mary", "surname" => "Brown", "gender" => "Female"],
    ["name" => "Mark", "surname" => "Taylor", "gender" => "Male"]
];

greetUsers($users);
?>
