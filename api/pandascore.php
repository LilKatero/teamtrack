<?php
require "config.php";

function callAPI($endpoint) {
    $url = "https://api.pandascore.co/" . $endpoint . "?token=" . PANDASCORE_TOKEN;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $res = curl_exec($ch);
    curl_close($ch);

    return json_decode($res, true);
}