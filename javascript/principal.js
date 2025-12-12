// Elementos DOM e variáveis globais
const corpoPagina = document.body;
const botaoAlternaMenuNavegacao = document.querySelector("#botao-alterna-menu-navegacao");
const iconeAlternaMenuNavegacao = document.querySelector("#botao-alterna-menu-navegacao i");
const areaLinksMenuNavegacao = document.querySelector("#area-links-menu-navegacao");
const botaoAlternaTema = document.querySelector("#botao-alterna-tema");
const botaoAumentaFonte = document.querySelector("#botao-aumenta-fonte");
const botaoDiminuiFonte = document.querySelector("#botao-diminui-fonte");
const botaoResetaFonte = document.querySelector("#botao-reseta-fonte");
const areaAnoAtual = document.querySelector("#area-ano-atual");

// Funções

// Função que alterna a exibição do menu de navegação
const alternaMenuNavegacao = (esconder) => {
    if (esconder) {
        areaLinksMenuNavegacao.style.height = "";
        areaLinksMenuNavegacao.classList.remove("ativo");
    } else {
        areaLinksMenuNavegacao.style.height = `${areaLinksMenuNavegacao.scrollHeight}px`;
        areaLinksMenuNavegacao.classList.add("ativo");
    }

    alternaIcones(esconder, iconeAlternaMenuNavegacao, "bi-list", "bi-x-lg");
};

// Função que carrega o ano atual vindo do back-end no rodapé da página
const carregaAnoAtual = async () => {
    const { sucesso, dados, mensagem } = await enviaDados({ acao: "consultar-ano-atual" }, "consulta-ano-atual.php", "GET");

    if (!sucesso) {
        console.log(mensagem);
        return;
    }

    const { anoAtual } = dados;
    areaAnoAtual.textContent = anoAtual;
};

// Função que carrega o tema preferido do usuário
const carregaTemaPreferido = () => {
    corpoPagina.classList.toggle("tema-escuro", localStorage.getItem("tema-preferido") === "escuro");
};

// Função que carrega o tamanho de fonte preferido do usuário
const carregaFontePreferida = () => {
    corpoPagina.style.fontSize = localStorage.getItem("tamanho-fonte-preferido");
};

// Função que alterna o tamanho da fonte
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

    corpoPagina.style.fontSize = tamanhoFonte !== "" ? `${tamanhoFonte}px` : tamanhoFonte;
    localStorage.setItem("tamanho-fonte-preferido", tamanhoFonte !== "" ? `${tamanhoFonte}px` : tamanhoFonte);
};

adicionaEventoPageshow(() => {
    alternaMenuNavegacao(true);
    carregaAnoAtual();
});

adicionaEventoClick([document], (event) => {
    if (event.target !== areaLinksMenuNavegacao) {
        alternaMenuNavegacao(true);
    }
});

adicionaEventoClick([botaoAlternaMenuNavegacao], (event) => {
    event.stopPropagation();
    alternaMenuNavegacao(areaLinksMenuNavegacao.classList.contains("ativo"));
});

adicionaEventoClick([botaoAlternaTema], () => {
    localStorage.setItem("tema-preferido", corpoPagina.classList.toggle("tema-escuro") ? "escuro" : "claro");
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

// Eventos

// Adiciona evento "resize" para o window
window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) {
        alternaMenuNavegacao(true);
    }
});

// Adiciona evento "DOMContentLoaded" para o document
document.addEventListener("DOMContentLoaded", () => {
    carregaTemaPreferido();
    carregaFontePreferida();
});