import {
  form,
  nome,
  email,
  senha,
  limparVal,
  validarCampoObrigatorio,
  mostrarErro,
  validarEmail,
  validarSenha,
  enviarDados,
  alternarModalMsg,
  limparCampo,
  limparCampos,
  redirecionar,
} from "./utilitarios.js";

async function cadastrarUsuario(dados) {
  try {
    const { deuErro, msg, campoErro } = await enviarDados(dados, "POST");

    if (deuErro) {
      alternarModalMsg(true, msg);

      switch (campoErro) {
        case "nome":
          limparCampo(nome);
          break;
        case "email":
          limparCampo(email);
          break;
        case "senha":
          limparCampo(senha);
          break;
        default:
          limparCampos([nome, email, senha]);
      }

      return;
    }

    redirecionar({ txt: msg, deveExibir: true }, "login.html");
  } catch (err) {
    alternarModalMsg(
      true,
      `Erro: Não foi possível efetuar seu cadastro (${err}).`
    );
  }
}

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const valNome = limparVal(nome?.value);
  const valEmail = limparVal(email?.value);
  const valSenha = limparVal(senha?.value);

  if (!validarCampoObrigatorio(nome, valNome, 50)) {
    mostrarErro(
      "Erro: O nome é obrigatório e deve conter até 50 caracteres.",
      nome
    );

    return;
  }

  if (!validarEmail(valEmail)) {
    mostrarErro(
      "Erro: O e-mail é obrigatório, deve ser minimamente válido (nome@exemplo.br) e conter até 80 caracteres.",
      email
    );

    return;
  }

  if (!validarSenha(valSenha)) {
    mostrarErro(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
      senha
    );

    return;
  }

  cadastrarUsuario({
    acao: "cadastrar_usuario",
    nome: valNome,
    email: valEmail,
    senha: valSenha,
  });
});
