import { adicionarEventoLoad, enviarDados, exibirErrConsole } from "./utils.js";

adicionarEventoLoad(async () => {
  const params = { acao: "excluir_sessoes_autorizacao" };
  const url = "excluir_sessoes_autorizacao.php";
  const metodo = "POST";
  const { sucesso, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    return;
  }

  exibirErrConsole(msg);
});
