// Variáveis e funções importadas
import { senha, adicionarEventoClick } from "./utils.js";
const botaoAlternarSenha = document.querySelector("#botaoAlternarSenha");

adicionarEventoClick([botaoAlternarSenha], () => {
  const iconeAlternarSenha = botaoAlternarSenha.querySelector(".bi");
  senha.type = senha.type === "password" ? "text" : "password";
  iconeAlternarSenha.classList.toggle("bi-eye");
  iconeAlternarSenha.classList.toggle("bi-eye-slash");
});
