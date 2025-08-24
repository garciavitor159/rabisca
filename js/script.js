import {
  fundoModalMsg,
  alternarVisibilidade,
  enviarDados,
  exibirErroConsole,
  alternarModalMsg,
  adicionarEventoClique,
} from "./utilitarios.js";

const botaoAbrirSidebar = document.querySelector("#botaoAbrirSidebar");
const fundoSidebar = document.querySelector("#fundoSidebar");
const sidebar = document.querySelector("#sidebar");
const botaoFecharSidebar = document.querySelector("#botaoFecharSidebar");
const botaoFecharModalMsg = document.querySelector("#botaoFecharModalMsg");
const creditos = document.querySelector("#creditos");

function alternarSidebar(exibir) {
  alternarVisibilidade([fundoSidebar, sidebar], exibir);
}

async function resgatarAnoAtual() {
  try {
    const { deuErro, msg, anoAtual } = await enviarDados(
      { acao: "resgatar_ano_atual" },
      "GET"
    );

    if (deuErro) {
      exibirErroConsole(msg);
      return;
    }

    const elAnoAtual = creditos.querySelector("span");
    elAnoAtual.textContent = anoAtual;
  } catch (err) {
    exibirErroConsole(`Erro: ${err}.`);
  }
}

function exibirMsg() {
  const msg = JSON.parse(localStorage.getItem("msg"));

  if (msg !== null) {
    const { txt, deveExibir } = msg;

    if (deveExibir) {
      alternarModalMsg(true, txt);
    } else {
      console.log(txt);
    }

    localStorage.removeItem("msg");
  }
}

window.addEventListener("pageshow", function () {
  alternarSidebar(false);
});

window.addEventListener("load", function () {
  resgatarAnoAtual();
  exibirMsg();
});

window.addEventListener("resize", function () {
  if (this.innerWidth >= 768) {
    alternarSidebar(false);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    alternarSidebar(false);
    alternarModalMsg(false, "");
  }
});

adicionarEventoClique([botaoAbrirSidebar], function () {
  alternarSidebar(true);
});

adicionarEventoClique([fundoSidebar, botaoFecharSidebar], function () {
  alternarSidebar(false);
});

adicionarEventoClique([fundoModalMsg, botaoFecharModalMsg], function () {
  alternarModalMsg(false);
});
