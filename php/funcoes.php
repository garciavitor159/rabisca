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

    function validaValorObrigatorio($valor, $qtdMaxCarac) {
        return !empty($valor) && strlen($valor) <= $qtdMaxCarac;
    }

    function validaSenha($senha) {
        return preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/", $senha);
    }

    function validaPerguntaSeguranca($perguntaSeguranca) {
        return in_array($perguntaSeguranca, ["0", "1", "2"]);
    }

    function conectaBanco() {
        try {
            $pdo = new PDO("mysql:host=localhost;dbname=rabisca;charset=utf8mb4", "root", "");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $err) {
            error_log("Erro: " . $err->getMessage() . ".", 0);
            return;
        }
    }
?>