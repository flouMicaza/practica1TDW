function cargar_cuestiones() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  var cuestiones = datos.cuestiones;
  var main_cuestiones = document.getElementById("cuestiones");
  var cuestion_nueva = document.getElementById("nueva_cuestion");
  console.log(typeof cuestion_nueva);
  for (let cuestion of cuestiones) {
    var nueva_cuestion = crear_cuestion(cuestion);
    main_cuestiones.appendChild(nueva_cuestion);
  }
}

function crear_cuestion(cuestion) {
  var card_div = document.createElement("div");
  card_div.className = "card";
  card_div.id = cuestion.clave;

  var card_body = document.createElement("div");
  card_body.className = "card-body";
  var link_cuestion = document.createElement("a");
  link_cuestion.href = "pagina_cuestion.html"; //TODO: cambiar este link!
  var mensaje = document.createTextNode(cuestion.enunciado);
  link_cuestion.appendChild(mensaje);
  link_cuestion.onclick = abrir_cuestion;
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
function abrir_cuestion() {
  //agregar al local storage la cuestion que estoy viendo ahora y cargar la nueva pagina.
  // al carga la nueva pagina en onload lo que se hara es sacar la info de la cuestion y ahi mostrar la info necesaria.
  console.log("abrir cuestion!");
}

function cargar_cuestion() {
  console.log("se abrio la pagina de la cuestion!");
}
