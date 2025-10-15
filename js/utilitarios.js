const form = document.querySelector("#form");
const nomeUsuario = form.querySelector("#nomeUsuario");
const email = form.querySelector("#email");
const senha = form.querySelector("#senha");
const perguntaSeguranca = form.querySelector("#perguntaSeguranca");
const resposta = form.querySelector("#resposta");
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

const validarCampoObrigatorio = (campo, valCampo, maxCarac) => {
  return campo.checkValidity() && valCampo && valCampo.length <= maxCarac;
};

const exibirErro = (msgErr, campoErr) => {
  alternarModalAlerta(true, msgErr);
  limparCampo(campoErr);
};

const limparCampo = (campo) => {
  campo.value = "";
  campo.blur();
};

const validarEmail = (email, valEmail) => {
  const emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  return (
    email.checkValidity() && emailRegExp.test(valEmail) && valEmail.length <= 80
  );
};

const validarSenha = (senha, valSenha) => {
  const senhaRegExp = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,30}$/
  );

  return senha.checkValidity() && senhaRegExp.test(valSenha);
};

const validarPerguntaSeguranca = (perguntaSeguranca, valPerguntaSeguranca) => {
  return perguntaSeguranca.checkValidity() && validarID(valPerguntaSeguranca);
};

const validarID = (id) => {
  return Number.isInteger(id) && id >= 1;
};

const limparCampos = (campos) => {
  campos.forEach((el) => {
    limparCampo(el);
  });
};
