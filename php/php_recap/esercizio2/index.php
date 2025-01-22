<?php


$phoneBook = array(
    "Alice" => "123-456-7890",
    "Bob" => "234-567-8901",
    "Charlie" => "345-678-9012",
    "Diana" => "456-789-0123",
    "Eve" => "567-890-1234"
);


function searchPhoneNumber($name, $phoneBook) {
    if (isset($phoneBook[$name])) {
        return "The phone number for $name is " . $phoneBook[$name] . ".";
    } else {
        return "Name $name not found in the phonebook.";
    }
}


echo "Enter a name to search for the phone number: ";
$nameToSearch = readline();


$result = searchPhoneNumber($nameToSearch, $phoneBook);
echo $result . "\n";

?>
