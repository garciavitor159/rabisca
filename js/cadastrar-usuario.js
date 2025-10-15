const form = document.querySelector("#form");
const nomeUsuario = form.querySelector("#nomeUsuario");
const email = form.querySelector("#email");
const senha = form.querySelector("#senha");
const perguntaSeguranca = form.querySelector("#perguntaSeguranca");
const resposta = form.querySelector("#resposta");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const valNomeUsuario = nomeUsuario.value.trim();
  const valEmail = email.value.trim();
  const valSenha = senha.value.trim();
  const valPerguntaSeguranca = Number(perguntaSeguranca.value.trim());
  const valResposta = resposta.value.trim();

  if (!validarCampoObrigatorio(nomeUsuario, valNomeUsuario, 50)) {
    exibirErro(
      "Erro: O nome de usuário é obrigatório e deve conter até 50 caracteres. Por favor, tente novamente.",
      nomeUsuario
    );

    return;
  }

  if (!validarEmail(email, valEmail)) {
    exibirErro(
      "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres. Por favor, tente novamente.",
      email
    );

    return;
  }

  if (!validarSenha(senha, valSenha)) {
    exibirErro(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo. Por favor, tente novamente.",
      senha
    );

    return;
  }

  if (!validarPerguntaSeguranca(perguntaSeguranca, valPerguntaSeguranca)) {
    exibirErro(
      "Erro: Pergunta de segurança inválida. Por favor, tente novamente.",
      perguntaSeguranca
    );

    return;
  }

  if (!validarCampoObrigatorio(resposta, valResposta, 70)) {
    exibirErro(
      "Erro: A resposta é obrigatória e deve conter até 70 caracteres. Por favor, tente novamente.",
      resposta
    );

    return;
  }

  const { sucesso, dados, msg } = await enviarDados(
    {
      acao: "cadastrar_usuario",
      nomeUsuario: valNomeUsuario,
      email: valEmail,
      senha: valSenha,
      perguntaSeguranca: valPerguntaSeguranca,
      resposta: valResposta,
    },
    "cadastrar-usuario.php",
    "POST"
  );

  if (!sucesso) {
    const { campoErr } = dados;
    alternarModalAlerta(true, msg);

    switch (campoErr) {
      case "nome":
        limparCampo(nome);
        break;
      case "email":
        limparCampo(email);
        break;
      case "senha":
        limparCampo(senha);
        break;
      case "perguntaSeguranca":
        limparCampo(perguntaSeguranca);
        break;
      case "resposta":
        limparCampo(resposta);
        break;
      default:
        limparCampos([nomeUsuario, email, senha, perguntaSeguranca, resposta]);
    }

    return;
  }

  redirecionar(msg, "/fazer-login.html");
});
