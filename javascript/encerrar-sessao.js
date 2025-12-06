window.addEventListener("pageshow", async function () {
    const { sucesso, mensagem } = await enviarDados({ acao: "encerrar-sessao" }, "encerrar-sessao.php", "POST");

    if (!sucesso) {
        console.error(mensagem);
    }
});