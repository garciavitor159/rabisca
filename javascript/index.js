// Elementos DOM e variáveis globais
const fundoModal = document.querySelector("#fundo-modal");
const modal = document.querySelector("#modal");
const textoModal = document.querySelector("#modal p");
const botaoFechaModal = document.querySelector("#modal button");
const mensagemRedirecionamento = localStorage.getItem("mensagem-redirecionamento");

// Funções

// Função que alterna a exibição do modal
function alternaModal(exibir, mensagem) {
    [fundoModal, modal].forEach(function (elemento) {
        elemento.classList.toggle("escondido", !exibir);
    });

    if (!exibir) {
        setTimeout(function () {
            textoModal.textContent = mensagem;
        }, 500);

        return;
    }

    textoModal.textContent = mensagem;
}

// Função que encerra a sessão do usuário
async function encerraSessao() {
    try {
        await axiosCustomizado.post("encerra-sessao.php", { acao: "encerrar-sessao" });
        console.log("Sessão encerrada com sucesso.");
    } catch (error) {
        const { mensagem = `Erro: Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde. Código: ${error.status}.` } = error.response.data;

        console.error(mensagem);
    }
}

// Eventos

// Adiciona o evento "pageshow" para o objeto window
window.addEventListener("pageshow", function () {
    if (!mensagemRedirecionamento) {
        alternaModal(false, "");
    }

    encerraSessao();
});

// Adiciona o evento "load" para o objeto window
window.addEventListener("load", function () {
    if (!mensagemRedirecionamento) {
        console.warn("Aviso: A mensagem de redirecionamento não foi definida. Isso pode indicar um erro.");
        return;
    }

    alternaModal(true, mensagemRedirecionamento);
    this.localStorage.removeItem("mensagem-redirecionamento");
});

// Adiciona o evento "keydown" para o objeto document
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        alternaModal(false, "");
    }
});

// Adiciona o evento "click" para o fundo do modal e para o botão que fecha o modal
[fundoModal, botaoFechaModal].forEach(function (elemento) {
    elemento.addEventListener("click", function () {
        alternaModal(false, "");
    });
});