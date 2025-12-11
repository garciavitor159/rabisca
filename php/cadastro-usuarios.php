<?php 
require_once("utilitarios.php");
$dados = resgataDados("POST");
$acao = trim($dados["acao"]);
validaAcao($acao, "cadastrar-usuario");
$nome = trim($dados["nome"]);
$senha = trim($dados["senha"]);
$perguntaSeguranca = trim($dados["perguntaSeguranca"]);
$resposta = trim($dados["resposta"]);

validaDados([
    "nome" => $nome,
    "senha" => $senha,
    "pergunta-seguranca" => $perguntaSeguranca,
    "resposta" => $resposta
], "cadastrar-usuario");

$senha = password_hash($senha, PASSWORD_BCRYPT);
$pdo = conectaBanco();

try {
    $sql = "CALL procCadastraUsuario(?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $senha, $perguntaSeguranca, $resposta]);
    retornaResposta(true, null, "Cadastro feito com sucesso.", 201);
} catch (PDOException $e) {
    $mensagemErro = $e->getMessage();
    error_log("Erro: $mensagemErro.", 0);

    if (str_contains($mensagemErro, "usuario-ja-cadastrado")) {
        retornaResposta(false, null, "Erro: Usuário já cadastrado. Por favor, tente novamente com outro nome de usuário.", 409);
    }

    retornaResposta(false, null, "Erro: Não foi possível fazer o seu cadastro. Por favor, tente novamente mais tarde.", 500);
}
?>