export const fundoModalMsg = document.querySelector("#fundoModalMsg");
const modalMsg = document.querySelector("#modalMsg");
const txtModalMsg = document.querySelector("#txtModalMsg");
export const form = document.querySelector("#form");
export const nome = document.querySelector("#nome");
export const email = document.querySelector("#email");
export const senha = document.querySelector("#senha");

export function alternarVisibilidade(els, exibir) {
  for (let el of els) {
    el.classList.toggle("esconder", !exibir);
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
    } else {
      resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
    }

    if (!resposta.ok) {
      throw new Error(resposta.status);
    }

    return await resposta.json();
  } catch (err) {
    exibirErroConsole(`Erro: ${err}.`);
    return { deuErro: true, msg: "Erro: Não foi possível enviar os dados." };
  }
}

export function exibirErroConsole(msgErro) {
  console.error(msgErro);
}

export function alternarModalMsg(exibir, msg) {
  alternarVisibilidade([fundoModalMsg, modalMsg], exibir);

  if (exibir) {
    txtModalMsg.textContent = msg;
    return;
  }

  setTimeout(function () {
    txtModalMsg.textContent = "";
  }, 500);
}

export function adicionarEventoClique(els, funcao) {
  for (let el of els) {
    el.addEventListener("click", funcao);
  }
}

export function limparVal(val) {
  return val.trim();
}

export function validarCampo(campo) {
  if (campo.checkValidity()) {
    return true;
  }

  return false;
}

export function validarValObrigatorio(val) {
  if (val !== "") {
    return true;
  }

  return false;
}

export function validarMaxCarac(val, maxCarac) {
  if (val.length <= maxCarac) {
    return true;
  }

  return false;
}

export function exibirErro(msgErro, campoErro) {
  alternarModalMsg(true, msgErro);
  limparCampo(campoErro);
}

export function limparCampo(campo) {
  campo.value = "";
  campo.blur();
}

export function validarEmail(email) {
  const expRegEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);

  if (expRegEmail.test(email)) {
    return true;
  }

  return false;
}

export function validarSenha(senha) {
  const expRegSenha = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/
  );

  if (expRegSenha.test(senha)) {
    return true;
  }

  return false;
}

export function limparCampos(campos) {
  for (let el of campos) {
    limparCampo(el);
  }
}

export function redirecionar(msg, caminho) {
  localStorage.setItem("msg", JSON.stringify(msg));
  window.location.href = caminho;
}
