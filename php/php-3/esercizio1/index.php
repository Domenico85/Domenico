<?php

$class = [
    [
        "first_name" => "Mario",
        "last_name" => "Rossi",
        "age" => 16,
        "average_grade" => 7.5
    ],
    [
        "first_name" => "Anna",
        "last_name" => "Verdi",
        "age" => 17,
        "average_grade" => 8.0
    ],
    [
        "first_name" => "Luca",
        "last_name" => "Bianchi",
        "age" => 16,
        "average_grade" => 6.8
    ]
];


function printStudentList($class) {
    echo "List of Students:\n";
    foreach ($class as $student) {
        echo "- {$student['first_name']} {$student['last_name']} (Age: {$student['age']}, Average Grade: {$student['average_grade']})\n";
    }
}


function calculateClassAverage($class) {
    $totalGrades = 0;
    $numberOfStudents = count($class);

    foreach ($class as $student) {
        $totalGrades += $student['average_grade'];
    }

    return $numberOfStudents > 0 ? $totalGrades / $numberOfStudents : 0;
}

printStudentList($class);
echo "\n";

$classAverage = calculateClassAverage($class);
echo "Class Average Grade: " . number_format($classAverage, 2) . "\n";
?>
