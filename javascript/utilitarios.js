const fundoDoModalDeAlerta = document.querySelector("#fundo-do-modal-de-alerta");
const modalDeAlerta = document.querySelector("#modal-de-alerta");
const textoDoModalDeAlerta = document.querySelector("#modal-de-alerta p");

async function enviarDados(parametros, url, metodo) {
    try {
        let resposta = null;

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
                return parsearAResposta({
                    sucesso: false,
                    dados: {},
                    mensagem: "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde."
                });
        }

        return parsearAResposta(resposta.data);
    } catch (error) {
        return parsearAResposta(error.response.data);
    }
}

function parsearAResposta(resposta) {
    const { sucesso, dados, mensagem } = resposta;

    return {
        sucesso: sucesso || false,
        dados: dados || {},
        mensagem: mensagem || "Erro: Não foi possível completar sua requisição. Por favor, tente novamente mais tarde."
    };
}

function alternarIcone(voltarAoPadrao, elemento, iconePadrao, iconeAlternativo) {
    elemento.classList.toggle(iconePadrao, voltarAoPadrao);
    elemento.classList.toggle(iconeAlternativo, !voltarAoPadrao);
}

function alternarAExibicaoDoModalDeAlerta(exibir, mensagem) {
    alternarAExibicaoDeElementos(exibir, [fundoDoModalDeAlerta, modalDeAlerta]);

    if (!exibir) {
        setTimeout(function () {
            textoDoModalDeAlerta.textContent = "";
        }, 500);

        return;
    }

    textoDoModalDeAlerta.textContent = mensagem;
}

function alternarAExibicaoDeElementos(exibir, elementos) {
    elementos.forEach(function (elemento) {
        elemento.classList.toggle("escondido", !exibir);
    });
}