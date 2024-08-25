function validacionMinusculas(texto) {
  const regex = /^[a-z\s?!]+$/; 
  return regex.test(texto);
}

function validacionAcentos(texto) {
  const regex = /([àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ])/g;
  return regex.test(texto);
}

function mostrarValidacionAlerta(mensaje) {
  document.getElementById("validacionMensaje").textContent = mensaje;
  document.getElementById("validacionAlerta").style.display = "flex";
  document.getElementById("aceptarValidacionAlerta").style.display = "flex";
}

function cerrarValidacionAlerta() {
  document.getElementById("validacionAlerta").style.display = "none";
  document.getElementById("aceptarValidacionAlerta").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("botonCopiar").style.visibility = "hidden";
});

function actualizarResultado(texto) {
  let areaResultado = document.getElementById("resultadoTexto");
  areaResultado.value = texto;

  
  if (areaResultado.classList.contains("hidden")) {
    areaResultado.classList.remove("hidden");
  }
}

function procesarTexto(opcion) {
  let textoIngresado = document.getElementById("ingresoTexto").value;

  if (validacionMinusculas(textoIngresado) && !validacionAcentos(textoIngresado)) {
    let textoProcesado = opcion === 'encriptar' ? encriptar(textoIngresado) : desencriptar(textoIngresado);

    actualizarResultado(textoProcesado);
    document.getElementById("ingresoTexto").value = ""; // Limpia el área de texto de la izquierda

    document.getElementById("muñeco").style.visibility = "hidden";
    document.getElementById("mensajeIndicacion").style.visibility = "hidden";
    document.getElementById("mensajeIndicacionDos").style.visibility = "hidden";
    document.getElementById("botonCopiar").style.visibility = "visible";

    cerrarValidacionAlerta();
  } else {
    document.getElementById("resultadoTexto").value = "";
    mostrarValidacionAlerta("Ingresa sólo letras minúsculas y sin acentos");
  }
}

function encriptar(texto) {
  let llaves = [
      ["e", "enter"],
      ["i", "imes"],
      ["a", "ai"],
      ["o", "ober"],
      ["u", "ufat"]
  ];
  let textoEncriptado = texto.toLowerCase();
  for (let i = 0; i < llaves.length; i++) {
      textoEncriptado = textoEncriptado.replace(new RegExp(llaves[i][0], "g"), llaves[i][1]);
  }
  return textoEncriptado;
}

function desencriptar(texto) {
  let llaves = [
      ["enter", "e"],
      ["imes", "i"],
      ["ai", "a"],
      ["ober", "o"],
      ["ufat", "u"]
  ];
  let textoDesencriptado = texto;
  for (let i = 0; i < llaves.length; i++) {
      textoDesencriptado = textoDesencriptado.replace(new RegExp(llaves[i][0], "g"), llaves[i][1]);
  }
  return textoDesencriptado;
}

function mostrarAlerta(mensaje) {
  document.getElementById("mensajeAlerta").textContent = mensaje;
  document.getElementById("alertaCustom").style.display = "block";
  document.getElementById("aceptarAlertaCustom").style.display =  "block";
}

function cerrarAlerta() {
  document.getElementById("alertaCustom").style.display = "none";
  document.getElementById("aceptarAlertaCustom").style.display = "none";
}

function copiar() {
  let textoCopiado = document.getElementById("resultadoTexto").value;
  navigator.clipboard.writeText(textoCopiado);
  mostrarAlerta("¡Texto copiado!");
}


document.querySelector(".contenido_boton_encriptar").addEventListener("click", function() { procesarTexto('encriptar'); });
document.querySelector(".contenido_boton_desencriptar").addEventListener("click", function() { procesarTexto('desencriptar'); });


document.querySelector(".resultado").addEventListener('click', function() {
  document.querySelector("#resultadoTexto").value = "";
});
