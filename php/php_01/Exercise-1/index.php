<?php
function averageEvenNumbers($array) {
    $evenNumbers = [];
    foreach ($array as $number) {
        if ($number % 2 === 0) {
            $evenNumbers[] = $number;
        }
    }

    if (count($evenNumbers) === 0) {
        return "No even numbers in the array.";
    }

    $sum = array_sum($evenNumbers);
    $average = $sum / count($evenNumbers);
    return $average;
}

$array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$result = averageEvenNumbers($array);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>PHP Even Numbers Average</title>
</head>
<body>
    <h1>The average of even numbers is: <?php echo $result; ?></h1>
</body>
</html>
