const botaoQueFechaOModalDeAlerta = document.querySelector("#modal-de-alerta button");
const mensagemDeRedirecionamento = localStorage.getItem("mensagem-de-redirecionamento");

window.addEventListener("pageshow", function () {
    if (!mensagemDeRedirecionamento) {
        alternarAExibicaoDoModalDeAlerta(false, "");
    }
});

window.addEventListener("load", function () {
    if (!mensagemDeRedirecionamento) {
        console.warn("Aviso: A mensagem de redirecionamento não foi definida. Isto pode significar um erro.");
        return;
    }

    alternarAExibicaoDoModalDeAlerta(true, mensagemDeRedirecionamento);
    this.localStorage.removeItem("mensagem-de-redirecionamento");
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        alternarAExibicaoDoModalDeAlerta(false, "");
    }
});

[fundoDoModalDeAlerta, botaoQueFechaOModalDeAlerta].forEach(function (elemento) {
    elemento.addEventListener("click", function (event) {
        event.stopPropagation();
        alternarAExibicaoDoModalDeAlerta(false, "");
    });
});