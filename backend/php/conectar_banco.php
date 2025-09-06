<?php
require_once("funcoes.php");
$host = "localhost";
$usuario = "vitor";
$senha = "1234Great@#";
$banco = "rabisca";
$charset = "utf8mb4";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$banco;charset=$charset", $usuario, $senha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $err) {
    $pdo = null;
    $msg_err = $err->getMessage();
    exibir_err_log("Erro: $msg_err.");
}
