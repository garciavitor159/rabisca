const enviaDados = async (params, url, metodo) => {
    try {
        let resposta = null;

        switch (metodo) {
            case "GET":
                resposta = await axiosCustomizado.get(url, { params: params });
                break;
            case "POST":
                resposta = await axiosCustomizado.post(url, params);
                break;
            case "PUT":
                resposta = await axiosCustomizado.put(url, params);
                break;
            case "DELETE":
                resposta = await axiosCustomizado.delete(url, { data: params });
                break;
            default:
                return desestruturaResposta({
                    sucesso: false,
                    dados: {},
                    msg: "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde."
                });
        }

        return desestruturaResposta(resposta.data);
    } catch (err) {
        return desestruturaResposta(err.response.data);
    }
};

const desestruturaResposta = (resposta) => {
    const { sucesso, dados, msg } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || {},
        msg: msg || "Erro: Não foi possível completar sua requisição. Por favor, tente novamente mais tarde."
    };
};

const alternaIcone = (voltarPadrao, el, iconePadrao, iconeAlternativo) => {
    el.classList.toggle(iconePadrao, voltarPadrao);
    el.classList.toggle(iconeAlternativo, !voltarPadrao);
};

const alternaEls = (exibir, els) => {
    els.forEach((el) => {
        el.classList.toggle("escondido", !exibir);
    });
};

const validaCampoObrigatorio = (campo, valorCampo, qtdMaxCarac) => {
    return campo.checkValidity() && valorCampo && valorCampo.length <= qtdMaxCarac;
};

const exibeErro = (msgErro, campoErro) => {
    alternaModalAlerta(true, msgErro);
    limpaCampo(campoErro);
};

const limpaCampo = (campo) => {
    campo.value = "";
    campo.blur();
};

const validaSenha = (campoSenha, senha) => {
    return campoSenha.checkValidity() && new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/).test(senha);
};

const validaPerguntaSeguranca = (campoPerguntaSeguranca, perguntaSeguranca) => {
    return campoPerguntaSeguranca && ["0", "1", "2"].includes(perguntaSeguranca);
};

const limpaCampos = (campos) => {
    campos.forEach((el) => {
        limpaCampo(el);
    });
};

const redireciona = (msgRedirecionamento, urlRedirecionamento) => {
    localStorage.setItem("msg-redirecionamento", msgRedirecionamento);
    window.location.href = urlRedirecionamento;
};