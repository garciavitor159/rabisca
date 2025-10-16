const corpoPagina = document.body;

const botaoAlternarAreaLinksBarraNav = document.querySelector(
  "#botao-alternar-area-links-barra-nav"
);

const iconeAlternarAreaLinksBarraNav = document.querySelector(
  "#icone-alternar-area-links-barra-nav"
);

const areaLinksBarraNav = document.querySelector("#area-links-barra-nav");

const botaoAlternarTema = document.querySelector("#botao-alternar-tema");
const botaoAumentarFonte = document.querySelector("#botao-aumentar-fonte");
const botaoDiminuirFonte = document.querySelector("#botao-diminuir-fonte");
const botaoResetarFonte = document.querySelector("#botao-resetar-fonte");

const botaoFecharModalAlerta = document.querySelector(
  "#botao-fechar-modal-alerta"
);

const areaAnoAtual = document.querySelector("#area-ano-atual");
const msgRedirecionamento = localStorage.getItem("msg-redirecionamento");

const alternarAreaLinksBarraNav = (esconder) => {
  if (esconder) {
    areaLinksBarraNav.style.height = "";
    areaLinksBarraNav.classList.remove("exibindo");
  } else {
    areaLinksBarraNav.style.height = `${areaLinksBarraNav.scrollHeight}px`;
    areaLinksBarraNav.classList.add("exibindo");
  }

  alternarIconeAlternarAreaLinksBarraNav(esconder);
};

const alternarIconeAlternarAreaLinksBarraNav = (voltarPadrao) => {
  iconeAlternarAreaLinksBarraNav.classList.toggle("bi-list", voltarPadrao);
  iconeAlternarAreaLinksBarraNav.classList.toggle("bi-x-lg", !voltarPadrao);
};

const alternarTamanhoFonte = (aumentar, botaoAlternarTamanhoFonte) => {
  let tamanhoFonteCorpoPagina = consultarTamanhoFonteCorpoPagina();

  corpoPagina.style.fontSize = `${
    aumentar
      ? (tamanhoFonteCorpoPagina += 0.1)
      : (tamanhoFonteCorpoPagina -= 0.1)
  }px`;

  botaoAlternarTamanhoFonte.disabled = true;
  setTimeout(() => (botaoAlternarTamanhoFonte.disabled = false), 150);
  localStorage.setItem("tamanho-fonte", tamanhoFonteCorpoPagina);

  if (areaLinksBarraNav.classList.contains("exibindo"))
    alternarAreaLinksBarraNav(false);
};

const consultarTamanhoFonteCorpoPagina = () => {
  let tamanhoFonteCorpoPagina = window.getComputedStyle(corpoPagina);

  tamanhoFonteCorpoPagina = Number(
    tamanhoFonteCorpoPagina.fontSize.replace("px", "")
  );

  return tamanhoFonteCorpoPagina;
};

window.addEventListener("pageshow", async () => {
  const { sucesso, dados, msg } = await enviarDados(
    { acao: "consultar-ano-atual" },
    "consultar-ano-atual.php",
    "GET"
  );

  if (!sucesso) {
    console.error(msg);
    return;
  }

  const { anoAtual } = dados;
  areaAnoAtual.textContent = anoAtual;
});

window.addEventListener("pageshow", () => alternarAreaLinksBarraNav(true));

window.addEventListener("pageshow", () => {
  if (!msgRedirecionamento) alternarModalAlerta(false);
});

window.addEventListener("load", () => {
  if (!msgRedirecionamento) {
    console.warn(
      "Aviso: Mensagem de redirecionamento não definida. Isto pode significar um erro."
    );

    return;
  }

  alternarModalAlerta(true, msgRedirecionamento);
  localStorage.removeItem("msg-redirecionamento");
});

window.addEventListener("load", () =>
  corpoPagina.classList.toggle(
    "tema-escuro",
    localStorage.getItem("tema-escuro") === "escuro"
  )
);

window.addEventListener(
  "load",
  () =>
    (corpoPagina.style.fontSize = `${localStorage.getItem("tamanho-fonte")}px`)
);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1200) alternarAreaLinksBarraNav(true);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") alternarModalAlerta(false);
});

document.addEventListener("click", (e) => {
  if (!areaLinksBarraNav.contains(e.target)) alternarAreaLinksBarraNav(true);
});

botaoAlternarAreaLinksBarraNav.addEventListener("click", (e) => {
  e.stopPropagation();
  alternarAreaLinksBarraNav(areaLinksBarraNav.classList.contains("exibindo"));
});

botaoAlternarTema.addEventListener("click", (e) => {
  e.stopPropagation();

  localStorage.setItem(
    "tema-escuro",
    corpoPagina.classList.toggle("tema-escuro") ? "escuro" : "claro"
  );
});

botaoAumentarFonte.addEventListener("click", (e) => {
  e.stopPropagation();
  alternarTamanhoFonte(true, e.target);
});

botaoDiminuirFonte.addEventListener("click", (e) => {
  e.stopPropagation();
  alternarTamanhoFonte(false, e.target);
});

botaoResetarFonte.addEventListener("click", (e) => {
  e.stopPropagation();
  corpoPagina.style.fontSize = "initial";
  localStorage.setItem("tamanho-fonte", consultarTamanhoFonteCorpoPagina());
});

[fundoModalAlerta, botaoFecharModalAlerta].forEach((el) =>
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    alternarModalAlerta(false);
  })
);
