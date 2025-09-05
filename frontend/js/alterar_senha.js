// Variáveis e funções importadas
import {
  form,
  senha,
  adicionarEventoLoad,
  adicionarEventoSubmit,
  limparVal,
  validarSenha,
  exibirErrTela,
  enviarDados,
  redirecionar,
} from "./utils.js";

adicionarEventoLoad(async () => {
  const params = { acao: "verificar_validou_pergunta_seguranca" };
  const url = "verificar_validou_pergunta_seguranca.php";
  const metodo = "GET";
  const { sucesso, msg } = await enviarDados(params, url, metodo);

  if (sucesso) {
    return;
  }

  // redirecionar(msg, "validar_pergunta_seguranca.html");
});

adicionarEventoSubmit(form, async (e) => {
  e.preventDefault();
  const valSenha = limparVal(senha.value);

  if (!validarSenha(senha, valSenha)) {
    exibirErrTela(
      "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
      senha
    );

    return;
  }

  const params = {
    acao: "alterar_senha",
    senha: valSenha,
  };

  const url = "alterar_senha.php";
  const metodo = "POST";
  const { sucesso, dados, msg } = await enviarDados(params, url, metodo);
  const { deveRedirecionar } = dados;

  if (sucesso || deveRedirecionar) {
    redirecionar(msg, "login.html");
    return;
  }

  exibirErrTela(msg, senha);
});
