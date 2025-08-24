<?php
$host = "localhost";
$usuario = "root";
$senha = "root1234";
$banco = "rabisca";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log("Erro: " . $e->getMessage(), 0);
    $pdo = null;
}
