<?php
function limpar_val($val)
{
    if (eh_string($val)) {
        $val = trim($val);
        $val = htmlspecialchars($val, ENT_QUOTES, "UTF-8");
        return $val;
    }

    return "";
}

function eh_string($val)
{
    return boolval((is_string($val)));
}

function retornar_resposta($resposta)
{
    if (!is_array($resposta)) {
        echo json_encode(["deuErro" => true, "msg" => "Erro: Resposta inválida."]);
        exit;
    }

    echo json_encode($resposta);
    exit;
}

function validar_val_obrigatorio($val, $max_carac)
{
    if (eh_string($val)) {
        $val_limpo = limpar_val($val);
        return boolval((!empty($val_limpo) && strlen($val_limpo) <= $max_carac));
    }

    return false;
}

function validar_email($val_email)
{
    if (eh_string($val_email)) {
        $val_email_limpo = limpar_val($val_email);
        $exp_reg_email = "/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/";

        return boolval((
            filter_var($val_email_limpo, FILTER_VALIDATE_EMAIL) &&
            preg_match($exp_reg_email, $val_email_limpo) &&
            strlen($val_email_limpo) <= 80
        ));
    }

    return false;
}

function validar_senha($val_senha)
{
    if (eh_string($val_senha)) {
        $val_senha_limpo = limpar_val($val_senha);
        $exp_reg_senha = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/";
        return boolval((preg_match($exp_reg_senha, $val_senha_limpo)));
    }

    return false;
}

function validar_conexao($pdo)
{
    return boolval(($pdo instanceof PDO));
}
