<?php
    require_once("iniciar_sessao.php");
    require_once("funcoes.php");
    $dados = resgatar_dados();

    if (esta_vazio($dados)) {
        retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
    }

    $acao = limpar_valor($dados["acao"] ?? "");

    if ($acao === "encerrar_sessao") {
        encerrar_sessao();
        retornar_resposta(true, [], null, 200);
    }

    retornar_resposta(false, [], "Erro: Ação inválida.", 400);
?>