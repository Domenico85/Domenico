<?php
class Book {
    protected static $count = 0;
    protected $title;
    protected $author;
    protected $publicationYear;

    public function __construct($title, $author, $publicationYear) {
        $this->title = $title;
        $this->author = $author;
        $this->publicationYear = $publicationYear;
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "Title: {$this->title}, Author: {$this->author}, Publication Year: {$this->publicationYear}";
    }
}

class EBook extends Book {
    protected static $count = 0;
    private $format;

    public function __construct($title, $author, $publicationYear, $format) {
        parent::__construct($title, $author, $publicationYear);
        $this->format = $format;
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "[EBook] " . parent::getDetails() . ", Format: {$this->format}";
    }

    public function isValidFormat() {
        return strtolower($this->format) === "pdf" ? "Valid format" : "Invalid format";
    }
}

class PrintBook extends Book {
    protected static $count = 0;
    private $pages;

    public function __construct($title, $author, $publicationYear, $pages) {
        parent::__construct($title, $author, $publicationYear);
        $this->pages = $pages;
        static::$count++;
    }

    public static function getCount() {
        return static::$count;
    }

    public function getDetails() {
        return "[PrintBook] " . parent::getDetails() . ", Pages: {$this->pages}";
    }

    public function isValidPageCount() {
        return $this->pages <= 400 ? "Valid page count" : "Invalid page count";
    }
}


$ebook1 = new EBook("Digital Transformation", "John Doe", 2020, "PDF");
$ebook2 = new EBook("AI Revolution", "Jane Smith", 2021, "EPUB");

$printBook1 = new PrintBook("Classic Literature", "Mark Twain", 1884, 300);
$printBook2 = new PrintBook("Advanced Programming", "Alan Turing", 1950, 450);


echo $ebook1->getDetails() . "\n";
echo $ebook2->getDetails() . "\n";
echo $printBook1->getDetails() . "\n";
echo $printBook2->getDetails() . "\n";


echo $ebook1->isValidFormat() . "\n";
echo $ebook2->isValidFormat() . "\n";
echo $printBook1->isValidPageCount() . "\n";
echo $printBook2->isValidPageCount() . "\n";


echo "Total Books: " . Book::getCount() . "\n";
echo "Total EBooks: " . EBook::getCount() . "\n";
echo "Total PrintBooks: " . PrintBook::getCount() . "\n";
?>
