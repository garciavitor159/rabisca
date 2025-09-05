// Variáveis e funções importadas
import {
  form,
  nome,
  email,
  senha,
  perguntaSeguranca,
  resposta,
  adicionarEventoSubmit,
  limparVal,
  validarNome,
  exibirErrTela,
  validarEmail,
  validarSenha,
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
  const valNome = limparVal(nome.value);
  const valEmail = limparVal(email.value);
  const valSenha = limparVal(senha.value);
  const valPerguntaSeguranca = limparVal(perguntaSeguranca.value);
  const valResposta = limparVal(resposta.value);

  if (!validarNome(nome, valNome)) {
    exibirErrTela(
      "Erro: O nome é obrigatório, deve conter somente letras e espaços e ter até 50 caracteres.",
      nome
    );

    return;
  }

  if (!validarEmail(email, valEmail)) {
    exibirErrTela(
      "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres.",
      email
    );

    return;
  }

  if (!validarSenha(senha, valSenha)) {
    exibirErrTela(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
      senha
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
    acao: "cadastrar_usuario",
    nome: valNome,
    email: valEmail,
    senha: valSenha,
    perguntaSeguranca: valPerguntaSeguranca,
    resposta: valResposta,
  };

  const url = "cadastrar_usuario.php";
  const metodo = "POST";
  const { sucesso, dados, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    redirecionar(msg, "login.html");
    return;
  }

  const { campoErr } = dados;
  alternarModalMsgs(true, msg);

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
    case "pergunta_seguranca":
      limparCampo(perguntaSeguranca);
      break;
    case "resposta":
      limparCampo(resposta);
      break;
    default:
      limparCampos([nome, email, senha, perguntaSeguranca, resposta]);
  }
});
