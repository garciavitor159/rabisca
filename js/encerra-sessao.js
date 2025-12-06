window.addEventListener("pageshow", async () => {
    const { sucesso, msg } = await enviaDados({ acao: "encerrar-sessao" }, "encerra-sessao.php", "POST");

    if (!sucesso) {
        console.error(msg);
    }
});