function cargar_cuestiones() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var usuario = JSON.parse(window.localStorage.getItem("usuarioRegistrado"));
  var cuestiones = datos.cuestiones;
  var main_cuestiones = document.getElementById("cuestiones");
  for (let cuestion of cuestiones) {
    var nueva_cuestion = crear_cuestion(cuestion, usuario.tipo);
    main_cuestiones.appendChild(nueva_cuestion);
  }
}

function crear_cuestion(cuestion, tipo) {
  var card_div = document.createElement("div");
  card_div.className = "card";

  var card_body = document.createElement("div");
  card_body.className = "card-body";
  if (tipo == "maestro") {
    var link = "pagina_cuestion_profesor.html";
  } else {
    var link = "pagina_cuestion_alumno.html";
  }
  var link_cuestion = document.createElement("a");
  link_cuestion.id = "link_clave" + cuestion.clave;
  link_cuestion.href = link;
  var mensaje = document.createTextNode(cuestion.enunciado);
  link_cuestion.appendChild(mensaje);
  link_cuestion.onclick = () => {
    window.localStorage.setItem("cuestion_actual", JSON.stringify(cuestion));
  };

  card_body.appendChild(link_cuestion);

  //esto es solo si es un maestro.
  if (tipo == "maestro") {
    var span_eliminar = document.createElement("span");
    span_eliminar.className = "delete-btn";
    var boton_eliminar = document.createElement("a");
    boton_eliminar.id = "eliminar_" + cuestion.clave;
    boton_eliminar.href = "inicio.html";
    boton_eliminar.className = "btn btn-danger";
    boton_eliminar.onclick = eliminar_cuestion;
    var mensaje_boton = document.createTextNode("Eliminar");
    boton_eliminar.appendChild(mensaje_boton);
    span_eliminar.appendChild(boton_eliminar);

    card_body.appendChild(span_eliminar);
  }

  card_div.appendChild(card_body);

  return card_div;
}

//eliminar_cuestion: funcion que eliminar una cuestion completa del localStorage.
//Se edita el json y se vuelve a setear.
function eliminar_cuestion() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var id_cuestion = this.id.split("_")[1];
  nuevas_cuestiones = encontrar_cuestion(datos.cuestiones, id_cuestion);

  datos.cuestiones = nuevas_cuestiones;
  window.localStorage.setItem("datos", JSON.stringify(datos));
}

function encontrar_cuestion(cuestiones, id) {
  var nuevas_cuestiones = [];
  for (let cuestion of cuestiones) {
    if (cuestion.clave != id) {
      nuevas_cuestiones.push(cuestion);
    }
  }
  return nuevas_cuestiones;
}