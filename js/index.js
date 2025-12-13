const modalBackdrop = document.querySelector("#modal-backdrop");
const modal = document.querySelector("#modal");
const modalTxt = document.querySelector("#modal p");
const closeModalBtn = document.querySelector("#modal button");
const redirectMsg = localStorage.getItem("redirect-msg");

const checkRedirectMsg = () => {
    if (!redirectMsg) {
        hideModal();
    }
};

const hideModal = () => {
    [modalBackdrop, modal].forEach((el) => {
        el.classList.add("hidden");
    });

    setTimeout(() => {
        modalTxt.textContent = "";
    }, 500);
};

const endSession = async () => {
    try {
        await axios.post("end-session.php", { action: "end-session" });
        console.log("Sessão encerrada com sucesso.");
    } catch (error) {
        const { msg = `Erro: Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde. Código HTTP: ${error.status}.` } = error.response.data;

        console.error(msg);
    }
};

const showModal = (msg) => {
    [modalBackdrop, modal].forEach((el) => {
        el.classList.remove("hidden");
    });

    modalTxt.textContent = msg;
};

window.addEventListener("pageshow", () => {
    checkRedirectMsg();
    endSession();
});

window.addEventListener("load", () => {
    if (!redirectMsg) {
        console.warn("Aviso: Mensagem de redirecionamento não definida. Isso pode indicar um erro.");
        return;
    }

    showModal(redirectMsg);
    localStorage.removeItem("redirect-msg");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideModal();
    }
});

[modalBackdrop, closeModalBtn].forEach((el) => {
    el.addEventListener("click", hideModal);
});