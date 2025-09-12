const botaoAbrirSidebar = document.querySelector("#botaoAbrirSidebar");
const fundoSidebar = document.querySelector("#fundoSidebar");
const sidebar = document.querySelector("#sidebar");
const botaoFecharSidebar = document.querySelector("#botaoFecharSidebar");
const botaoFecharModalAlerta = document.querySelector("#botaoFecharModalAlerta");
const creditos = document.querySelector("#creditos");

const alternarSidebar = (exibir) => {
    alternarVisibilidade([fundoSidebar, sidebar], exibir);
};

adicionarEventoPageshow(() => {
    alternarSidebar(false);
});

adicionarEventoPageshow(async () => {
    const params = { acao: "consultar_ano_atual" };
    const url = "consultar_ano_atual.php";
    const metodo = "GET";
    const { sucesso, dados, msg } = await enviarDados(params, url, metodo);
    const { anoAtual } = dados;

    if (sucesso) {
        const elementoAnoAtual = creditos.querySelector("span");
        elementoAnoAtual.textContent = anoAtual;
        return;
    }

    exibirErroConsole(msg);
});

adicionarEventoKeydown(document, (e) => {
    if (e.key === "Escape") {
        alternarSidebar(false);
        alternarModalAlerta(false, "");
    }
});

adicionarEventoClick([botaoAbrirSidebar], () => {
    alternarSidebar(true);
});

adicionarEventoClick([fundoSidebar, botaoFecharSidebar], () => {
    alternarSidebar(false);
});

adicionarEventoClick([fundoModalAlerta, botaoFecharModalAlerta], () => {
    alternarModalAlerta(false, "");
});

window.addEventListener("load", () => {
    const msg = localStorage.getItem("msg");

    if (msg !== null) {
        alternarModalAlerta(true, msg);
        localStorage.removeItem("msg");
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
        alternarSidebar(false);
    }
});