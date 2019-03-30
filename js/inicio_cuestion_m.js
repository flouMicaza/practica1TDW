//cargar_cuestion: funcion que hace que se carguen los datos de la cuestion que hemos apretado.
function cargar_cuestion() {
  var cuestion_actual = JSON.parse(
    window.localStorage.getItem("cuestion_actual")
  );
  var div_nombre = document.getElementById("enunciado");

  div_nombre.appendChild(crear_enunciado_cuestion(cuestion_actual));

  var switch_activar = document.getElementById("activacion_cuestion");
  switch_activar.checked = cuestion_actual.disponible;
  switch_activar.onchange = cambio_estado;
}

function crear_enunciado_cuestion(cuestion_actual) {
  var input_nombre = document.createElement("input");
  input_nombre.type = "text";
  input_nombre.className = "form-control";
  input_nombre.value = cuestion_actual.enunciado;
  input_nombre.required = true;
  input_nombre.id = "input_nombre";
  return input_nombre;
}

//funcion que toma el nuevo enunciado, comprueba que se haya modificado.
//Si se modificó el enunciado, lo setea en los datos de localstorage y en cuestion_actual.
function cambio_enunciado() {
  var cuestion_actual = JSON.parse(
    window.localStorage.getItem("cuestion_actual")
  );
  var nuevo_enunciado = window.document.getElementById("input_nombre").value;
  if (nuevo_enunciado != cuestion_actual.enunciado) {
    var datos = JSON.parse(window.localStorage.getItem("datos"));
    var cuestiones = datos.cuestiones;
    cuestiones = cambiar_cuestion(
      cuestiones,
      cuestion_actual.clave,
      nuevo_enunciado
    );
    datos.cuestiones = cuestiones;

    window.localStorage.setItem("datos", JSON.stringify(datos));
    cuestion_actual.enunciado = nuevo_enunciado;

    window.localStorage.setItem(
      "cuestion_actual",
      JSON.stringify(cuestion_actual)
    );
  }
}

function cambio_estado() {
  var cuestion_actual = JSON.parse(
    window.localStorage.getItem("cuestion_actual")
  );
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  var nueva_cuestion = cambiar_estado_cuestion(
    datos.cuestiones,
    cuestion_actual
  );
  datos.cuestiones = nueva_cuestion;
  window.localStorage.setItem("datos", JSON.stringify(datos));
  cuestion_actual.disponible = !cuestion_actual.disponible;
  window.localStorage.setItem(
    "cuestion_actual",
    JSON.stringify(cuestion_actual)
  );
  console.log(JSON.parse(window.localStorage.getItem("cuestion_actual")));
}

/*Funcion que busca la cuestion a cambiar y le cambia la clave.
 Genera un nuevo arreglo de cuestiones con las mismas que habian antes y con la que se modificó */
function cambiar_cuestion(cuestiones, id, nuevo_enunciado) {
  var nuevas_cuestiones = [];
  for (let cuestion of cuestiones) {
    if (cuestion.clave == id) {
      cuestion.enunciado = nuevo_enunciado;
    }
    nuevas_cuestiones.push(cuestion);
  }
  return nuevas_cuestiones;
}

function cambiar_estado_cuestion(cuestiones, cuestion_actual) {
  var nuevas_cuestiones = [];
  for (let cuestion of cuestiones) {
    if (cuestion.clave == cuestion_actual.clave) {
      cuestion.disponible = !cuestion.disponible;
    }
    nuevas_cuestiones.push(cuestion);
  }
  return nuevas_cuestiones;
}
