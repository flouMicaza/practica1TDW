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

  var soluciones_main = document.getElementById("soluciones");

  for (let solucion of cuestion_actual.soluciones) {
    var card_solucion = crear_solucion(solucion);
    soluciones_main.appendChild(card_solucion);
  }
}

function crear_solucion(solucion) {
  //form
  var sol_form = document.createElement("form");
  sol_form.onsubmit = editar_solucion;

  //divs interiores
  var div_form = document.createElement("div");
  div_form.className = "form-row";

  div_col_label = document.createElement("div");
  div_col_label.className = "col-auto";

  //label
  var label_sol = document.createElement("label");
  var texto = document.createTextNode("Solución");
  label_sol.appendChild(texto);
  div_col_label.appendChild(label_sol);

  //switch
  var switch_correcta = crear_switch(solucion);
  div_col_label.appendChild(switch_correcta);
  div_form.appendChild(div_col_label);

  //input
  var div_input = crear_input_solucion(solucion);
  div_form.appendChild(div_input);

  //botones
  var div_botones = crear_botones_solucion(solucion);
  div_form.appendChild(div_botones);
  sol_form.appendChild(div_form);

  return sol_form;
}

function crear_botones_solucion(solucion) {
  var div_botones = document.createElement("div");
  div_botones.className = "col-auto";

  var boton_editar = document.createElement("button");
  boton_editar.className = "btn btn-primary";
  boton_editar.type = "submit";
  var texto = document.createTextNode("Editar solución");
  boton_editar.appendChild(texto);
  div_botones.appendChild(boton_editar);
  return div_botones;
}

function crear_input_solucion(solucion) {
  var div_sol = document.createElement("div");
  div_sol.className = "col-7";
  var input_sol = document.createElement("input");
  input_sol.type = "text";
  input_sol.className = "form-control";
  input_sol.value = solucion.descripcion;
  input_sol.required = true;

  div_sol.appendChild(input_sol);
  return div_sol;
}
function crear_switch(solucion) {
  var div_switch = document.createElement("div");
  div_switch.className = "custom_control custom-switch";

  var input_switch = document.createElement("input");
  input_switch.type = "checkbox";
  input_switch.className = "custom-control-input";
  input_switch.id = "switch_" + solucion.clave;
  //input_switch.onchange = cambio_estado;
  input_switch.checked = solucion.correcta;
  div_switch.appendChild(input_switch);

  var label_switch = document.createElement("label");
  label_switch.className = "custom-control-label";
  var texto = document.createTextNode("Correcta");
  label_switch.appendChild(texto);
  label_switch.for = input_switch.id;
  div_switch.appendChild(label_switch);
  return div_switch;
}

function editar_solucion() {
  console.log("editando solucion");
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
