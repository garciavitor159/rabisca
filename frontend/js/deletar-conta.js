const linkDeletarContaPrincipal = document.querySelector("#link-deletar-conta-principal");
const linkDeletarContaLateral = document.querySelector("#link-deletar-conta-lateral");
const fundoModalConfirmacaoConta = document.querySelector("#fundo-modal-confirmacao-conta");
const modalConfirmacaoConta = document.querySelector("#modal-confirmacao-conta");
const botaoConfirmarDelecaoConta = document.querySelector("#botao-confirmar-delecao-conta");
const botaoNegarDelecaoConta = document.querySelector("#botao-negar-delecao-conta");

function alternarModalConfirmacaoConta(exibir = false) {
    alternarVisibilidade([fundoModalConfirmacaoConta, modalConfirmacaoConta], exibir);
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        alternarModalConfirmacaoConta();
    }
});

linkDeletarContaPrincipal.addEventListener("click", function () {
    alternarModalConfirmacaoConta(true);
});

linkDeletarContaLateral.addEventListener("click", function () {
    alternarNavbarLateral();
    alternarModalConfirmacaoConta(true);
});

[fundoModalConfirmacaoConta, botaoNegarDelecaoConta].forEach(function (el) {
    el.addEventListener("click", function () {
        alternarModalConfirmacaoConta();
    });
});

botaoConfirmarDelecaoConta.addEventListener("click", function () {
    window.location.href = "php/processar-delecao-conta.php";
});