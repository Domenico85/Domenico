<?php

const SPECIAL_CHARS = ['*', '!', '#', '@', '='];

function checkLength($string) {
    return strlen($string) >= 8;
}

function hasUppercaseLetter($string) {
    for ($i = 0; $i < strlen($string); $i++) {
        if (ctype_upper($string[$i])) {
            return true;
        }
    }
    return false;
}

function hasNumber($string) {
    for ($i = 0; $i < strlen($string); $i++) {
        if (is_numeric($string[$i])) {
            return true;
        }
    }
    return false;
}

function hasSpecialCharacter($string, $specialChars = SPECIAL_CHARS) {
    for ($i = 0; $i < strlen($string); $i++) {
        if (in_array($string[$i], $specialChars)) {
            return true;
        }
    }
    return false;
}


$passwordValid = false;

do {
    $password = readline("Enter your password: ");
    
    if (checkLength($password) 
        && hasNumber($password) 
        && hasUppercaseLetter($password) 
        && hasSpecialCharacter($password)) {
        
        echo "Password validated successfully!\n";
        $passwordValid = true;
    } else {
        echo "Invalid password. Please try again.\n";
    }
} while (!$passwordValid);
?>
