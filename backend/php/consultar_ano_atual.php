<?php
require_once("funcoes.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "consultar_ano_atual") {
    retornar_resposta(true, ["anoAtual" => date("Y")], null, 200);
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
