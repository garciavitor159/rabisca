const fundoModalConfirmacaoNota = document.querySelector("#fundo-modal-confirmacao-nota");
const modalConfirmacaoNota = document.querySelector("#modal-confirmacao-nota");
const form = document.querySelector("#form");
const id = document.querySelector("#id");
const botaoNegarDelecaoNota = document.querySelector("#botao-negar-delecao-nota");

function alternarModalConfirmacaoNota(exibir = false) {
    alternarVisibilidade([fundoModalConfirmacaoNota, modalConfirmacaoNota], exibir);
}

function prepararDelecao(botaoDeletar) {
    const valId = botaoDeletar.dataset.id;
    id.value = valId;
    alternarModalConfirmacaoNota(true);
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        alternarModalConfirmacaoNota();
    }
});

document.addEventListener("click", function (e) {
    const elAlvo = e.target;

    if (elAlvo.classList.contains("botao-deletar")) {
        prepararDelecao(elAlvo);
    }
});

[fundoModalConfirmacaoNota, botaoNegarDelecaoNota].forEach(function (el) {
    el.addEventListener("click", function () {
        alternarModalConfirmacaoNota();
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const valId = Number.parseInt(id.value.trim());

    if (!validarId(valId)) {
        alternarModalConfirmacaoNota();

        alternarModalMsg(true, "Erro: O ID é obrigatório e deve ser um número maior ou igual a 1.");

        limparCampo(id);
        return;
    }

    this.submit();
});