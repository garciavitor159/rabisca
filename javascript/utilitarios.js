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