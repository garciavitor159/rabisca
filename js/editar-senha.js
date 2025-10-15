const senha = form.querySelector("#senha");

window.addEventListener("pageshow", async () => {
  const { sucesso, msg } = await enviarDados(
    {
      acao: "verificar_validou_pergunta_seguranca.php",
    },
    "verificar-validou-pergunta-seguranca.php",
    "GET"
  );

  if (!sucesso) {
    redirecionar(msg, "/index.html");
    return;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const valSenha = senha.value.trim();

  if (!validarSenha(senha, valSenha)) {
    exibirErro(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo. Por favor, tente novamente.",
      senha
    );

    return;
  }

  const { sucesso, dados, msg } = await enviarDados(
    {
      acao: "editar_senha",
      senha: valSenha,
    },
    "editar-senha.php",
    "PUT"
  );

  if (!sucesso) {
    const { redirecionar } = dados;

    if (redirecionar) {
      redirecionar(msg, "/index.html");
      return;
    }

    exibirErro(msg, senha);
    return;
  }

  redirecionar(msg, "/fazer-login.html");
});
