// Elementos e variáveis globais
const form = document.querySelector("#form");
const id = document.querySelector("#id");
const titulo = document.querySelector("#titulo");
const conteudo = document.querySelector("#conteudo");

// Eventos

// Evento de submissão para o formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (id) {
    const valId = converterNum(id.value);

    if (!validarId(valId)) {
      alternarDialogo(
        true,
        "O ID é obrigatório e deve ser um número inteiro maior ou igual a 1. Por favor, tente novamente."
      );

      limparCampo(id);
      return;
    }
  }

  const valTitulo = limparVal(titulo.value);
  const valConteudo = limparVal(conteudo.value);

  if (!validarCampoObrigatorio(titulo, valTitulo, 80)) {
    alternarDialogo(
      true,
      "O título é obrigatório e deve ter no máximo 80 caracteres. Por favor, tente novamente."
    );

    limparCampo(titulo);
    return;
  }

  if (!validarCampoObrigatorio(conteudo, valConteudo, 200)) {
    alternarDialogo(
      true,
      "O conteúdo é obrigatório e deve ter no máximo 200 caracteres. Por favor, tente novamente."
    );

    limparCampo(conteudo);
    return;
  }

  e.currentTarget.submit();
});
