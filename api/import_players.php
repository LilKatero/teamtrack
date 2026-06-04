<?php
require "db.php";

$url = "https://api.pandascore.co/players?per_page=50";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer ojUCJ6Num0FhKGLs9Y3ImFl_DB49R6i2df3WX4ZTxulPAU1ncCQ"
]);

$response = curl_exec($ch);

if ($response === false) {
    die("❌ CURL ERROR : " . curl_error($ch));
}

curl_close($ch);

$data = json_decode($response, true);

// 🔥 DEBUG IMPORTANT
if (!is_array($data)) {
    die("❌ API ERROR : réponse invalide : " . $response);
}

foreach ($data as $p) {

    $stmt = $pdo->prepare("
        INSERT INTO players (api_id, nickname, country, game)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        nickname = VALUES(nickname),
        country = VALUES(country),
        game = VALUES(game)
    ");

    $stmt->execute([
        $p["id"] ?? null,
        $p["name"] ?? "Unknown",
        $p["nationality"] ?? null,
        $p["current_videogame"]["name"] ?? null
    ]);
}

echo "Import OK ✔️";
?>