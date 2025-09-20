<?php 
    session_start();

    function retornar_resposta($sucesso, $dados, $msg, $cod_http) {
        header("Content-Type: application/json; charset=UTF-8");
        http_response_code($cod_http);
        
        if (empty($dados)) {
            $dados = new stdClass();
        }

        die(json_encode([
            "sucesso" => $sucesso,
            "dados" => $dados,
            "msg" => $msg
        ]));
    }

    function encerrar_sessao() {
        session_unset();
        session_destroy();
    }
?>