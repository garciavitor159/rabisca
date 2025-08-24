export const fundoModalMsg = document.querySelector("#fundoModalMsg");
const modalMsg = document.querySelector("#modalMsg");
const txtModalMsg = document.querySelector("#txtModalMsg");

export const alternarVisibilidade = (els, exibir) => {
  for (let el of els) {
    if (!el) continue;
    el.classList.toggle("esconder", !exibir);
  }
};

export const enviarDados = async (dados, metodo) => {
  try {
    let url = "php/processar.php";
    let resposta = null;

    if (metodo === "GET") {
      url += `?${dados}`;
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

    if (!resposta.ok) throw new Error(resposta.status);
    return await resposta.json();
  } catch (err) {
    return { deuErro: true, msg: `Erro ao enviar os dados: ${err.message}.` };
  }
};

const ehObjeto = (val) =>
  typeof val === "object" && val !== null && !Array.isArray(val);

export const alternarModalMsg = (exibir = false, msg) => {
  if (fundoModalMsg && modalMsg && txtModalMsg) {
    alternarVisibilidade([fundoModalMsg, modalMsg], exibir);

    if (exibir) {
      txtModalMsg.textContent = msg;
      return;
    }

    setTimeout(() => (txtModalMsg.textContent = ""), 500);
  }
};

export const adicionarEventoClique = (els, funcao) => {
  for (let el of els) {
    if (!el) continue;
    el.addEventListener("click", funcao);
  }
};
