// Variáveis e funções importadas
import { adicionarEventoLoad, enviarDados, redirecionar } from "./utils.js";

adicionarEventoLoad(async () => {
  const params = { acao: "verificar_sessao_ultimo_acesso" };
  const url = "verificar_sessao_ultimo_acesso.php";
  const metodo = "POST";
  const { sucesso, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    return;
  }

  redirecionar(msg, "login.html");
});
