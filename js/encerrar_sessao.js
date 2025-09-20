window.addEventListener("pageshow", async function () {
    const { sucesso, msg } = await enviarDados({
        acao: "encerrar_sessao"
    }, "encerrar_sessao.php", "POST");

    if (sucesso) {
        return;
    }

    console.error(msg);
});