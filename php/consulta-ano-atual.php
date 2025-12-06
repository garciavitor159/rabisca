<?php 
    require_once "funcoes.php";
    $dados = resgataDados();

    if (empty($dados)) {
        retornaResposta(false, [], "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
    }

    $acao = trim($dados["acao"]);

    if ($acao !== "consultar-ano-atual") {
        retornaResposta(false, [], "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 400);
    }

    retornaResposta(true, ["anoAtual" => date("Y")], null, 200);
?>