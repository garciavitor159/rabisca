const form = document.querySelector("#form");
const nome = document.querySelector("#nome");
const senha = document.querySelector("#senha");
const botaoAlternarSenha = document.querySelector("#botao-alternar-senha");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const valNome = nome.value.trim();
    const valSenha = senha.value.trim();
    const senhaRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,30}$/);

    if (!validarValorObrigatorio(valNome, 30)) {
        alternarModalMsg(true, "Erro: O nome de usuário é obrigatório e deve conter até 30 caracteres.");

        limparCampo(nome);
        return;
    }

    if (!senhaRegExp.test(valSenha)) {
        alternarModalMsg(true, "Erro: A senha é obrigatória e deve conter entre 8 e 30 caracteres, incluindo uma letra minúscula, uma letra maiúscula, um número e um símbolo.");

        limparCampo(senha);
        return;
    }

    this.submit();
});

botaoAlternarSenha.addEventListener("click", function () {
    const iconeAlternarSenha = this.querySelector(".bi");
    senha.type = senha.type === "password" ? "text" : "password";
    iconeAlternarSenha.classList.toggle("bi-eye");
    iconeAlternarSenha.classList.toggle("bi-eye-slash");
});