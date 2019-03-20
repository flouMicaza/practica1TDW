function cargar_cuestiones() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));

  var cuestiones = datos.cuestiones;
  var main_cuestiones = document.getElementById("cuestiones");
  for (let cuestion of cuestiones) {
    var nueva_cuestion = crear_cuestion(cuestion);
    main_cuestiones.appendChild(nueva_cuestion);
  }
}

function crear_cuestion(cuestion) {
  var card_div = document.createElement("div");
  card_div.className = "card";

  var card_body = document.createElement("div");
  card_body.className = "card-body";

  var link_cuestion = document.createElement("a");
  link_cuestion.href = "pagina_cuestion.html"; //TODO: cambiar este link!
  var mensaje = document.createTextNode(cuestion.enunciado);
  link_cuestion.appendChild(mensaje);
  link_cuestion.onclick = abrir_cuestion;
  link_cuestion.id = cuestion.clave;

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

//abrir_cuestion: setea la cuestion que se seleccionó para poder cargarla en la otra pagina.
function abrir_cuestion() {
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var cuestiones = datos.cuestiones;
  for (let cuestion of cuestiones) {
    if (cuestion.clave == this.id) {
      window.localStorage.setItem("cuestion_actual", JSON.stringify(cuestion));
      return;
    }
  }
}

//cargar_cuestion: funcion que hace que se carguen los datos de la cuestion que hemos apretado.
function cargar_cuestion() {
  var cuestion_actual = JSON.parse(
    window.localStorage.getItem("cuestion_actual")
  );
  var div_nombre = document.getElementById("nombre_cuestion");
  console.log(cuestion_actual.enunciado);
  var input_nombre = document.createElement("input");
  input_nombre.type = "text";
  input_nombre.className = "form-control";
  input_nombre.value = cuestion_actual.enunciado;
  input_nombre.required = true;

  div_nombre.insertBefore(input_nombre, div_nombre.childNodes[2]);
}
