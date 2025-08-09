const form = document.querySelector("#form");
const id = document.querySelector("#id");
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (id) {
    const valId = Number.parseInt(id.value.trim());

    if (!validarId(valId)) {
      alternarModalMsg(
        true,
        "Erro: O ID é obrigatório e deve ser um número maior ou igual a 1."
      );

      limparCampo(id);
      return;
    }
  }

  const valTitulo = titulo.value.trim();
  const valDescricao = descricao.value.trim();

  if (!validarCampo(titulo) || !validarValorObrigatorio(valTitulo, 30)) {
    alternarModalMsg(
      true,
      "Erro: O título é obrigatório e deve conter até 30 caracteres."
    );

    limparCampo(titulo);
    return;
  }

  if (!validarCampo(descricao) || !validarValorObrigatorio(valDescricao, 200)) {
    alternarModalMsg(
      true,
      "Erro: A descrição é obrigatória e deve conter até 200 caracteres."
    );

    limparCampo(descricao);
    return;
  }

  this.submit();
});
