function validarCampo(campo) {
  return campo.checkValidity();
}

function validarValorObrigatorio(val, qtdCarac) {
  return val && val.length <= qtdCarac;
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
