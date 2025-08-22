import {
  fundoModal,
  alternarVisibilidade,
  enviarDados,
  alternarModal,
} from "./utilitarios.js";

const botaoAbrirSidebar = document.querySelector("#botaoAbrirSidebar");
const fundoSidebar = document.querySelector("#fundoSidebar");
const sidebar = document.querySelector("#sidebar");
const botaoFecharSidebar = document.querySelector("#botaoFecharSidebar");
const botaoFecharModal = document.querySelector("#botaoFecharModal");
const spanAnoAtual = document.querySelector("#spanAnoAtual");

function alternarSidebar(exibir) {
  alternarVisibilidade([fundoSidebar, sidebar], exibir);
}

async function resgatarAnoAtual(dados) {
  try {
    const { deuErro, msg, anoAtual } = await enviarDados(dados);

    if (deuErro) {
      console.error(msg);
      return;
    }

    spanAnoAtual.textContent = anoAtual;
  } catch (error) {
    console.error(error);
  }
}

function exibirMsg() {
  const msg = localStorage.getItem("msg");

  if (msg) {
    alternarModal(true, msg);
    localStorage.removeItem("msg");
  }
}

function adicionarEventoClique(els, callback) {
  for (let el of els) {
    el.addEventListener("click", callback);
  }
}

window.addEventListener("pageshow", function () {
  alternarSidebar(false);
});

window.addEventListener("load", function () {
  resgatarAnoAtual({ acao: "resgatar_ano_atual" });
  exibirMsg();
});

window.addEventListener("resize", function () {
  if (this.innerWidth >= 992) {
    alternarSidebar(false);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    alternarSidebar(false);
    alternarModal(false);
  }
});

botaoAbrirSidebar.addEventListener("click", function () {
  alternarSidebar(true);
});

adicionarEventoClique([fundoSidebar, botaoFecharSidebar], function () {
  alternarSidebar(false);
});

adicionarEventoClique([fundoModal, botaoFecharModal], function () {
  alternarModal(false);
});
