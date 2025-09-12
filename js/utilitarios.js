const fundoModalAlerta = document.querySelector("#fundoModalAlerta");
const modalAlerta = document.querySelector("#modalAlerta");
const txtModalAlerta = document.querySelector("#txtModalAlerta");

const adicionarEventoPageshow = (callback) => {
    window.addEventListener("pageshow", callback);
};

const alternarVisibilidade = (els, exibir) => {
    els.forEach((el) => {
        el.classList.toggle("escondido", !exibir);
    });
};

const enviarDados = async (params, url, metodo) => {
    try {
        let respostaHTTP = null;

        if (metodo === "GET") {
            const paramsURL = new URLSearchParams(params).toString();
            url += `?${paramsURL}`;
            respostaHTTP = await axiosCustomizado.get(url);
        } else {
            respostaHTTP = await axiosCustomizado.post(url, params);
        }

        return definirResposta(respostaHTTP.data);
    } catch (error) {
        return definirResposta(error.response.data);
    }
};

const definirResposta = (respostaHTTP) => {
    const { sucesso, dados, msg } = respostaHTTP;

    return { sucesso: sucesso ?? false, dados: dados ?? {}, msg: msg ?? "Erro: Não foi possível completar sua requisição." };
};

const exibirErroConsole = (mensagem) => {
    console.error(mensagem);
};

const alternarModalAlerta = (exibir, msg) => {
    alternarVisibilidade([fundoModalAlerta, modalAlerta], exibir);

    if (msg !== "") {
        txtModalAlerta.textContent = msg;
        return;
    }

    setTimeout(() => {
        txtModalAlerta.textContent = "";
    }, 500);
};

const adicionarEventoKeydown = (el, callback) => {
    el.addEventListener("keydown", callback);
};

const adicionarEventoClick = (els, callback) => {
    els.forEach((el) => {
        el.addEventListener("click", callback);
    });
};