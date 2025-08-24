export const fundoModalMsg = document.querySelector("#fundoModalMsg");
const modalMsg = document.querySelector("#modalMsg");
const txtModalMsg = document.querySelector("#txtModalMsg");
export const form = document.querySelector("#form");
export const nome = document.querySelector("#nome");
export const email = document.querySelector("#email");
export const senha = document.querySelector("#senha");

export function alternarVisibilidade(els, exibir) {
  for (let el of els) {
    el?.classList.toggle("esconder", !exibir);
  }
}

export async function enviarDados(dados, metodo) {
  try {
    let url = "php/processar.php";
    let resposta = null;

    if (metodo === "GET") {
      const params = new URLSearchParams(dados).toString();
      url += `?${params}`;
      resposta = await fetch(url);
    } else if (ehObjeto(dados)) {
      resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
    } else {
      return { deuErro: true, msg: "Erro: Dados inválidos." };
    }

    if (!resposta.ok) {
      throw new Error(resposta.status);
    }

    return await resposta.json();
  } catch (err) {
    return {
      deuErro: true,
      msg: `Erro: Não foi possível enviar os dados (${err.message}).`,
    };
  }
}

function ehObjeto(val) {
  return Boolean(
    typeof val === "object" && val !== null && !Array.isArray(val)
  );
}

export function alternarModalMsg(exibir = false, msg) {
  if (fundoModalMsg && modalMsg && txtModalMsg) {
    alternarVisibilidade([fundoModalMsg, modalMsg], exibir);

    if (exibir) {
      txtModalMsg.textContent = msg;
      return;
    }

    setTimeout(function () {
      txtModalMsg.textContent = "";
    }, 500);
  }
}

export function adicionarEventoClique(els, funcao) {
  for (let el of els) {
    el?.addEventListener("click", funcao);
  }
}

export function limparVal(val) {
  return typeof val === "string" ? val.trim() : "";
}

export function validarCampoObrigatorio(campo, valCampo, maxCarac) {
  if (typeof valCampo === "string") {
    const valCampoLimpo = limparVal(valCampo);

    return Boolean(
      validarExisteCampo(campo) &&
        validarCampo(campo) &&
        valCampoLimpo !== "" &&
        valCampoLimpo.length <= maxCarac
    );
  }

  return false;
}

function validarExisteCampo(campo) {
  return Boolean(campo);
}

function validarCampo(campo) {
  return Boolean(campo?.checkValidity());
}

export function mostrarErro(msgErro, campoErro) {
  alternarModalMsg(true, msgErro);

  if (validarExisteCampo(campoErro)) {
    limparCampo(campoErro);
  }
}

export function limparCampo(campo) {
  if (validarExisteCampo(campo)) {
    campo.value = "";
    campo?.blur();
  }
}

export function validarEmail(valEmail) {
  if (typeof valEmail === "string") {
    const valEmailLimpo = limparVal(valEmail);
    const expRegEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);

    return Boolean(
      validarExisteCampo(email) &&
        validarCampo(email) &&
        expRegEmail.test(valEmailLimpo) &&
        valEmailLimpo.length <= 80
    );
  }

  return false;
}

export function validarSenha(valSenha) {
  if (typeof valSenha === "string") {
    const valSenhaLimpo = limparVal(valSenha);

    const expRegSenha = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/
    );

    return Boolean(
      validarExisteCampo(senha) &&
        validarCampo(senha) &&
        expRegSenha.test(valSenhaLimpo)
    );
  }

  return false;
}

export function limparCampos(campos) {
  for (let el of campos) {
    if (!el) {
      continue;
    }

    limparCampo(el);
  }
}

export function redirecionar(msg, caminho) {
  if (!ehObjeto(msg)) {
    alternarModalMsg(true, "Erro: Mensagem inválida.");
    return;
  }

  localStorage.setItem("msg", JSON.stringify(msg));
  window.location.href = caminho;
}
