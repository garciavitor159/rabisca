import {
  fundoModalMsg,
  alternarVisibilidade,
  enviarDados,
  alternarModalMsg,
  adicionarEventoClique,
} from "./utilitarios.js";

const botaoAbrirSidebar = document.querySelector("#botaoAbrirSidebar");
const fundoSidebar = document.querySelector("#fundoSidebar");
const sidebar = document.querySelector("#sidebar");
const botaoFecharSidebar = document.querySelector("#botaoFecharSidebar");
const botaoFecharModalMsg = document.querySelector("#botaoFecharModalMsg");
const creditos = document.querySelector("#creditos");

function alternarSidebar(exibir = false) {
  if (fundoSidebar && sidebar) {
    alternarVisibilidade([fundoSidebar, sidebar], exibir);
  }
}

async function resgatarAnoAtual() {
  try {
    const { deuErro, msg, anoAtual } = await enviarDados(
      { acao: "resgatar_ano_atual" },
      "GET"
    );

    if (deuErro) {
      console.error(msg);
      return;
    }

    const elAnoAtual = creditos?.querySelector("span");

    if (elAnoAtual) {
      elAnoAtual.textContent = anoAtual;
    }
  } catch (err) {
    console.error(`Erro: Não foi possível resgatar o ano atual (${err}).`);
  }
}

function exibirMsg() {
  let msg = null;

  try {
    msg = JSON.parse(localStorage.getItem("msg"));
  } catch (err) {
    msg = null;
  }

  if (msg) {
    const { txt, deveExibir } = msg;

    if (deveExibir) {
      alternarModalMsg(true, txt);
    } else {
      console.error(txt);
    }

    localStorage.removeItem("msg");
  }
}

window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    this.location.reload();
  }
});

window.addEventListener("pageshow", function () {
  alternarSidebar();
});

window.addEventListener("load", function () {
  resgatarAnoAtual();
  exibirMsg();
});

window.addEventListener("resize", function () {
  if (this.innerWidth >= 768) {
    alternarSidebar();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    alternarSidebar();
    alternarModalMsg();
  }
});

if (botaoAbrirSidebar) {
  adicionarEventoClique([botaoAbrirSidebar], function () {
    alternarSidebar(true);
  });
}

if (fundoSidebar && botaoFecharSidebar) {
  adicionarEventoClique([fundoSidebar, botaoFecharSidebar], function () {
    alternarSidebar();
  });
}

if (fundoModalMsg && botaoFecharModalMsg) {
  adicionarEventoClique([fundoModalMsg, botaoFecharModalMsg], function () {
    alternarModalMsg();
  });
}
