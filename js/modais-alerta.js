const fundoModalAlerta = document.querySelector("#fundo-modal-alerta");
const modalAlerta = document.querySelector("#modal-alerta");
const txtModalAlerta = document.querySelector("#modal-alerta p");
const botaoFechaModalAlerta = document.querySelector("#modal-alerta button");
const msgRedirecionamento = localStorage.getItem("msg-redirecionamento");

const alternaModalAlerta = (exibir, msg) => {
    alternaEls(exibir, [fundoModalAlerta, modalAlerta]);

    if (!exibir) {
        setTimeout(() => {
            txtModalAlerta.textContent = "";
        }, 500);

        return;
    }

    txtModalAlerta.textContent = msg;
};

window.addEventListener("pageshow", () => {
    if (!msgRedirecionamento) {
        alternaModalAlerta(false, "");
    }
});

window.addEventListener("load", () => {
    if (!msgRedirecionamento) {
        console.warn("Aviso: Mensagem de redirecionamento não definida. Isso pode significar um erro.");
        return;
    }

    alternaModalAlerta(true, msgRedirecionamento);
    localStorage.removeItem("msg-redirecionamento");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        alternaModalAlerta(false, "");
    }
});

[fundoModalAlerta, botaoFechaModalAlerta].forEach((el) => {
    el.addEventListener("click", () => {
        alternaModalAlerta(false, "");
    });
});