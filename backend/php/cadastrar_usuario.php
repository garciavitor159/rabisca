<?php
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "cadastrar_usuario") {
    $nome = limpar_val($dados["nome"] ?? "");
    $email = limpar_val($dados["email"] ?? "");
    $senha = limpar_val($dados["senha"] ?? "");
    $pergunta_seguranca = limpar_val($dados["perguntaSeguranca"] ?? "");
    $resposta = limpar_val($dados["resposta"] ?? "");

    if (!validar_nome($nome)) {
        retornar_resposta(
            false,
            ["campoErr" => "nome"],
            "Erro: O nome é obrigatório, deve conter somente letras e espaços e ter até 50 caracteres.",
            400
        );
    }

    if (!validar_email($email)) {
        retornar_resposta(
            false,
            ["campoErr" => "email"],
            "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres.",
            400
        );
    }

    if (!validar_senha($senha)) {
        retornar_resposta(
            false,
            ["campoErr" => "senha"],
            "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
            400
        );
    }

    if (!validar_pergunta_seguranca($pergunta_seguranca)) {
        retornar_resposta(
            false,
            ["campoErr" => "pergunta_seguranca"],
            "Erro: A pergunta de segurança é obrigatória e deve ser válida.",
            400
        );
    }

    if (!validar_val_obrigatorio($resposta, 70)) {
        retornar_resposta(
            false,
            ["campoErr" => "resposta"],
            "Erro: A resposta é obrigatória e deve conter até 70 caracteres.",
            400
        );
    }

    if (esta_vazio($pdo)) {
        retornar_resposta(false, [], "Erro: Não foi possível conectar ao banco.", 500);
    }

    $senha = criptografar_val($senha);
    $resposta = criptografar_val($resposta);

    try {
        $sql = "CALL proc_cadastrar_usuario(?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email, $senha, $pergunta_seguranca, $resposta]);
        retornar_resposta(true, [], "Cadastro efetuado com sucesso.", 201);
    } catch (PDOException $err) {
        $msg_err = $err->getMessage();
        $cod_err = $err->getCode();
        exibir_err_log("Erro: $msg_err.");

        if ($cod_err === "45000") {
            if (contem_val($msg_err, "usuario_ja_cadastrado")) {
                retornar_resposta(false, [], "Erro: Usuário já cadastrado.", 409);
            }
        }

        retornar_resposta(false, [], "Erro: Não foi possível efetuar seu cadastro.", 500);
    }
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
