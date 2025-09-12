<?php 
    function resgatar_dados() {
        return $_SERVER["REQUEST_METHOD"] === "POST" ? json_decode(file_get_contents("php://input"), true) : $_GET;
    }

    function esta_vazio($valor) {
        return empty($valor);
    }

    function retornar_resposta($sucesso, $dados, $msg, $codigo_http) {
        if (esta_vazio($dados)) {
            $dados = new stdClass();
        }

        header("Content-Type: application/json; charset=utf-8");
        http_response_code($codigo_http);
        die(json_encode(["sucesso" => $sucesso, "dados" => $dados, "msg" => $msg]));
    }

    function limpar_valor($valor) {
        return trim(htmlspecialchars($valor, ENT_QUOTES, "UTF-8"));
    }

    function encerrar_sessao() {
        session_unset();
        session_destroy();
    }
?>