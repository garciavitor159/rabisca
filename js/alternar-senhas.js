const botaoAlternarSenha = document.querySelector("#botao-alternar-senha");
const iconeAlternarSenha = document.querySelector("#icone-alternar-senha");

botaoAlternarSenha.addEventListener("click", (e) => {
  e.stopPropagation();
  senha.type = senha.type === "password" ? "text" : "password";
  iconeAlternarSenha.classList.toggle("bi-eye");
  iconeAlternarSenha.classList.toggle("bi-eye-slash");
});
