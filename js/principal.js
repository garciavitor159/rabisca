const html = document.documentElement;
const corpoPagina = document.body;
const botaoAlternarNavbar = document.querySelector("#botaoAlternarNavbar");
const iconeAlternarNavbar = botaoAlternarNavbar.querySelector("i");
const containerLinksNavbar = document.querySelector("#containerLinksNavbar");
const botaoAlternarTema = document.querySelector("#botaoAlternarTema");
const botaoAumentarFonte = document.querySelector("#botaoAumentarFonte");
const botaoDiminuirFonte = document.querySelector("#botaoDiminuirFonte");
const botaoFecharModalAlerta = modalAlerta.querySelector("button");
const containerAnoAtual = document.querySelector("#containerAnoAtual");

const alternarNavbar = (esconder) => {
  if (esconder) {
    containerLinksNavbar.style.height = "";
    containerLinksNavbar.classList.remove("exibindo");
    alternarIconeAlternarNavbar(esconder);
    return;
  }

  containerLinksNavbar.style.height = `${containerLinksNavbar.scrollHeight}px`;
  containerLinksNavbar.classList.add("exibindo");
  alternarIconeAlternarNavbar(esconder);
};

const alternarIconeAlternarNavbar = (voltarPadrao) => {
  setTimeout(() => {
    iconeAlternarNavbar.classList.toggle("bi-list", voltarPadrao);
    iconeAlternarNavbar.classList.toggle("bi-x-lg", !voltarPadrao);
  }, 500);
};

const alternarTamanhoFonte = (aumentar) => {
  let tamanhoFonteHTML = window.getComputedStyle(html);
  tamanhoFonteHTML = tamanhoFonteHTML.fontSize;
  tamanhoFonteHTML = Number(tamanhoFonteHTML.replace("px", ""));

  html.style.fontSize = `${
    aumentar ? ++tamanhoFonteHTML : --tamanhoFonteHTML
  }px`;

  localStorage.setItem("fontePreferida", tamanhoFonteHTML);

  if (containerLinksNavbar.classList.contains("exibindo")) {
    alternarNavbar(false);
  }
};

window.addEventListener("pageshow", async () => {
  const { sucesso, dados, msg } = await enviarDados(
    {
      acao: "consultar_ano_atual",
    },
    "consultar-ano-atual.php",
    "GET"
  );

  if (!sucesso) {
    console.error(msg);
    return;
  }

  const { anoAtual } = dados;
  containerAnoAtual.textContent = anoAtual;
});

window.addEventListener("pageshow", () => {
  alternarNavbar(true);
});

window.addEventListener("load", () => {
  const msg = localStorage.getItem("msg");

  if (!msg) {
    console.warn("Aviso: Mensagem não definida. Isto pode significar um erro.");
    return;
  }

  alternarModalAlerta(true, msg);
  localStorage.removeItem("msg");
});

window.addEventListener("load", () => {
  corpoPagina.classList.toggle(
    "tema-escuro",
    localStorage.getItem("temaPreferido") === "escuro"
  );
});

window.addEventListener("load", () => {
  html.style.fontSize = `${localStorage.getItem("fontePreferida")}px`;
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1200) {
    alternarNavbar(true);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    alternarModalAlerta(false, "");
  }
});

document.addEventListener("click", (e) => {
  if (!containerLinksNavbar.contains(e.target)) {
    alternarNavbar(true);
  }
});

botaoAlternarNavbar.addEventListener("click", (e) => {
  e.stopPropagation();
  alternarNavbar(containerLinksNavbar.classList.contains("exibindo"));
});

botaoAlternarTema.addEventListener("click", (e) => {
  e.stopPropagation();

  localStorage.setItem(
    "temaPreferido",
    corpoPagina.classList.toggle("tema-escuro") ? "escuro" : "claro"
  );
});

botaoAumentarFonte.addEventListener("click", (e) => {
  e.stopPropagation();
  alternarTamanhoFonte(true);
});

botaoDiminuirFonte.addEventListener("click", (e) => {
  e.stopPropagation();
  alternarTamanhoFonte(false);
});

[fundoModalAlerta, botaoFecharModalAlerta].forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    alternarModalAlerta(false, "");
  });
});
