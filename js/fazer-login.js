const form = document.querySelector("#form");
const email = form.querySelector("#email");
const senha = form.querySelector("#senha");
const tiposUsuario = form.querySelectorAll("input[name='tipo_usuario']");

const validarTipoUsuario = () => {
  return (
    (tiposUsuario[0].checked && tiposUsuario[0].value === "comum") ||
    (tiposUsuario[1].checked && tiposUsuario[1].value === "admin")
  );
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const valEmail = email.value.trim();
  const valSenha = senha.value.trim();

  if (!validarEmail(email, valEmail)) {
    exibirErro(
      "Erro: O e-mail é obrigatório, deve ser válido e conter até 80 caracteres. Por favor, tente novamente.",
      email
    );

    return;
  }

  if (!validarSenha(senha, valSenha)) {
    exibirErro(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo. Por favor, tente novamente.",
      senha
    );

    return;
  }

  if (!validarTipoUsuario()) {
    alternarModalAlerta(
      true,
      "Erro: Tipo de usuário inválido ou não selecionado. Por favor, tente novamente."
    );
    tiposUsuario[0].checked = true;
    return;
  }

  const { sucesso, dados, msg } = await enviarDados(
    {
      acao: "fazer_login",
      email: valEmail,
      senha: valSenha,
      tipoUsuario: tiposUsuario[0].checked ? "comum" : "admin",
    },
    "fazer-login.php",
    "POST"
  );

  if (!sucesso) {
    const { campoErr } = dados;
    alternarModalAlerta(true, msg);

    switch (campoErr) {
      case "email":
        limparCampo(email);
        break;
      case "senha":
        limparCampo(senha);
        break;
      case "tipoUsuario":
        tiposUsuario[0].checked = true;
      default:
        limparCampos([email, senha]);
        tiposUsuario[0].checked = true;
    }

    return;
  }

  redirecionar(
    msg,
    tiposUsuario[0].checked ? "painel-comum.html" : "painel-admin.html"
  );
});
