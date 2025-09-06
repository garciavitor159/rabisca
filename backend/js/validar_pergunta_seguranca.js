// Variáveis e funções importadas
import {
  form,
  email,
  perguntaSeguranca,
  resposta,
  adicionarEventoSubmit,
  limparVal,
  validarEmail,
  exibirErrTela,
  validarPerguntaSeguranca,
  validarCampoObrigatorio,
  enviarDados,
  redirecionar,
  alternarModalMsgs,
  limparCampo,
  limparCampos,
} from "./utils.js";

adicionarEventoSubmit(form, async (e) => {
  e.preventDefault();
  const valEmail = limparVal(email.value);
  const valPerguntaSeguranca = limparVal(perguntaSeguranca.value);
  const valResposta = limparVal(resposta.value);

  if (!validarEmail(email, valEmail)) {
    exibirErrTela(
      "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres.",
      email
    );

    return;
  }

  if (!validarPerguntaSeguranca(perguntaSeguranca, valPerguntaSeguranca)) {
    exibirErrTela(
      "Erro: A pergunta de segurança é obrigatória e deve ser válida.",
      perguntaSeguranca
    );

    return;
  }

  if (!validarCampoObrigatorio(resposta, valResposta, 70)) {
    exibirErrTela(
      "Erro: A resposta é obrigatória e deve conter até 70 caracteres.",
      resposta
    );

    return;
  }

  const params = {
    acao: "validar_pergunta_seguranca",
    email: valEmail,
    perguntaSeguranca: valPerguntaSeguranca,
    resposta: valResposta,
  };

  const url = "validar_pergunta_seguranca.php";
  const metodo = "POST";
  const { sucesso, dados, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    redirecionar(msg, "alterar_senha.html");
    return;
  }

  const { campoErr } = dados;
  alternarModalMsgs(true, msg);

  switch (campoErr) {
    case "email":
      limparCampo(email);
      break;
    case "pergunta_seguranca":
      limparCampo(perguntaSeguranca);
      break;
    case "resposta":
      limparCampo(resposta);
      break;
    default:
      limparCampos([email, perguntaSeguranca, resposta]);
  }
});
