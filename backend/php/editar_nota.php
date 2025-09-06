<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "editar_nota") {
    $id_nota = converter_int($dados["id"] ?? "");
    $titulo = limpar_val($dados["titulo"] ?? "");
    $conteudo = limpar_val($dados["conteudo"] ?? "");
    $id_usuario = converter_int($_SESSION["id"] ?? "");

    if (!validar_id($id_nota)) {
        retornar_resposta(
            false,
            [],
            "Erro: O ID é obrigatório e deve ser um número inteiro maior ou igual a 1.",
            400
        );
    }

    if (!validar_val_obrigatorio($titulo, 80)) {
        retornar_resposta(
            false,
            [],
            "Erro: O título é obrigatório e deve conter até 80 caracteres.",
            400
        );
    }

    if (!validar_val_obrigatorio($conteudo, 200)) {
        retornar_resposta(
            false,
            [],
            "Erro: O conteúdo é obrigatório e deve conter até 200 caracteres.",
            400
        );
    }

    if (!validar_id($id_usuario)) {
        encerrar_sessao();

        retornar_resposta(
            false,
            ["acessoNegado" => true],
            "Erro: Acesso negado.",
            401
        );
    }

    if (esta_vazio($pdo)) {
        retornar_resposta(false, [], "Erro: Não foi possível conectar ao banco.", 500);
    }

    try {
        $sql = "CALL proc_editar_nota(?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id_nota, $titulo, $conteudo, $id_usuario]);
        retornar_resposta(true, [], "Nota editada com sucesso.", 201);
    } catch (PDOException $err) {
        $msg_err = $err->getMessage();
        $cod_err = $err->getCode();
        exibir_err_log("Erro: $msg_err.");

        if ($cod_err === "45000") {
            if (contem_val($msg_err, "usuario_nao_cadastrado")) {
                encerrar_sessao();

                retornar_resposta(
                    false,
                    ["acessoNegado" => true],
                    "Erro: Acesso negado.",
                    401
                );
            }

            if (contem_val($msg_err, "nota_nao_cadastrada")) {
                retornar_resposta(false, [], "Erro: Nota não cadastrada.", 404);
            }

            if (contem_val($msg_err, "nota_ja_cadastrada")) {
                retornar_resposta(false, [], "Erro: Nota já cadastrada.", 409);
            }
        }

        retornar_resposta(false, [], "Erro: Não foi possível editar sua nota.", 500);
    }
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
