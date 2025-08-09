const fundoModalConfirmarDelecaoNota = document.querySelector(
  "#fundo-modal-confirmar-delecao-nota"
);

const modalConfirmarDelecaoNota = document.querySelector(
  "#modal-confirmar-delecao-nota"
);

const form = document.querySelector("#form");
const id = document.querySelector("#id");

const botaoNegarDelecaoNota = document.querySelector(
  "#botao-negar-delecao-nota"
);

function alternarModalConfirmarDelecaoNota(exibir = false) {
  alternarVisibilidade(
    [fundoModalConfirmarDelecaoNota, modalConfirmarDelecaoNota],
    exibir
  );
}

function prepararDelecao(botaoDeletar) {
  const valId = botaoDeletar.dataset.id;
  id.value = valId;
  alternarModalConfirmarDelecaoNota(true);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    alternarModalConfirmarDelecaoNota();
  }
});

document.addEventListener("click", function (e) {
  const elAlvo = e.target;

  if (elAlvo.classList.contains("botao-deletar")) {
    prepararDelecao(elAlvo);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const valId = Number.parseInt(id.value.trim());

  if (!validarId(valId)) {
    alternarModalConfirmarDelecaoNota();

    alternarModalMsg(
      true,
      "Erro: O ID é obrigatório e deve ser um número maior ou igual a 1."
    );

    limparCampo(id);

    return;
  }

  this.submit();
});

[fundoModalConfirmarDelecaoNota, botaoNegarDelecaoNota].forEach(function (el) {
  el.addEventListener("click", function () {
    alternarModalConfirmarDelecaoNota();
  });
});
