<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    excluir_sessao("email");
    retornar_resposta(false, ["acessoNegado" => true], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "alterar_senha") {
    $senha = limpar_val($dados["senha"] ?? "");
    $email = limpar_val($_SESSION["email"] ?? "");

    if (!validar_email($email)) {
        excluir_sessao("email");
        retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
    }

    if (!validar_senha($senha)) {
        retornar_resposta(
            false,
            [],
            "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
            400
        );
    }

    if (esta_vazio($pdo)) {
        excluir_sessao("email");

        retornar_resposta(
            false,
            ["acessoNegado" => true],
            "Erro: Não foi possível conectar ao banco.",
            500
        );
    }

    $senha = criptografar_val($senha);

    try {
        if (existe_sessao("email")) {
            $sql = "CALL proc_alterar_senha(?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$senha, $email]);
            excluir_sessao("email");
            retornar_resposta(true, [], "Senha alterada com sucesso.", 201);
        }

        retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
    } catch (PDOException $err) {
        $msg_err = $err->getMessage();
        $cod_err = $err->getCode();
        excluir_sessao("email");
        exibir_err_log("Erro: $msg_err.");

        if ($cod_err === "45000") {
            if (contem_val($msg_err, "usuario_nao_cadastrado")) {
                retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
            }
        }

        retornar_resposta(
            false,
            ["acessoNegado" => true],
            "Erro: Não foi possível alterar sua senha.",
            500
        );
    }
}

excluir_sessao("email");
retornar_resposta(false, ["acessoNegado" => true], "Erro: Ação inválida.", 400);
