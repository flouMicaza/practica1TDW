function validacion() {
  //trae todos los datos
  var datos = JSON.parse(window.localStorage.getItem("datos"));
  //trae el user y contraseña
  var nombre = document.getElementById("user").value;
  var contrasena = document.getElementById("contrasena").value;
  alert("para: " + nombre + " " + contrasena);
  var usuario = getUsuario(datos, nombre, contrasena);
  alert(JSON.stringify(getUsuario(datos, nombre, contrasena)));
  alert("el usuario " + usuario);
  if (usuario == null) {
    alert("sin usuario");
    nombre.value = "";
    contrasena.value = "";
    var mi_div = document.createElement("div");
    var mi_small = document.createElement("small");
    var mensaje = document.createTextNode("Credenciales incorrectas");
    mi_small.appendChild(mensaje);
    mi_div.appendChild(mi_small);
    var form = document.getElementById("login");
    form.insertBefore(mi_div, form.childNodes[5]);
  } else {
    alert("con " + JSON.stringify(usuario));
    window.localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
    var login = document.getElementById("login");
    if (usuario.tipo == "maestro") {
      login.action = "./inicio_profesor.html";
    } else {
      login.action = "./inicio_alumno.html";
    }
    alert(login.action);
  }
  alert("fin: " + usuario != null);
  return usuario != null;
}

function getUsuario(datos, nombre, contrasena) {
  for (let usuario of datos.usuarios) {
    if (usuario.nombre == nombre && usuario.contrasena == contrasena) {
      return usuario;
    }
  }
  return null;
}
