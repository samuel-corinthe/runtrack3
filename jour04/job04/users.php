<?php
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "utilisateurs";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $pdo->query("SELECT * FROM utilisateurs");
    $users = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
