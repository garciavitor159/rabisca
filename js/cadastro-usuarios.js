const form = document.querySelector("#form");
const campoNomeUsuario = document.querySelector("#campo-nome-usuario");
const campoSenha = document.querySelector("#campo-senha");
const campoPerguntaSeguranca = document.querySelector("#campo-pergunta-seguranca");
const campoResposta = document.querySelector("#campo-resposta");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nomeUsuario = campoNomeUsuario.value.trim();
    const senha = campoSenha.value.trim();
    const perguntaSeguranca = campoPerguntaSeguranca.value.trim();
    const resposta = campoResposta.value.trim();

    if (!validaCampoObrigatorio(campoNomeUsuario, nomeUsuario, 70)) {
        exibeErro("Erro: O nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", campoNomeUsuario);
        return;
    }

    if (!validaSenha(campoSenha, senha)) {
        exibeErro("Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo ao menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", campoSenha);

        return;
    }

    if (!validaPerguntaSeguranca(campoPerguntaSeguranca, perguntaSeguranca)) {
        exibeErro("Erro: A pergunta de segurança é obrigatória e deve ser válida. Por favor, tente novamente.", campoPerguntaSeguranca);
        return;
    }

    if (!validaCampoObrigatorio(campoResposta, resposta, 70)) {
        exibeErro("Erro: A resposta é obrigatória e deve conter até 70 caracteres. Por favor, tente novamente.", campoResposta);
        return;
    }

    const { sucesso, dados, msg } = await enviaDados({
        acao: "cadastrar-usuario",
        nomeUsuario: nomeUsuario,
        senha: senha,
        perguntaSeguranca: perguntaSeguranca,
        resposta: resposta
    }, "cadastro-usuarios.php", "POST");

    if (!sucesso) {
        const { campoErro } = dados;
        alternaModalAlerta(true, msg);

        switch (campoErro) {
            case "nome-usuario":
                limpaCampo(campoNomeUsuario);
                break;
            case "senha":
                limpaCampo(campoSenha);
                break;
            case "pergunta-seguranca":
                limpaCampo(campoPerguntaSeguranca);
                break;
            case "resposta":
                limpaCampo(campoResposta);
                break;
            default:
                limpaCampos([campoNomeUsuario, campoSenha, campoPerguntaSeguranca, campoResposta]);
        }

        return;
    }

    redireciona(msg, "login.html");
});