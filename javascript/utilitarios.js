const adicionaEventoPageshow = (callback) => {
    window.addEventListener("pageshow", callback);
};

const alternaIcone = (voltarPadrao, elementoIcone, iconePadrao, iconeAlternativo) => {
    elementoIcone.classList.toggle(iconePadrao, voltarPadrao);
    elementoIcone.classList.toggle(iconeAlternativo, !voltarPadrao);
};

const enviaDados = async (parametros, url, metodo) => {
    try {
        let resposta;

        switch (metodo) {
            case "GET":
                resposta = await axiosCustomizado.get(url, { params: parametros });
                break;
            case "POST":
                resposta = await axiosCustomizado.post(url, parametros);
                break;
            case "PUT":
                resposta = await axiosCustomizado.put(url, parametros);
                break;
            case "DELETE":
                resposta = await axiosCustomizado.delete(url, { data: parametros });
                break;
            default:
                desestruturaResposta({
                    sucesso: false,
                    dados: {},
                    mensagem: "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde."
                });
        }

        return desestruturaResposta(resposta.data);
    } catch (error) {
        return desestruturaResposta(error.response.data);
    }
}

const desestruturaResposta = (resposta) => {
    const { sucesso, dados, mensagem } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || {},
        mensagem: mensagem || "Erro: Não foi possível completar sua requisição no momento. Por favor, tente novamente mais tarde."
    };
};

const adicionaEventoClick = (elementos, callback) => {
    elementos.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            event.stopPropagation();
            callback(event);
        });
    });
};

const alternaExibicao = (exibir, elementos) => {
    elementos.forEach((elemento) => {
        elemento.classList.toggle("escondido", !exibir);
    });
};

const detectaTeclaEsc = (callback) => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            callback();
        }
    });
};

const adicionaEventoSubmit = (formulario, callback) => {
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        callback();
    });
};

const validaDados = async (camposValidar, acao, urlEnvio, metodo, urlRedirecionamento) => {
    const { campoID, campoNome, campoSenha, campoPerguntaSeguranca, campoResposta, campoTitulo, campoTexto } = camposValidar;
    const id = Number(campoID?.value.trim());
    const nome = campoNome?.value.trim();
    const senha = campoSenha?.value.trim();
    const perguntaSeguranca = campoPerguntaSeguranca?.value.trim();
    const resposta = campoResposta?.value.trim();
    const titulo = campoTitulo?.value.trim();
    const texto = campoTexto?.value.trim();
    const parametros = { acao: acao };
    const campos = [];

    if (acao === "cadastrar-usuario" || acao === "editar-senha" || acao === "editar-usuario") {
        if (!validaCampoObrigatorio(campoNome, nome, 70)) {
            exibeErro("Erro: O nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", campoNome);
            return;
        }

        if (!validaSenha(campoSenha, senha)) {
            exibeErro("Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", campoSenha);

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

        Object.assign(parametros, {
            nome: nome,
            senha: senha,
            perguntaSeguranca: perguntaSeguranca,
            resposta: resposta
        });

        campos.push(...[campoNome, campoSenha, campoPerguntaSeguranca, campoResposta]);
    }

    if (acao === "fazer-login") {
        if (!validaCampoObrigatorio(campoNome, nome, 70)) {
            exibeErro("Erro: O nome de usuário é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", campoNome);
            return;
        }

        if (!validaSenha(campoSenha, senha)) {
            exibeErro("Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um caractere especial. Por favor, tente novamente.", campoSenha);

            return;
        }

        Object.assign(parametros, {
            nome: nome,
            senha: senha
        });

        campos.push(...[campoNome, campoSenha]);
    }

    if (acao === "cadastrar-nota" || acao === "editar-nota") {
        if (!validaCampoObrigatorio(campoTitulo, titulo, 70)) {
            exibeErro("Erro: O título é obrigatório e deve conter até 70 caracteres. Por favor, tente novamente.", campoTitulo);
            return;
        }

        if (!validaCampoObrigatorio(campoTexto, texto, 200)) {
            exibeErro("Erro: O texto é obrigatório e deve conter até 200 caracteres. Por favor, tente novamente.", campoTexto);
            return;
        }

        Object.assign(parametros, {
            titulo: titulo,
            texto: texto
        });

        campos.push(...[campoTitulo, campoTexto]);
    }

    if (acao === "editar-usuario" || acao === "editar-nota") {
        if (!Number.isInteger(id) || Number(id) < 1) {
            alternaModalAlerta(true, "Erro: O ID é obrigatório e deve ser um número inteiro maior ou igual a 1. Por favor, tente novamente mais tarde.");
            return;
        }

        Object.assign(parametros, {
            id: id
        });
    }

    const { sucesso, dados, mensagem } = await enviaDados(parametros, urlEnvio, metodo);

    if (!sucesso) {
        const { campoErro } = dados;
        alternaModalAlerta(true, mensagem);

        switch (campoErro) {
            case "nome":
                limpaCampo(campoNome);
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
            case "titulo":
                limpaCampo(campoTitulo);
                break;
            case "texto":
                limpaCampo(campoTexto);
                break;
            default:
                limpaCampos(campos);
        }

        return;
    }

    redireciona(mensagem, urlRedirecionamento);
};

const validaCampoObrigatorio = (campo, valorCampo, quantidadeCaracteres) => {
    return campo.checkValidity() && valorCampo && valorCampo.length <= quantidadeCaracteres;
};

const exibeErro = (mensagemErro, campoErro) => {
    alternaModalAlerta(true, mensagemErro);
    limpaCampo(campoErro);
};

const limpaCampo = (campo) => {
    campo.value = "";
    campo.blur();
};

const validaSenha = (campoSenha, senha) => {
    const expressaoRegularSenha = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/);
    return campoSenha.checkValidity() && expressaoRegularSenha.test(senha) && senha.length >= 8 && senha.length <= 30;
};

const validaPerguntaSeguranca = (campoPerguntaSeguranca, perguntaSeguranca) => {
    return campoPerguntaSeguranca.checkValidity() && ["0", "1", "2"].includes(perguntaSeguranca);
};

const limpaCampos = (campos) => {
    campos.forEach((elemento) => {
        limpaCampo(elemento);
    });
};

const redireciona = (mensagemRedirecionamento, urlRedirecionamento) => {
    localStorage.setItem("mensagem-redirecionamento", mensagemRedirecionamento);
    window.location.href = urlRedirecionamento;
};