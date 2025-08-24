<?php
header("Content-Type: application/json");
require_once "funcoes.php";
require_once "conectar.php";

if (!validar_conexao($pdo)) {
    retornar_resposta([
        "deuErro" => true,
        "msg" => "Erro: Não foi possível conectar ao banco."
    ]);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $dados = $_GET;

    if (!eh_vazio($dados)) {
        $acao = limpar_val($dados["acao"] ?? "");

        switch ($acao) {
            case "resgatar_ano_atual":
                retornar_resposta([
                    "deuErro" => false,
                    "msg" => null,
                    "anoAtual" => date("Y")
                ]);

                break;
            default:
                retornar_resposta(["deuErro" => true, "msg" => "Erro: Ação inválida."]);
        }
    } else {
        retornar_resposta(["deuErro" => true, "msg" => "Erro: Dados inválidos."]);
    }
} else {
    $dados = json_decode(file_get_contents("php://input"), true);

    if (!eh_vazio($dados)) {
        $acao = limpar_val($dados["acao"] ?? "");

        switch ($acao) {
            case "cadastrar_usuario":
                $nome = limpar_val($dados["nome"] ?? "");
                $email = limpar_val($dados["email"] ?? "");
                $senha = limpar_val($dados["senha"] ?? "");

                if (!validar_val_obrigatorio($nome) || !validar_max_carac($nome, 50)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: O nome é obrigatório e deve conter até 50 caracteres.",
                        "campoErro" => "nome"
                    ]);
                }

                if (!validar_email($email) || !validar_max_carac($email, 80)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: O e-mail é obrigatório, deve ser minimamente válido (nome@exemplo.br) e conter até 80 caracteres.",
                        "campoErro" => "email"
                    ]);
                }

                if (!validar_senha($senha)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" =>  "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                        "campoErro" => "senha"
                    ]);
                }

                $senha = password_hash($senha, PASSWORD_BCRYPT);

                try {
                    $sql = "CALL proc_cadastrar_usuario(?, ?, ?)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute([$nome, $email, $senha]);

                    retornar_resposta([
                        "deuErro" => false,
                        "msg" => "Cadastro efetuado com sucesso.",
                    ]);
                } catch (PDOException $err) {
                    $msg_erro = $err->getMessage();
                    error_log("Erro: $msg_erro.", 0);

                    if ($err->getCode() === "45000") {
                        if (str_contains($msg_erro, "usuario_ja_cadastrado")) {
                            retornar_resposta([
                                "deuErro" => true,
                                "msg" => "Erro: Usuário já cadastrado.",
                            ]);
                        }
                    }

                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: Não foi possível efetuar seu cadastro."
                    ]);
                }

                break;
            case "efetuar_login":
                $email = limpar_val($dados["email"] ?? "");
                $senha = limpar_val($dados["senha"] ?? "");

                if (!validar_email($email) || !validar_max_carac($email, 80)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: O e-mail é obrigatório, deve ser minimamente válido (nome@exemplo.br) e conter até 80 caracteres.",
                        "campoErro" => "email"
                    ]);
                }

                if (!validar_senha($senha)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" =>  "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                        "campoErro" => "senha"
                    ]);
                }

                try {
                    $sql = "CALL proc_efetuar_login(?)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute([$email]);
                    $res = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($res && password_verify($senha, $res["senha_usuario"])) {
                        $_SESSION["id"] = $res["id_usuario"];

                        retornar_resposta([
                            "deuErro" => false,
                            "msg" => "Login efetuado com sucesso."
                        ]);
                    }

                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: Usuário e/ou senha inválidos."
                    ]);
                } catch (PDOException $err) {
                    error_log("Erro: {$err->getMessage()}.");

                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: Não foi possível efetuar seu login."
                    ]);
                }

                break;
        }
    } else {
        retornar_resposta(["deuErro" => true, "msg" => "Erro: Dados inválidos."]);
    }
}
