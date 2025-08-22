export const fundoModal = document.querySelector("#fundoModal");
const modal = document.querySelector("#modal");
const txtModal = document.querySelector("#txtModal");
export const form = document.querySelector("#form");
export const campoNome = document.querySelector("#campoNome");
export const campoEmail = document.querySelector("#campoEmail");
export const campoSenha = document.querySelector("#campoSenha");
export const botaoAlternarSenha = document.querySelector("#botaoAlternarSenha");

export function alternarVisibilidade(els, exibir) {
  for (let el of els) {
    el.classList.toggle("esconder", !exibir);
  }
}

export async function enviarDados(dados) {
  try {
    const resposta = await fetch("php/processar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(resposta.statusText);
    }

    return await resposta.json();
  } catch (error) {
    throw error;
  }
}

export function alternarModal(exibir, msg) {
  alternarVisibilidade([fundoModal, modal], exibir);

  if (exibir) {
    txtModal.textContent = msg;
    return;
  }

  setTimeout(function () {
    txtModal.textContent = "";
  }, 500);
}

export function limparVal(val) {
  return val.trim();
}

export function validarCampoObrigatorio(campo, val, qtdMaxCarac) {
  return validarCampo(campo) && val && val.length <= qtdMaxCarac;
}

function validarCampo(campo) {
  return campo.checkValidity();
}

export function mostrarErro(msg, campo) {
  alternarModal(true, msg);
  limparCampo(campo);
}

export function limparCampo(campo) {
  campo.value = "";
}

export function validarEmail(valEmail) {
  return (
    validarCampo(campoEmail) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valEmail) &&
    valEmail.length <= 80
  );
}

export function validarSenha(valSenha) {
  return (
    validarCampo(campoSenha) &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/.test(valSenha) &&
    valSenha.length >= 8 &&
    valSenha.length <= 30
  );
}

export function redirecionar(msg, caminho) {
  localStorage.setItem("msg", msg);
  window.location.href = caminho;
}

export function alternarSenha() {
  const iconeAlternarSenha = botaoAlternarSenha.querySelector(".bi");
  campoSenha.type = campoSenha.type === "password" ? "text" : "password";
  iconeAlternarSenha.classList.toggle("bi-eye");
  iconeAlternarSenha.classList.toggle("bi-eye-slash");
}
