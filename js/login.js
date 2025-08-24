import {
  form,
  email,
  senha,
  limparVal,
  validarCampo,
  validarEmail,
  validarMaxCarac,
  exibirErro,
  validarSenha,
  enviarDados,
  alternarModalMsg,
  limparCampo,
  limparCampos,
  redirecionar,
  exibirErroConsole,
} from "./utilitarios.js";

async function efetuarLogin(dados) {
  try {
    const { deuErro, msg, campoErro } = await enviarDados(dados, "POST");

    if (deuErro) {
      alternarModalMsg(true, msg);

      switch (campoErro) {
        case "email":
          limparCampo(email);
          break;
        case "senha":
          limparCampo(senha);
          break;
        default:
          limparCampos([email, senha]);
      }

      return;
    }

    redirecionar({ txt: msg, deveExibir: true }, "criar-nota.html");
  } catch (err) {
    exibirErroConsole(`Erro: ${err}.`);
    alternarModalMsg(true, "Erro: Não foi possível efetuar seu login.");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const valEmail = limparVal(email.value);
  const valSenha = limparVal(senha.value);

  if (
    !validarCampo(email) ||
    !validarEmail(valEmail) ||
    !validarMaxCarac(valEmail, 80)
  ) {
    exibirErro(
      "Erro: O e-mail é obrigatório, deve ser minimamente válido (nome@exemplo.br) e conter até 80 caracteres.",
      email
    );

    return;
  }

  if (!validarCampo(senha) || !validarSenha(valSenha)) {
    exibirErro(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
      senha
    );

    return;
  }

  efetuarLogin({
    acao: "efetuar_login",
    email: valEmail,
    senha: valSenha,
  });
});
