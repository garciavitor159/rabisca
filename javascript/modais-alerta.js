// Elementos DOM e variáveis globais
const fundoModalAlerta = document.querySelector("#fundo-modal-alerta");
const modalAlerta = document.querySelector("#modal-alerta");
const textoModalAlerta = document.querySelector("#modal-alerta p");
const botaoFechaModalAlerta = document.querySelector("#modal-alerta button");
const mensagemRedirecionamento = localStorage.getItem("mensagem-redirecionamento");

// Funções

// Função que alterna a exibição do modal de alerta
const alternaModalAlerta = (exibir, mensagem) => {
    alternaElementos(exibir, [fundoModalAlerta, modalAlerta]);

    if (!exibir) {
        setTimeout(() => {
            textoModalAlerta.textContent = "";
        }, 500);

        return;
    }

    textoModalAlerta.textContent = mensagem;
};

adicionaEventoPageshow(() => {
    if (!mensagemRedirecionamento) {
        alternaModalAlerta(false);
    }
});

adicionaEventoKeydown(document, "Escape", () => {
    alternaModalAlerta(false);
});

adicionaEventoClick([fundoModalAlerta, botaoFechaModalAlerta], () => {
    alternaModalAlerta(false);
});

// Eventos

// Adiciona evento "load" para o window
window.addEventListener("load", () => {
    if (!mensagemRedirecionamento) {
        console.log("A mensagem de redirecionamento não foi definida. Isso pode indicar um erro.");
        return;
    }

    alternaModalAlerta(true, mensagemRedirecionamento);
    localStorage.removeItem("mensagem-redirecionamento");
});