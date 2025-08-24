import { senha } from "./utilitarios.js";
const botaoAlternarSenha = document.querySelector("#botaoAlternarSenha");

botaoAlternarSenha?.addEventListener("click", function () {
  const iconeAlternarSenha = this?.querySelector("i");

  if (senha) {
    senha.type = senha.type === "password" ? "text" : "password";
    iconeAlternarSenha?.classList.toggle("bi-eye");
    iconeAlternarSenha?.classList.toggle("bi-eye-slash");
  }
});
