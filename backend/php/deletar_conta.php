<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "deletar_conta") {
    $id = converter_int($_SESSION["id"] ?? "");
    $email = limpar_val($dados["email"] ?? "");
    $pergunta_seguranca = limpar_val($dados["perguntaSeguranca"] ?? "");
    $resposta = limpar_val($dados["resposta"] ?? "");

    if (!validar_id($id)) {
        encerrar_sessao();

        retornar_resposta(
            false,
            ["acessoNegado" => true],
            "Erro: Acesso negado.",
            401
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

    try {
        $sql = "CALL proc_validar_pergunta_seguranca(?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);

        if (
            !esta_vazio($res) &&
            $pergunta_seguranca === $res["pergunta_seguranca_usuario"] &&
            verificar_hash($resposta, $res["resposta_usuario"])
        ) {
            $sql = "CALL proc_deletar_usuario(?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);
            encerrar_sessao();
            retornar_resposta(true, [], "Conta deletada com sucesso.", 200);
        }

        retornar_resposta(false, [], "Erro: Informações incorretas.", 401);
    } catch (PDOException $err) {
        $msg_err = $err->getMessage();
        $cod_err = $err->getCode();
        exibir_err_log("Erro: $msg_err.");

        if ($cod_err === "45000") {
            if (contem_val($msg_err, "usuario_nao_cadastrado")) {
                encerrar_sessao();
                retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
            }
        }

        retornar_resposta(false, [], "Erro: Não foi possível deletar sua conta.", 500);
    }
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
