//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var itemsCarrito = {};
var itemActual;
var subtotalFinal;
var total;

function calcularTotales(){
    let camposPrecio = document.getElementsByClassName("total");
    let cantidad = document.getElementsByClassName("cantidad");
    subtotalFinal = 0;
    let cantidadArticulos = 0;
    for (let i = 0; i < camposPrecio.length; i++){
        let subtotal = parseInt(itemsCarrito.articles[i].unitCost) * parseInt(cantidad[i].value);
        camposPrecio[i].innerHTML = subtotal;
        cantidadArticulos += parseInt(cantidad[i].value);
        if (itemsCarrito.articles[i].currency === "UYU"){
            subtotalFinal += Math.ceil(subtotal / 40);
        } else {
            subtotalFinal += subtotal;
        }
    }
    document.getElementById("subtotalCompra").innerHTML = subtotalFinal;
    document.getElementById("cantidadArticulos").innerHTML = cantidadArticulos;
    document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.15);
}

function mostrarItems(){
    let htmlContentToAppend = "";
    for(let i = 0; i < itemsCarrito.articles.length; i++){
        itemActual = itemsCarrito.articles[i];
        htmlContentToAppend +=`
            <div class="row align-items-center list-group-item-action">
                <div class="col-1">
                    <img src="` + itemActual.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <h3>` + itemActual.name + `</h3>
                </div>
                <div class="col-2">
                    <h4>`+ itemActual.currency + ` ` + itemActual.unitCost + `</h4>
                </div>
                <div class="col-2">
                    <input class="cantidad" type="number" size="3" onchange="calcularTotales()" min="0" value="` + itemActual.count + `">
                    <button class="btn btn-outline-secondary" onclick="borrarArticulo(` + i + `)" type="button">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
                <div class="col-2">
                    <h4><strong>` + itemActual.currency + ` <span class="total"></span></strong></h4>
                </div>
            </div>
            <hr class="my-3">
        `;
    }
    document.getElementById("carritoItems").innerHTML = htmlContentToAppend;
    calcularTotales();
}

function borrarArticulo(num){
    itemsCarrito.articles.splice(num, 1);
    mostrarItems();
}

function calcularTotalFinal(num){
    switch(num){
        case 0:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.15);
        break;
        case 1:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.07);
        break;
        case 2:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.05);
        break;
        default:

    }
}

function noEnvio(){
    document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal);
}

function confirmarDireccion(){
    var direccion = document.getElementById("inputAddress").value;
    var direccion2 = document.getElementById("inputAddress2").value;
    var ciudad = document.getElementById("inputCity").value;
    var departamento = document.getElementById("inputState").value;
    var codigo_zip = document.getElementById("inputZip").value;

    if ((direccion === "") ||
        (direccion2 === "") ||
        (ciudad === "") ||
        (departamento === "Elegir...") ||
        (codigo_zip === "")){
            alert("Debe llenar todos los campos.");
        } else {
            $('#modalDireccion').modal('hide');
        }
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        itemsCarrito = resultObj.data;

        mostrarItems();
    });
});

