// Variáveis e funções importadas
import { adicionarEventoLoad, enviarDados, exibirErrConsole } from "./utils.js";
const titulo = document.querySelector("#titulo");

adicionarEventoLoad(async () => {
  const params = { acao: "resgatar_nome_usuario" };
  const url = "resgatar_nome_usuario.php";
  const metodo = "GET";
  const { sucesso, dados, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    const { nome } = dados;
    const elNome = titulo.querySelector("span");
    elNome.textContent = nome;
    return;
  }

  exibirErrConsole(msg);
});
