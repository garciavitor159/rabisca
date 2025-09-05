// Variáveis e funções importadas
import {
  adicionarEventoClick,
  enviarDados,
  redirecionar,
  alternarModalMsgs,
} from "./utils.js";

const linksLogout = document.querySelectorAll(".link-logout");

adicionarEventoClick(linksLogout, async () => {
  const params = { acao: "efetuar_logout.js" };
  const url = "efetuar_logout.php";
  const metodo = "POST";
  const { sucesso, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    redirecionar(msg, "index.html");
    return;
  }

  alternarModalMsgs(true, msg);
});
