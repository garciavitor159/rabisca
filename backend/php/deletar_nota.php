<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "deletar_nota") {
    $id_nota = converter_int($dados["id"] ?? "");
    $id_usuario = converter_int($_SESSION["id"] ?? "");

    if (!validar_id($id_nota)) {
        retornar_resposta(
            false,
            [],
            "Erro: O ID é obrigatório e deve ser um número inteiro maior ou igual a 1.",
            400
        );
    }

    if (!validar_id($id_usuario)) {
        encerrar_sessao();
        retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
    }

    if (esta_vazio($pdo)) {
        retornar_resposta(false, [], "Erro: Não foi possível conectar ao banco.", 500);
    }

    try {
        $sql = "CALL proc_deletar_nota(?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id_nota, $id_usuario]);
        retornar_resposta(true, [], "Nota deletada com sucesso.", 200);
    } catch (PDOException $err) {
        $msg_err = $err->getMessage();
        $cod_err = $err->getCode();
        exibir_err_log("Erro: $msg_err.");

        if ($cod_err === "45000") {
            if (contem_val($msg_err, "usuario_nao_cadastrado")) {
                encerrar_sessao();
                retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
            }

            if (contem_val($msg_err, "nota_nao_cadastrada")) {
                retornar_resposta(false, [], "Erro: Nota não cadastrada.", 404);
            }
        }

        retornar_resposta(false, [], "Erro: Não foi possível deletar sua nota.", 500);
    }
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
