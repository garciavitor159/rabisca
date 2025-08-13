// Elementos e variáveis globais
const forms = document.querySelectorAll(".form");

// Eventos

forms.forEach((el) =>
  // Evento de submissão para os formulários
  el.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = e.currentTarget.querySelector(".id");
    const valId = converterNum(id.value);

    if (!validarId(valId)) {
      alternarDialogo(
        true,
        "O ID é obrigatório e deve ser um número inteiro maior ou igual a 1. Por favor, tente novamente."
      );

      limparCampo(id);
      return;
    }

    e.currentTarget.submit();
  })
);
