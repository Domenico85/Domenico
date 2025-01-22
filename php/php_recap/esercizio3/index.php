<?php


$grades = [
    "Alessandro" => 8,
    "Beatrice" => 7,
    "Carlo" => 9,
    "Diana" => 6,
    "Elisa" => 10
];


function calculateAverage($grades) {
    $total = array_sum($grades); 
    $count = count($grades); 
    return $total / $count; 
}


function findHighestGrade($grades) {
    $highestGrade = max($grades); 
    $student = array_search($highestGrade, $grades); 
    return [$student, $highestGrade];
}


$averageGrade = calculateAverage($grades);
echo "The average grade is: " . number_format($averageGrade, 2) . "\n";


list($topStudent, $highestGrade) = findHighestGrade($grades);
echo "$topStudent achieved the highest grade of $highestGrade.\n";

?>
