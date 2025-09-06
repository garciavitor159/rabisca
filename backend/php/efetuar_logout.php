<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "efetuar_logout") {
    encerrar_sessao();
    retornar_resposta(true, [], "Logout efetuado com sucesso.", 200);
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
