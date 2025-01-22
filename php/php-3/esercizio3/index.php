<?php

$users = [
    ["name" => "Mario", "age" => 25, "email" => "mario@example.com", "subscribed" => true],
    ["name" => "Luca", "age" => 30, "email" => "luca@example.com", "subscribed" => false],
    ["name" => "Anna", "age" => 28, "email" => "anna@example.com", "subscribed" => true],
    ["name" => "Sophia", "age" => 22, "email" => "sophia@example.com", "subscribed" => true],
    ["name" => "Marco", "age" => 35, "email" => "marco@example.com", "subscribed" => false],
];


function filterUsers($users) {
    return array_filter($users, function($user) {
        return $user['age'] > 25 && $user['subscribed'];
    });
}


function sortUsersByAgeDescending(&$users) {
    usort($users, function($a, $b) {
        return $b['age'] - $a['age'];
    });
}


function getSubscribedUserEmails($users) {
    return array_map(function($user) {
        return $user['email'];
    }, array_filter($users, function($user) {
        return $user['subscribed'];
    }));
}


$filteredUsers = filterUsers($users);
echo "Filtered Users (Age > 25 and Subscribed):\n";
print_r($filteredUsers);
echo "\n";


sortUsersByAgeDescending($users);
echo "Users Sorted by Age (Descending):\n";
print_r($users);
echo "\n";


$subscribedEmails = getSubscribedUserEmails($users);
echo "Emails of Subscribed Users:\n";
print_r($subscribedEmails);
?>
