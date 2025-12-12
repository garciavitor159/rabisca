<?php 
require_once("utilitarios.php");
validaMetodoRequisicao("GET");
validaAcao(trim(resgataDados()["acao"]), "consultar-ano-atual");
retornaResposta(true, ["anoAtual" => date("Y")], null, 200);
?>