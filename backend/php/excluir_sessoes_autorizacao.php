<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "excluir_sessoes_autorizacao") {
    $sessao_excluida = false;

    if (existe_sessao("id")) {
        excluir_sessao("id");
        $sessao_excluida = true;
    }

    if (existe_sessao("email")) {
        excluir_sessao("email");
        $sessao_excluida = true;
    }

    if ($sessao_excluida) {
        retornar_resposta(true, [], null, 200);
    }

    retornar_resposta(false, [], "Erro: Sessões não definidas.", 401);
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
