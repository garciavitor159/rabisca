<?php 
session_start();

function resgataDados($metodoRequisicaoRequerido) {
    $metodoRequisicao = $_SERVER["REQUEST_METHOD"];

    if ($metodoRequisicao !== $metodoRequisicaoRequerido) {
        retornaResposta(false, [], "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.", 405);
    }

    $dados = $metodoRequisicao === "GET" ? $_GET : json_decode(file_get_contents("php://input"), true);

    if (empty($dados)) {
        retornaResposta(false, [], "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
    }

    return $dados;
}

function retornaResposta($sucesso, $dados, $mensagem, $codigoHTTP) {
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

function validaAcao($acaoEnviada, $acaoRequerida) {
    if ($acaoEnviada !== $acaoRequerida) {
        retornaResposta(false, [], "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 400);
    }
}

function encerraSessao() {
    session_unset();
    session_destroy();
}
?>