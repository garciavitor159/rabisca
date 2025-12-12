<?php 
require_once("utilitarios.php");
validaMetodoRequisicao("POST");
validaAcao(trim(resgataDados()["acao"]), "encerrar-sessao");
encerraSessao();
retornaResposta(true, null, null, 200);
?>