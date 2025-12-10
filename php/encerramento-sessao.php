<?php 
require_once("utilitarios.php");
$dados = resgataDados("POST");
$acao = trim($dados["acao"]);
validaAcao($acao, "encerrar-sessao");
encerraSessao();
retornaResposta(true, [], null, 200);
?>