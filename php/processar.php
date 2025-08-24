<?php
header("Content-Type: application/json");
require_once "funcoes.php";
$requisicao = $_SERVER["REQUEST_METHOD"];

switch ($requisicao) {
    case "GET":
        $acao = limparVal($_GET["acao"] ?? "");

        switch ($acao) {
            case "resgatar_ano_atual":
                echo json_encode(["anoAtual" => date("Y")]);
                exit;
        }

        break;
    default:
        echo json_encode(["deuErro" => true, "msg" => "Erro: Requisição inválida."]);
        exit;
}
