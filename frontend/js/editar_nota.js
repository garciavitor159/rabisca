// Variáveis e funções importadas
import {
  form,
  titulo,
  conteudo,
  adicionarEventoLoad,
  adicionarEventoSubmit,
  converterNum,
  limparVal,
  validarID,
  alternarModalMsgs,
  validarCampoObrigatorio,
  exibirErrTela,
  enviarDados,
  redirecionar,
} from "./utils.js";

// Elementos DOM e variáveis globais
let id = null;

adicionarEventoLoad(() => {
  const queryString = window.location.search;
  const paramsURL = new URLSearchParams(queryString);
  id = paramsURL.get("id");
  titulo.value = paramsURL.get("titulo");
  conteudo.value = paramsURL.get("conteudo");
});

adicionarEventoSubmit(form, async (e) => {
  e.preventDefault();
  const valID = converterNum(id);
  const valTitulo = limparVal(titulo.value);
  const valConteudo = limparVal(conteudo.value);

  if (!validarID(valID)) {
    alternarModalMsgs(
      true,
      "Erro: O ID é obrigatório e deve ser um número inteiro maior ou igual a 1."
    );

    return;
  }

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
    acao: "editar_nota",
    id: id,
    titulo: valTitulo,
    conteudo: valConteudo,
  };

  const url = "editar_nota.php";
  const metodo = "POST";
  const { msg } = await enviarDados(params, url, metodo);
  redirecionar(msg, "consultar_notas.html");
});
