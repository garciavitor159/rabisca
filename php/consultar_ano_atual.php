<?php 
    require_once "utilitarios.php";
    
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $dados = $_GET;

        if (empty($dados)) {
            retornar_resposta(false, [], "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
        }

        $acao = trim($dados["acao"] ?? "");

        if ($acao === "consultar_ano_atual") {
            date_default_timezone_set("America/Sao_Paulo");

            retornar_resposta(true, [
                "anoAtual" => date("Y")
            ], null, 200);
        }

        retornar_resposta(false, [], "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 422);
    }

    retornar_resposta(false, [], "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.", 405);
?>