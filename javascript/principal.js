const corpoPagina = document.body;
const botaoAlternaMenuNavegacao = document.querySelector("#botao-alterna-menu-navegacao");
const iconeAlternaMenuNavegacao = document.querySelector("#botao-alterna-menu-navegacao i");
const listaMenuNavegacao = document.querySelector("#lista-menu-navegacao");
const botaoAumentaFonte = document.querySelector("#botao-aumenta-fonte");
const botaoDiminuiFonte = document.querySelector("#botao-diminui-fonte");
const botaoResetaFonte = document.querySelector("#botao-reseta-fonte");
const areaAnoAtual = document.querySelector("#area-ano-atual");

const alternaMenuNavegacao = (esconder) => {
    if (esconder) {
        listaMenuNavegacao.style.height = "";
        listaMenuNavegacao.classList.remove("ativo");
    } else {
        const alturaListaMenuNavegacao = listaMenuNavegacao.scrollHeight;
        listaMenuNavegacao.style.height = `${alturaListaMenuNavegacao}px`;
        listaMenuNavegacao.classList.add("ativo");
    }

    alternaIcone(esconder, iconeAlternaMenuNavegacao, "bi-list", "bi-x-lg");
};

const carregaAnoAtual = async () => {
    const { sucesso, dados, mensagem } = await enviaDados({ acao: "consultar-ano-atual" }, "consulta-ano-atual.php", "GET");

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { anoAtual } = dados;
    areaAnoAtual.textContent = anoAtual;
};

const alternaFonte = (acao) => {
    let tamanhoFonte = Number.parseInt(window.getComputedStyle(corpoPagina).fontSize.replace("px", ""));

    switch (acao) {
        case "aumentar":
            tamanhoFonte++;
            break;
        case "diminuir":
            tamanhoFonte--;
            break;
        default:
            tamanhoFonte = "";
    }

    corpoPagina.style.fontSize = tamanhoFonte !== "" ? `${tamanhoFonte}px` : "";
    localStorage.setItem("tamanho-fonte-preferido", window.getComputedStyle(corpoPagina).fontSize);
};

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) {
        alternaMenuNavegacao(true);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    corpoPagina.style.fontSize = localStorage.getItem("tamanho-fonte-preferido");
});

adicionaEventoPageshow(() => {
    alternaMenuNavegacao(true);
    carregaAnoAtual();
});

adicionaEventoClick([document], (event) => {
    if (event.target !== listaMenuNavegacao) {
        alternaMenuNavegacao(true);
    }
});

adicionaEventoClick([botaoAlternaMenuNavegacao], () => {
    alternaMenuNavegacao(listaMenuNavegacao.classList.contains("ativo"));
});

adicionaEventoClick([botaoAumentaFonte], () => {
    alternaFonte("aumentar");
});

adicionaEventoClick([botaoDiminuiFonte], () => {
    alternaFonte("diminuir");
});

adicionaEventoClick([botaoResetaFonte], () => {
    alternaFonte("resetar");
});