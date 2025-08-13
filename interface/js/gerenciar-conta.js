// Elementos e variáveis globais
const formEditar = document.querySelector("#form-editar");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const formDeletar = document.querySelector("#form-deletar");
const confirmacao = document.querySelector("#confirmacao");

// Evento de submissão para o formulário de editar
formEditar.addEventListener("submit", (e) => {
  e.preventDefault();
  const retorno = validarDadosUsuario(nome, email, senha);

  if (retorno.estadoErro && retorno.msgErro && retorno.campoErro) {
    alternarDialogo(true, retorno.msgErro);
    limparCampo(retorno.campoErro);
    return;
  }

  e.currentTarget.submit();
});

// Evento de submissão para o formulário de deletar
formDeletar.addEventListener("submit", (e) => {
  e.preventDefault();
  const valConfirmacao = limparVal(confirmacao.value);

  if (
    !validarCampoObrigatorio(confirmacao, valConfirmacao, 13) ||
    valConfirmacao !== "deletar conta"
  ) {
    alternarDialogo(true, "Confirmação incorreta. Por favor, tente novamente.");
    limparCampo(confirmacao);
    return;
  }

  e.currentTarget.submit();
});
