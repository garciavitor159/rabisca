<?php 
session_start();

// Função que valida o método de requisição
function validaMetodoRequisicao($metodoValido) {
    if ($_SERVER["REQUEST_METHOD"] !== $metodoValido) {
        retornaResposta(false, null, "Método de requisição inválido. Por favor, tente novamente mais tarde.", 405);
    }
}

// Função que retorna uma resposta para o front-end
function retornaResposta($sucesso, $dados, $mensagem, $codigoHTTP) {
    $dados = empty($dados) ? new stdClass() : $dados;
    http_response_code($codigoHTTP);

    echo json_encode([
        "sucesso" => $sucesso,
        "dados" => $dados,
        "mensagem" => $mensagem
    ]);

    exit();
}

// Função que resgata os dados vindos do front-end
function resgataDados() {
    $dados = $_SERVER["REQUEST_METHOD"] === "GET" ? $_GET : json_decode(file_get_contents("php://input"), true);

    if (empty($dados)) {
        retornaResposta(false, null, "Dados inválidos. Por favor, tente novamente mais tarde.", 400);
    }

    return $dados;
}

// Função que valida a ação vinda do front-end
function validaAcao($acaoEnviada, $acaoValida) {
    if ($acaoEnviada !== $acaoValida) {
        retornaResposta(false, null, "Ação inválida. Por favor, tente novamente mais tarde.", 422);
    }
}

// Função que encerra a sessão do usuário
function encerraSessao() {
    session_unset();
    session_destroy();
}
?>