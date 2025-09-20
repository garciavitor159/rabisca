const botaoAlternarNavbar = document.querySelector("#botaoAlternarNavbar");
const iconeBotaoAlternarNavbar = botaoAlternarNavbar.querySelector("i");
const listaNavbar = document.querySelector("#listaNavbar");
const itensListaNavbar = listaNavbar.querySelectorAll("li");
const botaoFecharModalAlerta = document.querySelector("#botaoFecharModalAlerta");
const creditos = document.querySelector("#creditos");
const elAnoAtual = creditos.querySelector("span");

function ocultarNavbar() {
    listaNavbar.style.height = "";
    
    setTimeout(function () {
        iconeBotaoAlternarNavbar.classList.remove("bi-x-lg");
        iconeBotaoAlternarNavbar.classList.add("bi-list");
    }, 500);

    listaNavbar.classList.remove("exibindo");
}

window.addEventListener("pageshow", async function () {
    const { sucesso, dados, msg } = await enviarDados({
        acao: "consultar_ano_atual"
    }, "consultar_ano_atual.php", "GET");

    if (sucesso) {
        const { anoAtual } = dados;
        elAnoAtual.textContent = anoAtual;
        return;
    }

    console.error(msg);
});

window.addEventListener("pageshow", ocultarNavbar);

window.addEventListener("load", function () {
    const msg = this.localStorage.getItem("msg");

    if (msg !== null) {
        alternarModalAlerta(true, msg);
        this.localStorage.removeItem("msg");
        return;
    }

    console.warn("Aviso: Mensagem não definida.");
});

window.addEventListener("resize", function () {
    if (this.innerWidth >= 992) {
        ocultarNavbar();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        ocultarNavbar();
        alternarModalAlerta(false, "");
    }
});

document.addEventListener("click", function (e) {
    if (!listaNavbar.contains(e.target)) {
        ocultarNavbar();
    }
});

botaoAlternarNavbar.addEventListener("click", function (e) {
    e.stopPropagation();

    if (!listaNavbar.classList.contains("exibindo")) {
        let alturaListaNavbar = 0;

        itensListaNavbar.forEach(function (el) {
            alturaListaNavbar += el.offsetHeight;
        });

        listaNavbar.style.height = `${alturaListaNavbar / 10}rem`;

        setTimeout(function () {
            iconeBotaoAlternarNavbar.classList.remove("bi-list");
            iconeBotaoAlternarNavbar.classList.add("bi-x-lg");
        }, 500);

        listaNavbar.classList.add("exibindo");
        return;
    }

    ocultarNavbar();
});

[fundoModalAlerta, botaoFecharModalAlerta].forEach(function (el) {
    el.addEventListener("click", function () {
        alternarModalAlerta(false, "");
    });
});