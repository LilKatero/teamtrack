<?php
session_start();
if (!isset($_SESSION["admin"])) die("Not allowed");
?>

<h1>Admin Dashboard</h1>

<a href="add_player.php">Ajouter joueur</a>