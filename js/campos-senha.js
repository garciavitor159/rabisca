const botaoAlternaSenha = document.querySelector("#botao-alterna-senha");
const iconeAlternaSenha = document.querySelector("#botao-alterna-senha i");

botaoAlternaSenha.addEventListener("click", () => {
    campoSenha.type = campoSenha.type === "password" ? "text" : "password";
    alternaIcone(campoSenha.type === "password", iconeAlternaSenha, "bi-eye", "bi-eye-slash");
});