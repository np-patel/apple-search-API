<?php

require '../../config.php';

//get the search query

$searchQuery = urlencode($_GET['searchQuery']);

//get the media type that user choose
$mediaType = $_GET['media'];

// start a connection using cURL
$connection = curl_init();

//Prepare option for the connection
curl_setopt($connection, CURLOPT_URL, 'https://itunes.apple.com/search?term='.$searchQuery.'&media='.$mediaType);
curl_setopt($connection, CURLOPT_RETURNTRANSFER, true);


//proxy settings
curl_setopt($connection, CURLOPT_PROXY, 'proxy');
curl_setopt($connection, CURLOPT_PROXYPORT, '3128');
curl_setopt($connection, CURLOPT_PROXYUSERPWD, YOOBEE_LOGIN.':'.YOOBEE_PASSWORD);

//Execute the connection
$dataFromApple = curl_exec($connection);

//Close the connection
curl_close($connection);

//Prepare the header
header('Content-Type: application/json');

echo $dataFromApple;
