const corpoDaPagina = document.body;
const botaoQueAlternaAExibicaoDoMenuDeNavegacao = document.querySelector("#botao-que-alterna-a-exibicao-do-menu-de-navegacao");
const iconeDoBotaoQueAlternaAExibicaoDoMenuDeNavegacao = document.querySelector("#botao-que-alterna-a-exibicao-do-menu-de-navegacao i");
const areaDosLinksDoMenuDeNavegacao = document.querySelector("#area-dos-links-do-menu-de-navegacao");
const botaoQueAlternaAExibicaoDosBotoesDeAcessibilidade = document.querySelector("#botao-que-alterna-a-exibicao-dos-botoes-de-acessibilidade");
const areaDosBotoesDeAcessibilidade = document.querySelector("#area-dos-botoes-de-acessibilidade");
const botaoQueAumentaOTamanhoDaFonte = document.querySelector("#botao-que-aumenta-o-tamanho-da-fonte");
const botaoQueDiminuiOTamanhoDaFonte = document.querySelector("#botao-que-diminui-o-tamanho-da-fonte");
const botaoQueResetaOTamanhoDaFonte = document.querySelector("#botao-que-reseta-o-tamanho-da-fonte");
const areaDoAnoAtual = document.querySelector("#area-do-ano-atual");

function alternarAExibicaoDoMenuDeNavegacao(esconder) {
    alternarAAlturaDeUmElemento(esconder, areaDosLinksDoMenuDeNavegacao);
    alternarIcone(esconder, iconeDoBotaoQueAlternaAExibicaoDoMenuDeNavegacao, "bi-list", "bi-x-lg");
}

function alternarAAlturaDeUmElemento(esconder, elemento) {
    if (esconder) {
        elemento.style.height = "";
        elemento.classList.remove("ativo");
        return;
    }

    const alturaDoElemento = elemento.scrollHeight;
    elemento.style.height = `${alturaDoElemento}px`;
    elemento.classList.add("ativo");
}

function alternarTamanhoDaFonte(acao) {
    let tamanhoDaFonte = Number(window.getComputedStyle(corpoDaPagina).fontSize.replace("px", ""));

    switch (acao) {
        case "aumentar":
            tamanhoDaFonte += 0.1;
            break;
        case "diminuir":
            tamanhoDaFonte -= 0.1;
            break;
        default:
            tamanhoDaFonte = "";
    }

    corpoDaPagina.style.fontSize = typeof tamanhoDaFonte === "number" ? `${tamanhoDaFonte}px` : tamanhoDaFonte;
    localStorage.setItem("tamanho-da-fonte-preferido", window.getComputedStyle(corpoDaPagina).fontSize);

    if (areaDosBotoesDeAcessibilidade.classList.contains("ativo")) {
        alternarAAlturaDeUmElemento(false, areaDosBotoesDeAcessibilidade);
    }
}

window.addEventListener("pageshow", async function () {
    const { sucesso, dados, mensagem } = await enviarDados({ acao: "consultar-ano-atual" }, "consultar-ano-atual.php", "GET");

    if (!sucesso) {
        console.error(mensagem);
        return;
    }

    const { anoAtual } = dados;
    areaDoAnoAtual.textContent = anoAtual;
});

window.addEventListener("pageshow", function () {
    alternarAExibicaoDoMenuDeNavegacao(true);
});

window.addEventListener("pageshow", function () {
    alternarAAlturaDeUmElemento(true, areaDosBotoesDeAcessibilidade);
});

window.addEventListener("resize", function () {
    if (this.innerWidth >= 1200) {
        alternarAExibicaoDoMenuDeNavegacao(true);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    corpoDaPagina.style.fontSize = localStorage.getItem("tamanho-da-fonte-preferido");
});

document.addEventListener("click", function (event) {
    const elementoAlvo = event.target;

    if (elementoAlvo !== areaDosLinksDoMenuDeNavegacao) {
        alternarAExibicaoDoMenuDeNavegacao(true);
    }

    if (!areaDosBotoesDeAcessibilidade.contains(elementoAlvo)) {
        alternarAAlturaDeUmElemento(true, areaDosBotoesDeAcessibilidade);
    }
});

botaoQueAlternaAExibicaoDoMenuDeNavegacao.addEventListener("click", function (event) {
    event.stopPropagation();
    alternarAExibicaoDoMenuDeNavegacao(areaDosLinksDoMenuDeNavegacao.classList.contains("ativo"));
});

botaoQueAlternaAExibicaoDosBotoesDeAcessibilidade.addEventListener("click", function (event) {
    event.stopPropagation();
    alternarAAlturaDeUmElemento(areaDosBotoesDeAcessibilidade.classList.contains("ativo"), areaDosBotoesDeAcessibilidade);
});

botaoQueAumentaOTamanhoDaFonte.addEventListener("click", function () {
    alternarTamanhoDaFonte("aumentar");
});

botaoQueDiminuiOTamanhoDaFonte.addEventListener("click", function () {
    alternarTamanhoDaFonte("diminuir");
});

botaoQueResetaOTamanhoDaFonte.addEventListener("click", function () {
    alternarTamanhoDaFonte("resetar");
});