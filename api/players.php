<?php
require "config.php";

$url = "https://api.pandascore.co/players?per_page=50";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . PANDASCORE_TOKEN
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(["error" => curl_error($ch)]);
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

$players = [];

foreach ($data as $p) {

    $players[] = [
        "api_id" => $p["id"],   // 🔥 IMPORTANT FIX
        "name" => $p["name"] ?? "Unknown",
        "country" => $p["nationality"] ?? "Unknown",
        "game" => $p["current_videogame"]["name"] ?? "Unknown",
        "first_name" => $p["first_name"] ?? null,
        "last_name" => $p["last_name"] ?? null,
        "birthday" => $p["birthday"] ?? null
    ];
}

header("Content-Type: application/json");
echo json_encode($players);
?>