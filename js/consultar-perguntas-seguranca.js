window.addEventListener("pageshow", async () => {
  const { sucesso, dados, msg } = await enviarDados(
    { acao: "consultar-perguntas-seguranca" },
    "consultar-perguntas-seguranca.php",
    "GET"
  );

  if (!sucesso) {
    redirecionar(msg, "index.html");
    return;
  }

  const { perguntasSeguranca } = dados;

  perguntasSeguranca.forEach((el) => {
    const { id, conteudo } = el;
    const cloneTemplate = template.content.cloneNode(true);
    const opPerguntaSeguranca = cloneTemplate.querySelector("option");
    opPerguntaSeguranca.value = id;
    opPerguntaSeguranca.textContent = conteudo;
    perguntaSeguranca.appendChild(opPerguntaSeguranca);
  });
});
