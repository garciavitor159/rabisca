<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "verificar_sessao_ultimo_acesso") {
    $tempo_limite = 600;

    if (existe_sessao("ultimo_acesso")) {
        $tempo_passado = time() - $_SESSION["ultimo_acesso"];

        if ($tempo_passado >= $tempo_limite) {
            encerrar_sessao();
            retornar_resposta(false, [], "Sua sessão expirou.", 401);
        }
    }

    $_SESSION["ultimo_acesso"] = time();
    retornar_resposta(true, [], null, 200);
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
