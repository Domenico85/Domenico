<?php

// Abstract class for Developer
abstract class Developer {
    protected $name;
    protected $specialization;

    public function __construct($name, $specialization) {
        $this->name = $name;
        $this->specialization = $specialization;
    }

    // Abstract method to print developer info
    abstract public function printInfo();
}

// Abstract class for Designer
abstract class Designer {
    protected $name;
    protected $expertise;

    public function __construct($name, $expertise) {
        $this->name = $name;
        $this->expertise = $expertise;
    }

    // Abstract method to print designer info
    abstract public function printInfo();
}

// Frontend Developer class
class FrontendDeveloper extends Developer {
    public function printInfo() {
        echo "Frontend Developer: $this->name, Specialization: $this->specialization\n";
    }
}

// Backend Developer class
class BackendDeveloper extends Developer {
    public function printInfo() {
        echo "Backend Developer: $this->name, Specialization: $this->specialization\n";
    }
}

// UX Designer class
class UXDesigner extends Designer {
    public function printInfo() {
        echo "UX Designer: $this->name, Expertise: $this->expertise\n";
    }
}

// Graphic Designer class
class GraphicDesigner extends Designer {
    public function printInfo() {
        echo "Graphic Designer: $this->name, Expertise: $this->expertise\n";
    }
}

// Team class
class Team {
    private $members = [];
    private const MAX_MEMBERS = 8;

    // Method to add a member to the team
    public function addMember($member) {
        if (count($this->members) < self::MAX_MEMBERS) {
            $this->members[] = $member;
            echo "Member added to the team: ";
            $member->printInfo();
        } else {
            echo "Cannot add more members. The team is already full.\n";
        }
    }

    // Method to count the number of members in the team
    public function countMembers() {
        return count($this->members);
    }

    // Method to display all team members
    public function displayTeamMembers() {
        echo "Team Members:\n";
        foreach ($this->members as $member) {
            $member->printInfo();
        }
    }
}


$team = new Team();

$frontendDev = new FrontendDeveloper("Alice", "React.js");
$backendDev = new BackendDeveloper("Bob", "Node.js");
$uxDesigner = new UXDesigner("Charlie", "User Research");
$graphicDesigner = new GraphicDesigner("Diana", "Illustration");

// Add members to the team
$team->addMember($frontendDev);
$team->addMember($backendDev);
$team->addMember($uxDesigner);
$team->addMember($graphicDesigner);

// Display the number of team members
echo "Number of team members: " . $team->countMembers() . "\n";

// Display all team members
$team->displayTeamMembers();

// Attempt to add more members beyond the limit
for ($i = 1; $i <= 5; $i++) {
    $team->addMember(new FrontendDeveloper("Dev$i", "HTML/CSS"));
}
