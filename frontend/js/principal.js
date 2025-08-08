const botaoAbrirNavbarLateral = document.querySelector("#botao-abrir-navbar-lateral");
const fundoNavbarLateral = document.querySelector("#fundo-navbar-lateral");
const navbarLateral = document.querySelector("#navbar-lateral");
const botaoFecharNavbarLateral = document.querySelector("#botao-fechar-navbar-lateral");
const fundoModalMsg = document.querySelector("#fundo-modal-msg");
const modalMsg = document.querySelector("#modal-msg");
const txtModalMsg = document.querySelector("#txt-modal-msg");
const botaoFecharModalMsg = document.querySelector("#botao-fechar-modal-msg");

function alternarNavbarLateral(exibir = false) {
    alternarVisibilidade([fundoNavbarLateral, navbarLateral], exibir);
}

function alternarModalMsg(exibir = false, msg = "") {
    alternarVisibilidade([fundoModalMsg, modalMsg], exibir);
    txtModalMsg.textContent = msg;
}

window.addEventListener("pageshow", function () {
    alternarNavbarLateral();
});

window.addEventListener("resize", function () {
    if (this.innerWidth >= 992) {
        alternarNavbarLateral();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        alternarNavbarLateral();
        alternarModalMsg();
    }
});

botaoAbrirNavbarLateral.addEventListener("click", function () {
    alternarNavbarLateral(true);
});

[fundoNavbarLateral, botaoFecharNavbarLateral].forEach(function (el) {
    el.addEventListener("click", function () {
        alternarNavbarLateral();
    });
}); 

[fundoModalMsg, botaoFecharModalMsg].forEach(function (el) {
    el.addEventListener("click", function () {
        alternarModalMsg();
    });
});