<?php 
require_once("utilitarios.php");
$dados = resgataDados("GET");
$acao = trim($dados["acao"]);
validaAcao($acao, "consultar-ano-atual");
retornaResposta(true, ["anoAtual" => date("Y")], null, 200);
?>