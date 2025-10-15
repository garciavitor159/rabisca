const botaoAlternarSenha = document.querySelector("#botaoAlternarSenha");
const iconeAlternarSenha = botaoAlternarSenha.querySelector("i");

botaoAlternarSenha.addEventListener("click", (e) => {
  e.stopPropagation();
  senha.type = senha.type === "password" ? "text" : "password";
  iconeAlternarSenha.classList.toggle("bi-eye");
  iconeAlternarSenha.classList.toggle("bi-eye-slash");
});
