<?php
require_once("iniciar_sessao.php");
require_once("funcoes.php");
require_once("conectar_banco.php");
$dados = retornar_dados();

if (esta_vazio($dados)) {
    retornar_resposta(false, [], "Erro: Dados inválidos.", 400);
}

$acao = limpar_val($dados["acao"] ?? "");

if ($acao === "efetuar_login") {
    $email = limpar_val($dados["email"] ?? "");
    $senha = limpar_val($dados["senha"] ?? "");

    if (!validar_email($email)) {
        retornar_resposta(
            false,
            ["campoErr" => "email"],
            "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres.",
            400
        );
    }

    if (!validar_senha($senha)) {
        retornar_resposta(
            false,
            ["campoErr" => "senha"],
            "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
            400
        );
    }

    if (esta_vazio($pdo)) {
        retornar_resposta(false, [], "Erro: Não foi possível conectar ao banco.", 500);
    }

    try {
        $sql = "CALL proc_efetuar_login(?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!esta_vazio($res) && verificar_hash($senha, $res["senha_usuario"])) {
            $_SESSION["id"] = $res["id_usuario"];
            $_SESSION["nome"] = $res["nome_usuario"];
            retornar_resposta(true, [], "Login efetuado com sucesso.", 200);
        }

        retornar_resposta(false, [], "Erro: E-mail e/ou senha inválidos.", 401);
    } catch (PDOException $err) {
        $msg_err = $err->getMessage();
        exibir_err_log("Erro: $msg_err.");
        retornar_resposta(false, [], "Erro: Não foi possível efetuar seu login.", 500);
    }
}

retornar_resposta(false, [], "Erro: Ação inválida.", 400);
