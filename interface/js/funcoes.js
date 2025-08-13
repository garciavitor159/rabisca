// Função que valida os dados de um usuário
const validarDadosUsuario = (nome, email, senha) => {
  if (nome) {
    const valNome = limparVal(nome.value);

    if (!validarCampoObrigatorio(nome, valNome, 50)) {
      return definirRetorno(
        true,
        "O nome é obrigatório e deve ter no máximo 50 caracteres. Por favor, tente novamente.",
        nome
      );
    }
  }

  const valEmail = limparVal(email.value);
  const valSenha = limparVal(senha.value);
  const expRegEmail = new RegExp(/^[\w+%.\-]+@[\w+%.\-]+\.[a-zA-Z\d]{2,}$/);

  const expRegSenha = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/
  );

  if (
    !validarCampo(email) ||
    !expRegEmail.test(valEmail) ||
    valEmail.length > 80
  ) {
    return definirRetorno(
      true,
      "O e-mail é obrigatório, deve ser válido (nome@exemplo.br) e ter no máximo 80 caracteres. Por favor, tente novamente.",
      email
    );
  }

  if (!validarCampo(senha) || !expRegSenha.test(valSenha)) {
    return definirRetorno(
      true,
      "A senha é obrigatória e deve ter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo. Por favor, tente novamente.",
      senha
    );
  }

  return definirRetorno();
};

// Função que define o retorno da função que valida os dados de um usuário
const definirRetorno = (deuErro = false, msg = "", campo = null) => {
  return { estadoErro: deuErro, msgErro: msg, campoErro: campo };
};

// Função que limpa espaços em branco no começo e no final de um valor
const limparVal = (val) => val.trim();

// Função que valida um campo obrigatório
const validarCampoObrigatorio = (campo, valCampo, qtdCarac) =>
  validarCampo(campo) && !valCampo && valCampo.length <= qtdCarac;

// Função que executa validações HTML5
const validarCampo = (campo) => campo.checkValidity();

// Função que limpa um campo e o deixa focado em telas maiores ou iguais a 992px
const limparCampo = (campo) => {
  campo.value = "";
  if (window.innerWidth >= 1200) campo.focus();
};

// Função que converte um valor para número
const converterNum = (val) => Number(val);

// Função que valida um ID
const validarId = (valId) => Number.isInteger(valId) && valId >= 1;
