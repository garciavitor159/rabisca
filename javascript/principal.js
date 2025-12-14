// Elementos DOM e variáveis globais
const corpoPagina = document.body;
const botaoAlternaBarraNavegacao = document.querySelector("#botao-alterna-barra-navegacao");
const iconeAlternaBarraNavegacao = document.querySelector("#botao-alterna-barra-navegacao i");
const listaBarraNavegacao = document.querySelector("#lista-barra-navegacao");
const botaoAlternaBotoesAcessibilidade = document.querySelector("#botao-alterna-botoes-acessibilidade");
const areaBotoesAcessibilidade = document.querySelector("#area-botoes-acessibilidade");
const botaoAumentaFonte = document.querySelector("#botao-aumenta-fonte");
const botaoDiminuiFonte = document.querySelector("#botao-diminui-fonte");
const botaoRedefineFonte = document.querySelector("#botao-redefine-fonte");
const areaAnoAtual = document.querySelector("#area-ano-atual");

// Funções

// Função que alterna a exibição da barra de navegação
function alternaBarraNavegacao(esconder) {
    alternaAlturaElemento(esconder, listaBarraNavegacao);
    iconeAlternaBarraNavegacao.classList.toggle("bi-list", esconder);
    iconeAlternaBarraNavegacao.classList.toggle("bi-x-lg", !esconder);
}

// Função que alterna a altura de um elemento
function alternaAlturaElemento(esconder, elemento) {
    if (esconder) {
        elemento.style.height = "";
        elemento.classList.remove("ativo");
        return;
    }

    elemento.style.height = `${elemento.scrollHeight}px`;
    elemento.classList.add("ativo");
}

// Função que carrega o ano atual vindo do back-end no rodapé do site
async function carregaAnoAtual() {
    try {
        const resposta = await axiosCustomizado.get("consulta-ano-atual.php", { params: { acao: "consultar-ano-atual" } });
        const { dados } = resposta.data;
        const { anoAtual } = dados;
        areaAnoAtual.textContent = anoAtual;
    } catch (error) {
        const { mensagem = `Erro: Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde. Código: ${error.status}.` } = error.response.data;

        console.error(mensagem);
    }
}

// Função que alterna o tamanho da fonte
function alternaFonte(acao) {
    let tamanhoFonte = Number.parseInt(window.getComputedStyle(corpoPagina).fontSize.replace("px", ""));

    switch (acao) {
        case "aumentar":
            tamanhoFonte++;
            tamanhoFonte = `${tamanhoFonte}px`;
            break;
        case "diminuir":
            tamanhoFonte--;
            tamanhoFonte = `${tamanhoFonte}px`;
            break;
        default:
            tamanhoFonte = "";
    }

    corpoPagina.style.fontSize = tamanhoFonte;
    localStorage.setItem("tamanho-fonte-preferido", tamanhoFonte);
}

// Eventos

// Adiciona o evento "pageshow" para o objeto window
window.addEventListener("pageshow", function () {
    alternaBarraNavegacao(true);
    carregaAnoAtual();
});

// Adiciona o evento "resize" para o objeto window
window.addEventListener("resize", function () {
    if (this.innerWidth >= 1200) {
        alternaBarraNavegacao(true);
    }
});

// Adiciona o evento "DOMContentLoaded" para o objeto document
document.addEventListener("DOMContentLoaded", function () {
    corpoPagina.style.fontSize = localStorage.getItem("tamanho-fonte-preferido");
});

// Adiciona o evento "click" para o objeto document
document.addEventListener("click", function (event) {
    const elementoAlvo = event.target;

    if (elementoAlvo !== listaBarraNavegacao) {
        alternaBarraNavegacao(true);
    }

    if (elementoAlvo !== areaBotoesAcessibilidade) {
        alternaAlturaElemento(true, areaBotoesAcessibilidade);
    }
});

// Adiciona o evento "click" para o botão que alterna a exibição da barra de navegação
botaoAlternaBarraNavegacao.addEventListener("click", function (event) {
    event.stopPropagation();
    alternaBarraNavegacao(listaBarraNavegacao.classList.contains("ativo"));
});

// Adiciona o evento "click" para o botão que alterna a exibição dos botões de acessibilidade
botaoAlternaBotoesAcessibilidade.addEventListener("click", function (event) {
    event.stopPropagation();
    alternaAlturaElemento(areaBotoesAcessibilidade.classList.contains("ativo"), areaBotoesAcessibilidade);
});

// Adiciona o evento "click" para o botão que aumenta a fonte
botaoAumentaFonte.addEventListener("click", function () {
    alternaFonte("aumentar");
});

// Adiciona o evento "click" para o botão que diminui a fonte
botaoDiminuiFonte.addEventListener("click", function () {
    alternaFonte("diminuir");
});

// Adiciona o evento "click" para o botão que redefine a fonte
botaoRedefineFonte.addEventListener("click", function () {
    alternaFonte("redefinir");
});