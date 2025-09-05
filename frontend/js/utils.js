// Elementos DOM e variáveis globais
import { axiosPersonalizado } from "./custom.js";
export const overlayModalMsgs = document.querySelector("#overlayModalMsgs");
const modalMsgs = document.querySelector("#modalMsgs");
const txtModalMsgs = document.querySelector("#txtModalMsgs");

// Funções

// Função que adiciona evento "pageshow" para o window
export const adicionarEventoPageshow = (callback) => {
  window.addEventListener("pageshow", callback);
};

// Função que alterna a visibilidade de elementos
export const alternarVisibilidade = (els, exibir) => {
  els.forEach((el) => {
    el.classList.toggle("escondido", !exibir);
  });
};

// Função que adiciona evento "load" para o window
export const adicionarEventoLoad = (callback) => {
  window.addEventListener("load", callback);
};

// Função que efetua as requisições assíncronas
export const enviarDados = async (params, url, metodo) => {
  try {
    let respostaHTTP = null;

    if (metodo === "GET") {
      const paramsURL = new URLSearchParams(params).toString();
      url += `?${paramsURL}`;
      respostaHTTP = await axiosPersonalizado.get(url);
    } else {
      respostaHTTP = await axiosPersonalizado.post(url, params);
    }

    return respostaHTTP.data;
  } catch (err) {
    const { sucesso, dados, msg } = err.response.data;

    return {
      sucesso: sucesso ?? false,
      dados: dados ?? {},
      msg: msg ?? "Erro: Não foi possível completar sua requisição.",
    };
  }
};

// Função que exibe uma mensagem de erro no console
export const exibirErrConsole = (msgErr) => {
  console.error(msgErr);
};

// Função que alterna a visibilidade do modal de mensagens
export const alternarModalMsgs = (exibir, msg) => {
  alternarVisibilidade([overlayModalMsgs, modalMsgs], exibir);

  if (msg) {
    txtModalMsgs.textContent = msg;
    return;
  }

  setTimeout(() => {
    txtModalMsgs.textContent = "";
  }, 500);
};

// Função que adiciona evento "keydown" para elementos
export const adicionarEventoKeydown = (el, callback) => {
  el.addEventListener("keydown", callback);
};

// Função que adiciona evento "click" para elementos
export const adicionarEventoClick = (els, callback) => {
  els.forEach((el) => {
    el.addEventListener("click", callback);
  });
};
