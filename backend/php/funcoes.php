<?php
require_once("iniciar_sessao.php");

// Função que retorna os dados vindos do frontend
function retornar_dados()
{
    return (
        $_SERVER["REQUEST_METHOD"] === "POST" ?
        json_decode(file_get_contents("php://input"), true) :
        $_GET
    );
}

// Função que verifica se um valor está vazio
function esta_vazio($val)
{
    return empty($val);
}

// Função que retorna a resposta para o frontend
function retornar_resposta($sucesso, $dados, $msg, $cod_http)
{
    if (esta_vazio($dados)) {
        $dados = new stdClass();
    }

    header("Content-Type: application/json; charset=utf-8");
    http_response_code($cod_http);
    die(json_encode(["sucesso" => $sucesso, "dados" => $dados, "msg" => $msg]));
}

// Função que limpa um valor
function limpar_val($val)
{
    return trim(htmlspecialchars($val, ENT_QUOTES, "UTF-8"));
}

// Função que verifica se uma sessão existe
function existe_sessao($chave)
{
    return isset($_SESSION[$chave]);
}

// Função que exclui uma sessão
function excluir_sessao($chave)
{
    unset($_SESSION[$chave]);
}

// Função que exibe uma mensagem de erro no log do Apache
function exibir_err_log($msg_err)
{
    error_log($msg_err, 0);
}

// Função que valida um nome
function validar_nome($nome)
{
    return preg_match("/^[\p{L}\s]+$/u", $nome) && strlen($nome) <= 50;
}

// Função que valida um e-mail
function validar_email($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($email) <= 80;
}

// Função que valida uma senha
function validar_senha($senha)
{
    return preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/", $senha);
}

// Função que valida uma pergunta de segurança
function validar_pergunta_seguranca($pergunta_seguranca)
{
    return in_array($pergunta_seguranca, ["0", "1", "2", "3"]);
}

// Função que valida um valor obrigatório
function validar_val_obrigatorio($val, $max_carac)
{
    return !esta_vazio($val) && $val !== "0" && strlen($val) <= $max_carac;
}

// Função que encerra a sessão do usuário
function encerrar_sessao()
{
    session_unset();
    session_destroy();
}

// Função que criptografa um valor
function criptografar_val($val)
{
    return password_hash($val, PASSWORD_BCRYPT);
}

// Função que verifica se um valor está incluso em outro
function contem_val($val, $val_esperado)
{
    return str_contains($val, $val_esperado);
}

// Função que verifica o hash de um valor criptografado
function verificar_hash($val, $hash)
{
    return password_verify($val, $hash);
}

// Função que converte um valor para inteiro
function converter_int($val)
{
    return intval($val);
}

// Função que valida um ID
function validar_id($id)
{
    return filter_var($id, FILTER_VALIDATE_INT) && $id >= 1;
}
