// Elementos e variáveis globais
const botaoAlternarSenha = document.querySelector("#botao-alternar-senha");

// Eventos

// Evento de clique para o botão de alternar a visibilidade da senha
botaoAlternarSenha.addEventListener("click", (e) => {
  const iconeALternarSenha = e.currentTarget.querySelector(".bi");
  senha.type = senha.type === "password" ? "text" : "password";
  iconeALternarSenha.classList.toggle("bi-eye");
  iconeALternarSenha.classList.toggle("bi-eye-slash");
});
