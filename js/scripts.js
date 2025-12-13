const body = document.body;
const navbarToggleBtn = document.querySelector("#navbar-toggle-btn");
const navbarToggleIcon = document.querySelector("#navbar-toggle-btn i");
const navbarList = document.querySelector("#navbar-list");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const increaseFontBtn = document.querySelector("#increase-font-btn");
const decreaseFontBtn = document.querySelector("#decrease-font-btn");
const resetFontBtn = document.querySelector("#reset-font-btn");
const currentYearContainer = document.querySelector("#current-year-container");

const hideNavbar = () => {
    navbarList.style.height = "";
    navbarList.classList.remove("active");
    navbarToggleIcon.classList.remove("bi-x-lg");
    navbarToggleIcon.classList.add("bi-list");
};

const getCurrentYear = async () => {
    try {
        const response = await customAxios.get("get-current-year.php", { params: { action: "get-current-year" } });
        const { data } = response.data;
        const { currentYear } = data;
        currentYearContainer.textContent = currentYear;
    } catch (error) {
        const { msg = `Erro: Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde. Código HTTP: ${error.status}.` } = error.response.data;

        console.error(msg);
    }
};

const setPreferredTheme = () => {
    body.classList.toggle("dark-theme", localStorage.getItem("preferred-theme") === "dark");
};

const setPreferredFontSize = () => {
    body.style.fontSize = localStorage.getItem("preferred-font-size");
};

window.addEventListener("pageshow", () => {
    hideNavbar();
    getCurrentYear();
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1200) {
        hideNavbar();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    setPreferredTheme();
    setPreferredFontSize();
});

document.addEventListener("click", (e) => {
    if (e.target !== navbarList) {
        hideNavbar();
    }
});

navbarToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (navbarList.classList.contains("active")) {
        hideNavbar();
        return;
    }

    navbarList.style.height = `${navbarList.scrollHeight}px`;
    navbarList.classList.add("active");
    navbarToggleIcon.classList.remove("bi-list");
    navbarToggleIcon.classList.add("bi-x-lg");
});

themeToggleBtn.addEventListener("click", () => {
    localStorage.setItem("preferred-theme", body.classList.toggle("dark-theme") ? "dark" : "light");
});

increaseFontBtn.addEventListener("click", () => {
    let fontSize = Number.parseInt(window.getComputedStyle(body).fontSize.replace("px", ""));
    fontSize++;
    fontSize = `${fontSize}px`;
    body.style.fontSize = fontSize;
    localStorage.setItem("preferred-font-size", fontSize);
});

decreaseFontBtn.addEventListener("click", () => {
    let fontSize = Number.parseInt(window.getComputedStyle(body).fontSize.replace("px", ""));
    fontSize--;
    fontSize = `${fontSize}px`;
    body.style.fontSize = fontSize;
    localStorage.setItem("preferred-font-size", fontSize);
});

resetFontBtn.addEventListener("click", () => {
    const fontSize = "";
    body.style.fontSize = fontSize;
    localStorage.setItem("preferred-font-size", fontSize);
});