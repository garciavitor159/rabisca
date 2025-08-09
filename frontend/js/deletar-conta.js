const linkDeletarContaPrincipal = document.querySelector(
  "#link-deletar-conta-principal"
);

const linkDeletarContaLateral = document.querySelector(
  "#link-deletar-conta-lateral"
);

const fundoModalConfirmarDelecaoConta = document.querySelector(
  "#fundo-modal-confirmar-delecao-conta"
);

const modalConfirmarDelecaoConta = document.querySelector(
  "#modal-confirmar-delecao-conta"
);

const botaoConfirmarDelecaoConta = document.querySelector(
  "#botao-confirmar-delecao-conta"
);

const botaoNegarDelecaoConta = document.querySelector(
  "#botao-negar-delecao-conta"
);

function alternarModalConfirmarDelecaoConta(exibir = false) {
  alternarVisibilidade(
    [fundoModalConfirmarDelecaoConta, modalConfirmarDelecaoConta],
    exibir
  );
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    alternarModalConfirmarDelecaoConta();
  }
});

linkDeletarContaPrincipal.addEventListener("click", function () {
  alternarModalConfirmarDelecaoConta(true);
});

linkDeletarContaLateral.addEventListener("click", function () {
  alternarNavbarLateral();
  alternarModalConfirmarDelecaoConta(true);
});

[fundoModalConfirmarDelecaoConta, botaoNegarDelecaoConta].forEach(function (
  el
) {
  el.addEventListener("click", function () {
    alternarModalConfirmarDelecaoConta();
  });
});

botaoConfirmarDelecaoConta.addEventListener("click", function () {
  window.location.href = "php/processar-delecao-conta.php";
});
