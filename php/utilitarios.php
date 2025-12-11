<?php 
session_start();

function resgataDados($metodoRequisicaoRequerido) {
    $metodoRequisicao = $_SERVER["REQUEST_METHOD"];

    if ($metodoRequisicao !== $metodoRequisicaoRequerido) {
        retornaResposta(false, null, "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.", 405);
    }

    $dados = $metodoRequisicao === "GET" ? $_GET : json_decode(file_get_contents("php://input"), true);

    if (empty($dados)) {
        retornaResposta(false, null, "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
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
        retornaResposta(false, null, "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 400);
    }
}

function encerraSessao() {
    session_unset();
    session_destroy();
}

function validaDados($dados, $acao) {
    $id = $dados["id"] ?? "";
    $nome = $dados["nome"] ?? "";
    $senha = $dados["senha"] ?? "";
    $perguntaSeguranca = $dados["pergunta-seguranca"] ?? "";
    $resposta = $dados["resposta"] ?? "";
    $titulo = $dados["titulo"] ?? "";
    $texto = $dados["texto"] ?? "";

    if ($acao === "cadastrar-usuario" || $acao === "editar-senha" || $acao === "editar-usuario") {
        if (!validaValorObrigatorio($nome, 70)) {
            retornaResposta(false, ["campoErro" => "nome"], "Erro: O nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", 400);
        }

        if (!validaSenha($senha)) {
            retornaResposta(false, ["campoErro" => "senha"], "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", 400);
        }

        if (!validaPerguntaSeguranca($perguntaSeguranca)) {
            retornaResposta(false, ["campoErro" => "pergunta-seguranca"], "Erro: A pergunta de segurança é obrigatória e deve ser válida. Por favor, tente novamente.", 400);
        }

        if (!validaValorObrigatorio($resposta, 70)) {
            retornaResposta(false, ["campoErro" => "resposta"], "Erro: A resposta é obrigatória e deve conter até 70 caracteres. Por favor, tente novamente.", 400);
        }
    }

    if ($acao === "fazer-login") {
        if (!validaValorObrigatorio($nome, 70)) {
            retornaResposta(false, ["campoErro" => "nome"], "Erro: O nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", 400);
        }

        if (!validaSenha($senha)) {
            retornaResposta(false, ["campoErro" => "senha"], "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", 400);
        }
    }

    if ($acao === "cadastrar-nota" || $acao === "editar-nota") {
        if (!validaValorObrigatorio($titulo, 70)) {
            retornaResposta(false, ["campoErro" => "titulo"], "Erro: O título é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", 400);
        }

        if (!validaValorObrigatorio($texto, 200)) {
            retornaResposta(false, ["campoErro" => "texto"], "Erro: O texto é obrigatório e deve conter até 200 caracteres. Por favor, tente novamente.", 400);
        }
    }

    if ($acao === "editar-usuario" || $acao === "editar-nota") {
        if (filter_var($id, FILTER_VALIDATE_INT) === false || intval($id) < 1) {
            retornaResposta(false, [], "Erro: O ID é obrigatório e deve ser um número inteiro maior ou igual a 1. Por favor, tente novamente mais tarde.", 400);
        }
    }
}

function validaValorObrigatorio($valor, $quantidadeCaracteres) {
    return !empty($valor) && strlen($valor) <= $quantidadeCaracteres;
}

function validaSenha($senha) {
    return preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/", $senha) === 1 && strlen($senha) >= 8 && strlen($senha) <= 30;
}

function validaPerguntaSeguranca($perguntaSeguranca) {
    return in_array($perguntaSeguranca, ["0", "1", "2"]);
}

function conectaBanco() {
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=rabisca;charset=utf8mb4", "vitor", "Local450@#");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Erro: " . $e->getMessage() . ".", 0);
        retornaResposta(false, null, "Erro: Não foi possível estabelecer uma conexão com o banco de dados. Por favor, tente novamente mais tarde.", 500);
    }
}
?>