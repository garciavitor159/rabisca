const fundoModalAlerta = document.querySelector("#fundoModalAlerta");
const modalAlerta = document.querySelector("#modalAlerta");
const txtModalAlerta = modalAlerta.querySelector("p");

const enviarDados = async (params, url, metodo) => {
  try {
    let resposta = null;

    switch (metodo) {
      case "GET":
        const paramsURL = new URLSearchParams(params).toString();
        url += `?${paramsURL}`;
        resposta = await axiosCustomizado.get(url);
        break;
      case "POST":
        resposta = await axiosCustomizado.post(url, params);
        break;
      case "PUT":
        resposta = await axiosCustomizado.put(url, params);
        break;
      case "DELETE":
        resposta = await axiosCustomizado.delete(url, {
          data: params,
        });

        break;
      default:
        return retornarResposta({
          sucesso: false,
          dados: {},
          msg: "Erro: Método de requisição inválido. Por favor, tente novamente mais tarde.",
        });
    }

    return retornarResposta(resposta.data);
  } catch (err) {
    return retornarResposta(err.response.data);
  }
};

const retornarResposta = (resposta) => {
  const { sucesso, dados, msg } = resposta;

  return {
    sucesso: sucesso || false,
    dados: dados || {},
    msg:
      msg ||
      "Erro: Não foi possível completar sua requisição. Por favor, tente novamente mais tarde.",
  };
};

const alternarModalAlerta = (deveExibir, msg) => {
  alternarExibicao([fundoModalAlerta, modalAlerta], deveExibir);

  if (!deveExibir && !msg) {
    setTimeout(() => {
      txtModalAlerta.textContent = "";
    }, 500);

    return;
  }

  txtModalAlerta.textContent = msg;
};

const alternarExibicao = (els, deveExibir) => {
  els.forEach((el) => {
    el.classList.toggle("escondido", !deveExibir);
  });
};
