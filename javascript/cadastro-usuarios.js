const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#campo-nome");
const campoSenha = document.querySelector("#campo-senha");
const campoPerguntaSeguranca = document.querySelector("#campo-pergunta-seguranca");
const campoResposta = document.querySelector("#campo-resposta");

adicionaEventoPageshow(() => {
    limpaCampos([campoNome, campoSenha, campoPerguntaSeguranca, campoResposta]);
});

adicionaEventoSubmit(formulario, () => {
    validaDados({
        campoNome: campoNome,
        campoSenha: campoSenha,
        campoPerguntaSeguranca: campoPerguntaSeguranca,
        campoResposta: campoResposta
    }, "cadastrar-usuario", "cadastro-usuarios.php", "POST", "login.html");
});