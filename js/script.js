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

const alternarSidebar = (exibir = false) => {
  if (fundoSidebar && sidebar)
    alternarVisibilidade([fundoSidebar, sidebar], exibir);
};

const resgatarAnoAtual = async () => {
  try {
    const params = new URLSearchParams();
    params.set("acao", "resgatar_ano_atual");
    const { deuErro, msg, anoAtual } = await enviarDados(params, "GET");

    if (deuErro) {
      console.error(msg);
      return;
    }

    if (creditos) {
      const elAnoAtual = creditos.querySelector("span");
      if (elAnoAtual) elAnoAtual.textContent = anoAtual;
    }
  } catch (err) {
    console.error(`Erro: Não foi possível resgatar o ano atual (${err}).`);
  }
};

const exibirMsg = () => {
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
};

window.addEventListener("pageshow", () => alternarSidebar());

window.addEventListener("load", () => {
  resgatarAnoAtual();
  exibirMsg();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) alternarSidebar();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    alternarSidebar();
    alternarModalMsg();
  }
});

if (botaoAbrirSidebar) {
  adicionarEventoClique([botaoAbrirSidebar], () => alternarSidebar(true));
}

if (fundoSidebar && botaoFecharSidebar) {
  adicionarEventoClique([fundoSidebar, botaoFecharSidebar], () =>
    alternarSidebar()
  );
}

if (fundoModalMsg && botaoFecharModalMsg) {
  adicionarEventoClique([fundoModalMsg, botaoFecharModalMsg], () =>
    alternarModalMsg()
  );
}
