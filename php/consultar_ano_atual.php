<?php 
    require_once("funcoes.php");
    $dados = resgatar_dados();

    if (esta_vazio($dados)) {
        retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
    }

    $acao = limpar_valor($dados["acao"] ?? "");

    if ($acao === "consultar_ano_atual") {
        date_default_timezone_set("America/Sao_Paulo");
        retornar_resposta(true, ["anoAtual" => date("Y")], null, 200);
    }

    retornar_resposta(false, [], "Erro: Ação inválida.", 400);
?>