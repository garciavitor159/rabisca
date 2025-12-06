const corpoPagina = document.body;
const botaoAlternaBarraNav = document.querySelector("#botao-alterna-barra-nav");
const iconeAlternarBarraNav = document.querySelector("#botao-alterna-barra-nav i");
const areaLinksBarraNav = document.querySelector("#area-links-barra-nav");
const botaoAumentaFonte = document.querySelector("#botao-aumenta-fonte");
const botaoDiminuiFonte = document.querySelector("#botao-diminui-fonte");
const botaoResetaFonte = document.querySelector("#botao-reseta-fonte");
const areaAnoAtual = document.querySelector("#area-ano-atual");

const alternaBarraNav = (esconder) => {
    if (esconder) {
        areaLinksBarraNav.style.height = "";
        areaLinksBarraNav.classList.remove("ativo");
    } else {
        const alturaAreaLinksBarraNav = areaLinksBarraNav.scrollHeight;
        areaLinksBarraNav.style.height = `${alturaAreaLinksBarraNav}px`;
        areaLinksBarraNav.classList.add("ativo");
    }

    alternaIcone(esconder, iconeAlternarBarraNav, "bi-list", "bi-x-lg");
};

const alternaFonte = (acao) => {
    let tamanhoFonte = Number(window.getComputedStyle(corpoPagina).fontSize.replace("px", ""));

    switch (acao) {
        case "aumentar":
            tamanhoFonte += 0.1;
            break;
        case "diminuir":
            tamanhoFonte -= 0.1;
            break;
        default:
            tamanhoFonte = "";
    }

    corpoPagina.style.fontSize = typeof tamanhoFonte === "number" ? `${tamanhoFonte}px` : tamanhoFonte;
    localStorage.setItem("tamanho-fonte-preferido", window.getComputedStyle(corpoPagina).fontSize);
};

window.addEventListener("pageshow", async () => {
    const { sucesso, dados, msg } = await enviaDados({ acao: "consultar-ano-atual" }, "consulta-ano-atual.php", "GET");

    if (!sucesso) {
        console.error(msg);
        return;
    }

    const { anoAtual } = dados;
    areaAnoAtual.textContent = anoAtual;
});

window.addEventListener("pageshow", () => {
    alternaBarraNav(true);
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) {
        alternaBarraNav(true);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    corpoPagina.style.fontSize = localStorage.getItem("tamanho-fonte-preferido");
});

document.addEventListener("click", (e) => {
    if (e.target !== areaLinksBarraNav) {
        alternaBarraNav(true);
    }
});

botaoAlternaBarraNav.addEventListener("click", (e) => {
    e.stopPropagation();
    alternaBarraNav(areaLinksBarraNav.classList.contains("ativo"));
});

botaoAumentaFonte.addEventListener("click", () => {
    alternaFonte("aumentar");
});

botaoDiminuiFonte.addEventListener("click", () => {
    alternaFonte("diminuir");
});

botaoResetaFonte.addEventListener("click", () => {
    alternaFonte("resetar");
});