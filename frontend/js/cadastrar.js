import {
  form,
  campoNome,
  campoEmail,
  campoSenha,
  botaoAlternarSenha,
  limparVal,
  validarCampoObrigatorio,
  mostrarErro,
  validarEmail,
  validarSenha,
  enviarDados,
  alternarModal,
  limparCampo,
  redirecionar,
  alternarSenha,
} from "./utilitarios.js";

async function cadastrar(dados) {
  try {
    const { deuErro, msg, campoErro } = await enviarDados(dados);

    if (deuErro) {
      alternarModal(true, msg);

      switch (campoErro) {
        case "nome":
          limparCampo(campoNome);
          break;
        case "email":
          limparCampo(campoEmail);
          break;
        case "senha":
          limparCampo(campoSenha);
          break;
      }

      return;
    }

    redirecionar(msg, "login.html");
  } catch (error) {
    alternarModal(true, error);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const valNome = limparVal(campoNome.value);
  const valEmail = limparVal(campoEmail.value);
  const valSenha = limparVal(campoSenha.value);

  if (!validarCampoObrigatorio(campoNome, valNome, 50)) {
    mostrarErro(
      "Erro: O nome é obrigatório e deve conter até 50 caracteres.",
      campoNome
    );

    return;
  }

  if (!validarEmail(valEmail)) {
    mostrarErro(
      "Erro: O e-mail é obrigatório, deve ser minimamente válido (nome@exemplo.br) e conter até 80 caracteres.",
      campoEmail
    );

    return;
  }

  if (!validarSenha(valSenha)) {
    mostrarErro(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
      campoSenha
    );

    return;
  }

  cadastrar({
    acao: "cadastrar_usuario",
    nome: valNome,
    email: valEmail,
    senha: valSenha,
  });
});

botaoAlternarSenha.addEventListener("click", alternarSenha);
