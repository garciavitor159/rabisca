const email = form.querySelector("#email");
const perguntaSeguranca = form.querySelector("#perguntaSeguranca");
const resposta = form.querySelector("#resposta");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const valEmail = email.value.trim();
  const valPerguntaSeguranca = Number(perguntaSeguranca.value.trim());
  const valResposta = resposta.value.trim();

  if (!validarEmail(email, valEmail)) {
    exibirErro(
      "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres. Por favor, tente novamente.",
      email
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
      acao: "validar_pergunta_seguranca",
      email: valEmail,
      perguntaSeguranca: valPerguntaSeguranca,
      resposta: valResposta,
    },
    "validar-pergunta-seguranca.php",
    "POST"
  );

  if (!sucesso) {
    const { campoErr } = dados;
    alternarModalAlerta(true, msg);

    switch (campoErr) {
      case "email":
        limparCampo(email);
        break;
      case "perguntaSeguranca":
        limparCampo(perguntaSeguranca);
        break;
      case "resposta":
        limparCampo(resposta);
        break;
      default:
        limparCampos([email, perguntaSeguranca, resposta]);
    }

    return;
  }

  redirecionar(msg, "/editar-senha.html");
});
