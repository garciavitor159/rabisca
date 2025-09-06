<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "consultar_notas") {
    $id = converter_int($_SESSION["id"] ?? "");

    if (!validar_id($id)) {
        encerrar_sessao();
        retornar_resposta(false, ["acessoNegado" => true], "Erro: Acesso negado.", 401);
    }

    if (esta_vazio($pdo)) {
        retornar_resposta(false, [], "Erro: Não foi possível conectar ao banco.", 500);
    }

    try {
        $sql = "CALL proc_consultar_notas(?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!esta_vazio($res)) {
            $notas = [];

            foreach ($res as $col) {
                $notas[] = [
                    "id" => $col["id_nota"],
                    "titulo" => $col["titulo_nota"],
                    "conteudo" => $col["conteudo_nota"]
                ];
            }

            retornar_resposta(true, ["notas" => $notas], null, 200);
        }

        retornar_resposta(false, [], "Erro: Não existem notas cadastradas.", 404);
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

        retornar_resposta(false, [], "Erro: Não foi possível consultar suas notas.", 500);
    }
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
