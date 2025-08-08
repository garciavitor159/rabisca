function alternarVisibilidade(els, exibir) {
    els.forEach(function (el) {
        el.classList.toggle("esconder", !exibir);
    });
}

function validarValorObrigatorio(valor, qtdCarac) {
    return valor && valor.length <= qtdCarac;
}

function limparCampo(campo) {
    campo.value = "";

    if (window.innerWidth >= 992) {
        campo.focus();
    } else {
        campo.blur();
    }
}

function validarId(valId) {
    return !Number.isNaN(valId) && valId >= 1;
}