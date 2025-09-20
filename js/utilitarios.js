const fundoModalAlerta = document.querySelector("#fundoModalAlerta");
const modalAlerta = document.querySelector("#modalAlerta");
const txtModalAlerta = document.querySelector("#txtModalAlerta");

async function enviarDados(params, url, metodo) {
    try {
        let resposta = null;

        switch (metodo) {
            case "GET":
                const paramsURL = new URLSearchParams(params);
                url += `?${paramsURL}`;
                resposta = await axiosCustomizado.get(url);
                break;
            case "POST":
                resposta = await axiosCustomizado.post(url, params);
                break;
            case "PUT":
                resposta = await axiosCustomizado.put(url, params);
                break;
            case "DELETE":
                resposta = await axiosCustomizado.delete(url, {
                    data: params
                });

                break;
            default:
                return definirResposta({
                    sucesso: false,
                    dados: {},
                    msg: "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde."
                });
        }

        return definirResposta(resposta.data);
    } catch (error) {
        return definirResposta(error.response.data);
    }
}

function definirResposta(resposta) {
    const { sucesso, dados, msg } = resposta;

    return {
        sucesso: sucesso ?? false,
        dados: dados ?? {},
        msg: msg ?? "Erro: Não foi possível completar sua requisição. Por favor, tente novamente mais tarde."
    };
}

function alternarModalAlerta(exibir, msg) {
    alternarVisibilidade([fundoModalAlerta, modalAlerta], exibir);

    if (msg !== "") {
        txtModalAlerta.textContent = msg;
        return;
    }

    setTimeout(function () {
        txtModalAlerta.textContent = "";
    }, 500);
}

function alternarVisibilidade(els, exibir) {
    els.forEach(function (el) {
        el.classList.toggle("escondido", !exibir);
    });
}