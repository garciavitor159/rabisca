// Variáveis e funções importadas
import { axiosPersonalizado } from "./custom.js";

// Elementos DOM e variáveis globais
export const form = document.querySelector("#form");
export const nome = document.querySelector("#nome");
export const email = document.querySelector("#email");
export const senha = document.querySelector("#senha");
export const perguntaSeguranca = document.querySelector("#perguntaSeguranca");
export const resposta = document.querySelector("#resposta");
export const titulo = document.querySelector("#titulo");
export const conteudo = document.querySelector("#conteudo");
export const overlayModalMsgs = document.querySelector("#overlayModalMsgs");
const modalMsgs = document.querySelector("#modalMsgs");
const txtModalMsgs = document.querySelector("#txtModalMsgs");

// Funções

// Função que adiciona o evento "pageshow" para o window
export const adicionarEventoPageshow = (callback) => {
  window.addEventListener("pageshow", callback);
};

// Função que alterna a visibilidade de vários elementos
export const alternarVisibilidade = (els, exibir) => {
  els.forEach((el) => {
    el.classList.toggle("escondido", !exibir);
  });
};

// Função que adiciona o evento "load" para o window
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

// Função que exibe mensagens de erro no console
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

// Função que adiciona o evento "keydown" para um elemento
export const adicionarEventoKeydown = (el, callback) => {
  el.addEventListener("keydown", callback);
};

// Função que adiciona o evento "click" para vários elementos
export const adicionarEventoClick = (els, callback) => {
  els.forEach((el) => {
    el.addEventListener("click", callback);
  });
};

// Função que adiciona o evento "submit" para um formulário
export const adicionarEventoSubmit = (form, callback) => {
  form.addEventListener("submit", callback);
};

// Função que limpa um valor
export const limparVal = (val) => {
  return val.trim();
};

// Função que valida os nomes
export const validarNome = (nome, valNome) => {
  const nomeRegExp = new RegExp(/^[\p{L}\s]+$/u);
  return validarCampo(nome) && nomeRegExp.test(valNome) && valNome.length <= 50;
};

// Função que aplica validações HTML5 nos campos
const validarCampo = (campo) => {
  return campo.checkValidity();
};

// Função que exibe mensagens de erro na tela
export const exibirErrTela = (msgErr, campoErr) => {
  alternarModalMsgs(true, msgErr);
  limparCampo(campoErr);
};

// Função que limpa um campo
export const limparCampo = (campo) => {
  campo.value = "";
  campo.blur();
};

// Função que valida os e-mails
export const validarEmail = (email, valEmail) => {
  const emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  return (
    validarCampo(email) && emailRegExp.test(valEmail) && valEmail.length <= 80
  );
};

// Função que valida as senhas
export const validarSenha = (senha, valSenha) => {
  const senhaRegExp = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/
  );

  return validarCampo(senha) && senhaRegExp.test(valSenha);
};

// Função que valida as perguntas de segurança
export const validarPerguntaSeguranca = (
  perguntaSeguranca,
  valPerguntaSeguranca
) => {
  const opcoes = ["0", "1", "2", "3"];

  return (
    validarCampo(perguntaSeguranca) && opcoes.includes(valPerguntaSeguranca)
  );
};

// Função que valida os campo obrigatórios
export const validarCampoObrigatorio = (campo, valCampo, maxCarac) => {
  return validarCampo(campo) && valCampo && valCampo.length <= maxCarac;
};

// Função que redireciona o usuário
export const redirecionar = (msg, url) => {
  localStorage.setItem("msg", msg);
  window.location.href = url;
};

// Função que limpa vários campos de uma vez
export const limparCampos = (campos) => {
  campos.forEach((campo) => {
    limparCampo(campo);
  });
};

// Função que converte um valor para número
export const converterNum = (val) => {
  return Number(val);
};

// Função que valida os IDs
export const validarID = (id) => {
  return Number.isInteger(id) && id >= 1;
};
