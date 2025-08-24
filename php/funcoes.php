<?php
function eh_vazio($val)
{
    if (empty($val)) {
        return true;
    }

    return false;
}

function limpar_val($val)
{
    return trim($val);
}

function retornar_resposta($resposta)
{
    echo json_encode($resposta);
    exit;
}

function validar_val_obrigatorio($val)
{
    if (!eh_vazio($val)) {
        return true;
    }

    return false;
}

function validar_max_carac($val, $max_carac)
{
    if (strlen($val) <= $max_carac) {
        return true;
    }

    return false;
}

function validar_email($email)
{
    if (
        filter_var($email, FILTER_VALIDATE_EMAIL) !== false &&
        preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/", $email) === 1
    ) {
        return true;
    }

    return false;
}

function validar_senha($senha)
{
    if (preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/", $senha) === 1) {
        return true;
    }

    return false;
}

function validar_conexao($pdo)
{
    if ($pdo instanceof PDO) {
        return true;
    }

    return false;
}
