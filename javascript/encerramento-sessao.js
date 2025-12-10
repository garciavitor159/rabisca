adicionaEventoPageshow(async () => {
    const { sucesso, mensagem } = await enviaDados({ acao: "encerrar-sessao" }, "encerramento-sessao.php", "POST");

    if (!sucesso) {
        console.error(mensagem);
    }
});