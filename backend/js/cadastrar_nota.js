// Variáveis e funções importadas
import {
  form,
  titulo,
  conteudo,
  adicionarEventoSubmit,
  limparVal,
  validarCampoObrigatorio,
  exibirErrTela,
  enviarDados,
  redirecionar,
  alternarModalMsgs,
  limparCampo,
  limparCampos,
} from "./utils.js";

adicionarEventoSubmit(form, async (e) => {
  e.preventDefault();
  const valTitulo = limparVal(titulo.value);
  const valConteudo = limparVal(conteudo.value);

  if (!validarCampoObrigatorio(titulo, valTitulo, 80)) {
    exibirErrTela(
      "Erro: O título é obrigatório e deve conter até 80 caracteres.",
      titulo
    );

    return;
  }

  if (!validarCampoObrigatorio(conteudo, valConteudo, 200)) {
    exibirErrTela(
      "Erro: O conteúdo é obrigatório e deve conter até 200 caracteres.",
      conteudo
    );

    return;
  }

  const params = {
    acao: "cadastrar_nota",
    titulo: valTitulo,
    conteudo: valConteudo,
  };

  const url = "cadastrar_nota.php";
  const metodo = "POST";
  const { sucesso, dados, msg } = await enviarDados(params, url, metodo);
  const { campoErr, acessoNegado } = dados;

  if (sucesso) {
    redirecionar(msg, "consultar_notas.html");
    return;
  }

  if (acessoNegado) {
    redirecionar(msg, "login.html");
    return;
  }

  alternarModalMsgs(true, msg);

  switch (campoErr) {
    case "titulo":
      limparCampo(titulo);
      break;
    case "conteudo":
      limparCampo(conteudo);
      break;
    default:
      limparCampos([titulo, conteudo]);
  }
});
