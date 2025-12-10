const fundoModalAlerta = document.querySelector("#fundo-modal-alerta");
const modalAlerta = document.querySelector("#modal-alerta");
const textoModalAlerta = document.querySelector("#modal-alerta p");
const botaoFechaModalAlerta = document.querySelector("#modal-alerta button");
const mensagemRedirecionamento = localStorage.getItem("mensagem-redirecionamento");

const alternaModalAlerta = (exibir, mensagem) => {
    alternaExibicao(exibir, [fundoModalAlerta, modalAlerta]);

    if (!exibir) {
        setTimeout(() => {
            textoModalAlerta.textContent = "";
        }, 500);

        return;
    }

    textoModalAlerta.textContent = mensagem;
};

window.addEventListener("load", () => {
    if (!mensagemRedirecionamento) {
        console.warn("Aviso: A mensagem de redirecionamento não foi definida. Isso pode indicar um erro.");
        return;
    }

    alternaModalAlerta(true, mensagemRedirecionamento);
    localStorage.removeItem("mensagem-redirecionamento");
});

adicionaEventoPageshow(() => {
    if (!mensagemRedirecionamento) {
        alternaModalAlerta(false, "");
    }
});

detectaTeclaEsc(() => {
    alternaModalAlerta(false, "");
});

[fundoModalAlerta, botaoFechaModalAlerta].forEach((elemento) => {
    adicionaEventoClick([elemento], () => {
        alternaModalAlerta(false, "");
    });
});