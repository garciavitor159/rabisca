<?php 
    require_once "utilitarios.php";
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $dados = json_decode(file_get_contents("php://input"), true);

        if (empty($dados)) {
            retornar_resposta(false, [], "Erro: Dados inválidos. Por favor, tente novamente mais tarde.", 400);
        }

        $acao = trim($dados["acao"] ?? "");

        if ($acao === "encerrar_sessao") {
            encerrar_sessao();
            retornar_resposta(true, [], null, 200);
        }

        retornar_resposta(false, [], "Erro: Ação inválida. Por favor, tente novamente mais tarde.", 422);
    }

    retornar_resposta(false, [], "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.", 405);
?>