adicionarEventoPageshow(async () => {
    const params = { acao: "encerrar_sessao" };
    const url = "encerrar_sessao.php";
    const metodo = "POST";
    const { sucesso, dados, msg } = await enviarDados(params, url, metodo);

    if (sucesso) {
        return;
    }

    exibirErroConsole(msg);
});