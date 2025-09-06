// Variáveis e funções importadas
import { adicionarEventoLoad, enviarDados, redirecionar } from "./utils.js";

adicionarEventoLoad(async () => {
  const params = { acao: "verificar_existe_sessao_id" };
  const url = "verificar_existe_sessao_id.php";
  const metodo = "GET";
  const { sucesso, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    return;
  }

  redirecionar(msg, "login.html");
});
