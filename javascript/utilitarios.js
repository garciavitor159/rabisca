// Função que adiciona evento "pageshow" para o window
const adicionaEventoPageshow = (callback) => {
    window.addEventListener("pageshow", callback);
};

// Função que alterna ícones
const alternaIcones = (voltarPadrao, elementoIcone, iconePadrao, iconeAlternativo) => {
    elementoIcone.classList.toggle(iconePadrao, voltarPadrao);
    elementoIcone.classList.toggle(iconeAlternativo, !voltarPadrao);
};

// Função que envia os dados para o back-end
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
                return desestruturaResposta({
                    sucesso: false,
                    dados: {},
                    mensagem: "Método de requisição inválido. Por favor, tente novamente mais tarde."
                });
        }

        return desestruturaResposta(resposta.data);
    } catch (error) {
        return desestruturaResposta(error.response.data);
    }
};

// Função que desestrutura a resposta vinda do back-end
const desestruturaResposta = (resposta) => {
    const { sucesso, dados, mensagem } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || {},
        mensagem: mensagem || "Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde."
    };
};

// Função que adiciona evento "click" para elementos
const adicionaEventoClick = (elementos, callback) => {
    percorreElementos(elementos, (elemento) => {
        elemento.addEventListener("click", (event) => {
            callback(event);
        });
    });
};

// Função que percorre elementos
const percorreElementos = (elementos, callback) => {
    elementos.forEach(callback);
};

// Função que alterna a exibição de elementos
const alternaElementos = (exibir, elementos) => {
    percorreElementos(elementos, (elemento) => {
        elemento.classList.toggle("escondido", !exibir);
    });
};

// Função que adiciona evento "keydown" para um elemento
const adicionaEventoKeydown = (elemento, tecla, callback) => {
    elemento.addEventListener("keydown", (event) => {
        if (event.key === tecla) {
            callback();
        }
    });
};