<?php
require "api/db.php";

$api_id = $_GET["id"] ?? null;

if (!$api_id) {
    die("❌ ID manquant");
}

// 🔥 récupération joueur directement en base
$stmt = $pdo->prepare("SELECT * FROM players WHERE api_id = ?");
$stmt->execute([$api_id]);
$player = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$player) {
    die("❌ Joueur introuvable");
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Profil joueur</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<header>
    <h1>🎮 Profil joueur</h1>
</header>

<div class="card">

    <h1><?= $player["nickname"] ?></h1>

<p>👤 Nom réel : <?= $player["real_name"] ?? "Unknown" ?></p>

<p>🌍 Pays : <?= $player["country"] ?></p>

<p>🎮 Jeu : <?= $player["game"] ?></p>


</div>

<a href="index.php" class="btn">⬅ Retour</a>

</body>
</html>