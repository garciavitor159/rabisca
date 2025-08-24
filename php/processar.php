<?php
header("Content-Type: application/json");
require_once "funcoes.php";
require_once "conectar.php";
$requisicao = $_SERVER["REQUEST_METHOD"];

switch ($requisicao) {
    case "GET":
        $dados = $_GET;

        if (empty($dados)) {
            retornar_resposta(["deuErro" => true, "msg" => "Erro: Dados inválidos."]);
        }

        $acao = limpar_val($_GET["acao"] ?? "");

        switch ($acao) {
            case "resgatar_ano_atual":
                retornar_resposta(["anoAtual" => date("Y")]);
                break;
            default:
                retornar_resposta(["deuErro" => true, "msg" => "Erro: Ação inválida."]);
        }

        break;
    case "POST":
        $dados = json_decode(file_get_contents("php://input"), true);

        if (empty($dados)) {
            retornar_resposta(["deuErro" => true, "msg" => "Erro: Dados inválidos."]);
        }

        $acao = limpar_val($dados["acao"] ?? "");

        switch ($acao) {
            case "cadastrar_usuario":
                $nome = limpar_val($dados["nome"] ?? "");
                $email = limpar_val($dados["email"] ?? "");
                $senha = limpar_val($dados["senha"] ?? "");

                if (!validar_val_obrigatorio($nome, 50)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: O nome é obrigatório e deve conter até 50 caracteres.",
                        "campoErro" => "nome"
                    ]);
                }

                if (!validar_email($email)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: O e-mail é obrigatório, deve ser minimamente válido (nome@exemplo.br) e conter até 80 caracteres.",
                        "campoErro" => "email"
                    ]);
                }

                if (!validar_senha($senha)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                        "campoErro" => "senha"
                    ]);
                }

                if (!validar_conexao($pdo)) {
                    retornar_resposta([
                        "deuErro" => true,
                        "msg" => "Erro: Não foi possível conectar ao banco."
                    ]);
                }

                $senha = password_hash($senha, PASSWORD_BCRYPT);

                try {
                    $sql = "CALL proc_cadastrar_usuario(?, ?, ?)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute([$nome, $email, $senha]);

                    retornar_resposta([
                        "deuErro" => false,
                        "msg" => "Cadastro efetuado com sucesso."
                    ]);
                } catch (PDOException $e) {
                    $msg_erro = $e->getMessage();
                    error_log("Erro: " . $msg_erro, 0);

                    if ($e->getCode() === "45000") {
                        if (str_contains($msg_erro, "usuario_ja_cadastrado")) {
                            retornar_resposta([
                                "deuErro" => true,
                                "msg" => "Erro: Usuário já cadastrado."
                            ]);
                        }
                    } else {
                        retornar_resposta([
                            "deuErro" => true,
                            "msg" => "Erro: Não foi possível efetuar seu cadastro."
                        ]);
                    }
                }

                break;
            default:
                retornar_resposta(["deuErro" => true, "msg" => "Erro: Ação inválida."]);
        }

        break;
    default:
        retornar_resposta(["deuErro" => true, "msg" => "Erro: Requisição inválida."]);
}
