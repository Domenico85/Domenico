<?php
for ($i = 1; $i <= 100; $i++) {
    if ($i % 3 === 0 && $i % 5 === 0) {
        echo "CSS\n";
    } elseif ($i % 3 === 0) {
        echo "PHP\n";
    } elseif ($i % 5 === 0) {
        echo "JAVASCRIPT\n";
    } else {
        echo $i . "\n";
    }
}
?>
