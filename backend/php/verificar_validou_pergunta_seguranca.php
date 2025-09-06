<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "verificar_validou_pergunta_seguranca") {
    if (existe_sessao("email")) {
        retornar_resposta(true, [], null, 200);
    }

    retornar_resposta(false, [], "Erro: Acesso negado.", 401);
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
