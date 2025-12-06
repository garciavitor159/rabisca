<?php 
    require_once "funcoes.php";
    $dados = resgataDados();

    if (empty($dados)) {
        retornaResposta(false, [], "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
    }

    $acao = trim($dados["acao"]);

    if ($acao !== "cadastrar-usuario") {
        retornaResposta(false, [], "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 400);
    }

    $nomeUsuario = trim($dados["nomeUsuario"]);
    $senha = trim($dados["senha"]);
    $perguntaSeguranca = trim($dados["perguntaSeguranca"]);
    $resposta = trim($dados["resposta"]);

    if (!validaValorObrigatorio($nomeUsuario, 70)) {
        retornaResposta(false, ["campoErro" => "nome-usuario"], "Erro: O nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", 400);
    }

    if (!validaSenha($senha)) {
        retornaResposta(false, ["campoErro" => "senha"], "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo ao menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", 400);
    }

    if (!validaPerguntaSeguranca($perguntaSeguranca)) {
        retornaResposta(false, ["campoErro" => "pergunta-seguranca"], "Erro: A pergunta de segurança é obrigatória e deve ser válida. Por favor, tente novamente.", 400);
    }

    if (!validaValorObrigatorio($resposta, 70)) {
        retornaResposta(false, ["campoErro" => "resposta"], "Erro: A resposta é obrigatória e deve conter até 70 caracteres. Por favor, tente novamente.", 400);
    }

    $senhaHash = password_hash($senha, PASSWORD_BCRYPT);
    $perguntaSeguranca = intval($perguntaSeguranca);
    $pdo = conectaBanco();

    if (empty($pdo)) {
        retornaResposta(false, [], "Erro: Não foi possível estabelecer uma conexão com o banco de dados. Por favor, tente novamente mais tarde.", 500);
    }

    try {
        $sql = "CALL procCadastraUsuario(?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nomeUsuario, $senhaHash, $perguntaSeguranca, $resposta]);
        retornaResposta(true, [], "Cadastro efetuado com sucesso.", 201);
    } catch (PDOException $err) {
        error_log("Erro: " . $err->getMessage() . ".", 0);

        if ($err->getCode() === "45000") {
            retornaResposta(false, [], "Erro: Usuário já cadastrado. Por favor, tente novamente com outro nome de usuário.", 409);
        }

        retornaResposta(false, [], "Erro: Não foi possível efetuar seu cadastro. Por favor, tente novamente mais tarde.", 500);
    }
?>