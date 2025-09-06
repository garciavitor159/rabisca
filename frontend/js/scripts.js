// Variáveis e funções importadas
import {
  overlayModalMsgs,
  adicionarEventoPageshow,
  alternarVisibilidade,
  adicionarEventoLoad,
  enviarDados,
  exibirErrConsole,
  alternarModalMsgs,
  adicionarEventoKeydown,
  adicionarEventoClick,
} from "./utils.js";

// Elementos DOM e variáveis globais
const botaoAbrirSidebar = document.querySelector("#botaoAbrirSidebar");
const overlaySidebar = document.querySelector("#overlaySidebar");
const sidebar = document.querySelector("#sidebar");
const botaoFecharSidebar = document.querySelector("#botaoFecharSidebar");
const botaoFecharModalMsgs = document.querySelector("#botaoFecharModalMsgs");
const copyright = document.querySelector("#copyright");

// Funções

// Função que alterna a visibilidade da sidebar
const alternarSidebar = (exibir) => {
  alternarVisibilidade([overlaySidebar, sidebar], exibir);
};

adicionarEventoPageshow((e) => {
  if (e.persisted) {
    window.location.reload();
  }
});

adicionarEventoPageshow(() => {
  alternarSidebar(false);
});

adicionarEventoLoad(async () => {
  const params = { acao: "consultar_ano_atual" };
  const url = "consultar_ano_atual.php";
  const metodo = "GET";
  const { sucesso, dados, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    const { anoAtual } = dados;
    const elAnoAtual = copyright.querySelector("span");
    elAnoAtual.textContent = anoAtual;
    return;
  }

  exibirErrConsole(msg);
});

adicionarEventoLoad(() => {
  const msg = localStorage.getItem("msg");

  if (msg) {
    alternarModalMsgs(true, msg);
    localStorage.removeItem("msg");
  }
});

adicionarEventoKeydown(document, (e) => {
  if (e.key === "Escape") {
    alternarSidebar(false);
    alternarModalMsgs(false);
  }
});

adicionarEventoClick([botaoAbrirSidebar], () => {
  alternarSidebar(true);
});

adicionarEventoClick([overlaySidebar, botaoFecharSidebar], () => {
  alternarSidebar(false);
});

adicionarEventoClick([overlayModalMsgs, botaoFecharModalMsgs], () => {
  alternarModalMsgs(false);
});

// Eventos

// Evento "resize" para o window
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    alternarSidebar(false);
  }
});
