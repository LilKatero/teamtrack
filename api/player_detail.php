<?php
require "pandascore.php";

$id = $_GET["id"];

$data = callAPI("players/$id");

header("Content-Type: application/json");
echo json_encode($data);