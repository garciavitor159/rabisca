<?php 
    require_once "inicia-sessao.php";

    function resgataDados() {
        return $_SERVER["REQUEST_METHOD"] === "GET" ? $_GET : json_decode(file_get_contents("php://input"), true);
    }

    function retornaResposta($sucesso, $dados, $msg, $codHTTP) {
        if (empty($dados)) {
            $dados = new stdClass();
        }

        http_response_code($codHTTP);

        die(json_encode([
            "sucesso" => $sucesso,
            "dados" => $dados,
            "msg" => $msg
        ]));
    }

    function encerraSessao() {
        session_unset();
        session_destroy();
    }
?>