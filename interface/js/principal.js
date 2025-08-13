// Elementos e variáveis globais
const botaoAbrirBarraNavLateral = document.querySelector(
  "#botao-abrir-barra-nav-lateral"
);

const fundoBarraNavLateral = document.querySelector("#fundo-barra-nav-lateral");
const barraNavLateral = document.querySelector("#barra-nav-lateral");

const botaoFecharBarraNavLateral = document.querySelector(
  "#botao-fechar-barra-nav-lateral"
);

const fundoDialogo = document.querySelector("#fundo-dialogo");
const dialogo = document.querySelector("#dialogo");
const txtDialogo = document.querySelector("#txt-dialogo");
const botaoFecharDialogo = document.querySelector("#botao-fechar-dialogo");

// Funções

// Função que alterna a visibilidade da barra de navegação lateral
const alternarBarraNavLateral = (exibir = false) =>
  alternarVisibilidade([fundoBarraNavLateral, barraNavLateral], exibir);

// Função que alterna a visibilidade de elementos
const alternarVisibilidade = (els, exibir) =>
  els.forEach((el) => el.classList.toggle("esconder", !exibir));

// Função que alterna a visibilidade da caixa de diálogo
const alternarDialogo = (exibir = false, msg = "") => {
  alternarVisibilidade([fundoDialogo, dialogo], exibir);
  if (exibir && msg) txtDialogo.textContent = msg;
  else setTimeout(() => (txtDialogo.textContent = msg), 500);
};

/* 
  Função que adiciona evento de clique para os elementos que controlam a alternância da visibilidade da barra de navegação lateral e da caixa de diálogo
*/
const adicionarEventoAlternancia = (els, funcao) =>
  // Evento de clique para os elementos que alternam outros elementos
  els.forEach((el) => el.addEventListener("click", funcao));

// Eventos

// Evento para quando a página é mostrada
window.addEventListener("pageshow", () => alternarBarraNavLateral());

// Evento para quando o tamanho da página é alterado
window.addEventListener("resize", (e) => {
  if (e.currentTarget.innerWidth >= 768) alternarBarraNavLateral();
});

// Evento para quando uma tecla é pressionada
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    alternarBarraNavLateral();
    alternarDialogo();
  }
});

// Evento de clique para o botão que abre a barra de navegação lateral
botaoAbrirBarraNavLateral.addEventListener("click", () =>
  alternarBarraNavLateral(true)
);

adicionarEventoAlternancia(
  [fundoBarraNavLateral, botaoFecharBarraNavLateral],
  () => alternarBarraNavLateral()
);

adicionarEventoAlternancia([fundoDialogo, botaoFecharDialogo], () =>
  alternarDialogo()
);
