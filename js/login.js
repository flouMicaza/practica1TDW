function cargar() {
  var datos = {
    usuarios: [
      { clave: 1, nombre: "m", contrasena: "m", tipo: "maestro" },
      { clave: 2, nombre: "a", contrasena: "a", tipo: "aprendiz" },
      { clave: 3, nombre: "b", contrasena: "b", tipo: "aprendiz" },
      { clave: 4, nombre: "c", contrasena: "c", tipo: "aprendiz" }
    ],
    cuestiones: [
      {
        clave: c1,
        enunciado: "¿Que es el software?",
        soluciones: [
          {
            clave: d1,
            descripcion:
              "El software es la parte lógica de un sistema informático, o sea sin contemplar el hardware.",
            correcta: false
          },
          {
            clave: d2,
            descripcion:
              "El software es la información que el desarrollador se suministra al hardware para posteriormente manipular la información del usuario",
            correcta: true
          },
          {
            clave: d3,
            descripcion: "El software es el conjunto de los programas",
            correcta: false
          }
        ]
      },
      {
        clave: c2,
        enunciado: "¿Qué es la recursividad?",
        soluciones: [
          { clave: d1, descripcion: "es comida", correcta: false },
          { clave: d2, descripcion: "es todos los programas", correcta: true }
        ]
      }
    ]
  };

  window.localStorage.setItem("datos", JSON.stringify(datos));
  var x = JSON.parse(window.localStorage.getItem("datos"));
  alert(JSON.stringify(getUsuario(x, "m", "m")));
  alert(JSON.stringify(getUsuario(x, "a", "a")));
  alert(JSON.stringify(getUsuario(x, "b", "b")));
  alert(JSON.stringify(getUsuario(x, "c", "c")));
  alert(JSON.stringify(getUsuario(x, "x", "x")));
}

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
  for (usuario of datos.usuarios) {
    if (usuario.nombre == nombre && usuario.contrasena == contrasena) {
      return usuario;
    }
  }
  return null;
}
