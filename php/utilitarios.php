<?php 
    session_start();

    function resgatarDados() {
        return $_SERVER["REQUEST_METHOD"] === "GET" ? $_GET : json_decode(file_get_contents("php://input"), true);
    }

    function retornarResposta($sucesso, $dados, $mensagem, $codigoHTTP) {
        if (empty($dados)) {
            $dados = new stdClass();
        }

        http_response_code($codigoHTTP);

        die(json_encode([
            "sucesso" => $sucesso,
            "dados" => $dados,
            "mensagem" => $mensagem
        ]));
    }

    function encerrarSessao() {
        session_unset();
        session_destroy();
    }
?>