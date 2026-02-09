<?php

//buatkan hredaer json
header('Content-Type: application/json');


$path = __DIR__ . '/assets/json/*.json';
$files = glob($path);

$select = [];
foreach ($files as $filePath) {
    $select[] = basename($filePath, '.json'); // keep only the city name
}

sort($select);

echo json_encode($select); 
