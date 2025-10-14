window.addEventListener("pageshow", async () => {
  const { sucesso, msg } = await enviarDados(
    {
      acao: "encerrar_sessao",
    },
    "encerrar-sessao.php",
    "POST"
  );

  if (!sucesso) {
    console.error(msg);
    return;
  }
});
