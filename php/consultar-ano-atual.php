<?php 
    require_once "utilitarios.php";
    $dados = resgatarDados();

    if (empty($dados)) {
        retornarResposta(false, [], "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
    }

    $acao = $dados["acao"];

    if ($acao !== "consultar-ano-atual") {
        retornarResposta(false, [], "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 400);
    }

    retornarResposta(true, [
        "anoAtual" => date("Y")
    ], null, 200);
?>