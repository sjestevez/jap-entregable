const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function cerrarSesion() {
  sessionStorage.removeItem("nombre_usuario");
  borrarCampos(1);
  window.location.href = "index.html";
}

function borrarCampos(opcion) {
  if (opcion) {
    sessionStorage.removeItem("datos_usuario");
  } else {
    var confirmacion = confirm("¿Borrar todos los campos (borrara también lo guardado)?");
    if (confirmacion) {
      var datos_formulario = document.getElementsByClassName("form-control");
      for (let i = 0; i < datos_formulario.length; i++) {
        let datos_formulario_actual = datos_formulario[i];
        if (datos_formulario_actual.id !== "idState") {
          datos_formulario_actual.value = "";
        } else {
          datos_formulario_actual.value = "Elegir...";
        }
      }
      sessionStorage.removeItem("datos_usuario");
    }
  }
}
  //Función que se ejecuta una vez que se haya lanzado el evento de
  //que el documento se encuentra cargado, es decir, se encuentran todos los
  //elementos HTML presentes.
  document.addEventListener("DOMContentLoaded", function (e) {
    var usuario_actual = sessionStorage.getItem("nombre_usuario");
    if (usuario_actual == undefined) {
      window.location.href = "index.html";
    } else {
      document.getElementById("usuario").innerText = usuario_actual;
    }
  });