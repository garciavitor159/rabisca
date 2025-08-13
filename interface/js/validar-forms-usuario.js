// Elementos e variáveis globais
const form = document.querySelector("#form");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

// Eventos

// Evento de submissão para o formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const retorno = validarDadosUsuario(nome, email, senha);

  if (retorno.estadoErro) {
    alternarDialogo(true, retorno.msgErro);
    limparCampo(retorno.campoErro);
    return;
  }

  e.currentTarget.submit();
});
