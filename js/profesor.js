function cargar_cuestiones() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  var cuestiones = datos.cuestiones;
  var container = document.getElementById("container");
  var cuestion_nueva = document.getElementById("nueva_cuestion");
  console.log(typeof cuestion_nueva);
  for (cuestion of cuestiones) {
    var nueva_cuestion = crear_cuestion(cuestion);
    container.insertBefore(nueva_cuestion, cuestion_nueva);
  }
}

function crear_cuestion(cuestion) {
  console.log("cuestion: ", cuestion.clave);
  var card_div = document.createElement("div");
  card_div.className = "card";
  card_div.id = cuestion.clave;

  var card_body = document.createElement("div");
  card_body.className = "card-body";

  var link_cuestion = document.createElement("a");
  link_cuestion.href = "pagina_cuestion.html"; //TODO: cambiar este link!
  var mensaje = document.createTextNode(cuestion.enunciado);
  link_cuestion.appendChild(mensaje);

  var span_eliminar = document.createElement("span");
  span_eliminar.className = "delete-btn";
  var boton_eliminar = document.createElement("a");
  boton_eliminar.href = "inicio_profesor.html";
  boton_eliminar.className = "btn btn-danger";
  var mensaje_boton = document.createTextNode("Eliminar");
  boton_eliminar.appendChild(mensaje_boton);
  span_eliminar.appendChild(boton_eliminar);

  card_body.appendChild(link_cuestion);
  card_body.appendChild(span_eliminar);
  card_div.appendChild(card_body);

  return card_div;
}
