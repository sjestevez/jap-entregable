//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var itemsCarrito = {};
var itemActual;

function calcularTotales(){
    let camposPrecio = document.getElementsByClassName("total");
    let cantidad = document.getElementsByClassName("cantidad");
    let total = 0;
    let cantidadArticulos = 0;
    for (let i = 0; i < camposPrecio.length; i++){
        let subtotal = parseInt(itemsCarrito.articles[i].unitCost) * parseInt(cantidad[i].value);
        camposPrecio[i].innerHTML = subtotal;
        cantidadArticulos += parseInt(cantidad[i].value);
        if (itemsCarrito.articles[i].currency === "USD"){
            total += (subtotal * 40);
        } else {
            total += subtotal;
        }
    }
    document.getElementById("totalCompra").innerHTML = total;
    document.getElementById("cantidadArticulos").innerHTML = cantidadArticulos;
}

function mostrarItems(){
    let htmlContentToAppend = "";
    for(let i = 0; i < itemsCarrito.articles.length; i++){
        itemActual = itemsCarrito.articles[i];
        htmlContentToAppend +=`
        <div>
            <div class="row align-items-center list-group-item-action">
                <div class="col-2">
                    <img src="` + itemActual.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col-6">
                    <h2>` + itemActual.name + `</h2>
                </div>
                <div class="col-4">
                    <input class="cantidad" type="number" onchange="calcularTotales()" min="0" value="` + itemActual.count + `">
                    <h4>Precio unitario: `+ itemActual.currency + ` ` + itemActual.unitCost + `</h4>
                    <h4>Precio total: ` + itemActual.currency + ` <span class="total"></span></h4>
                </div>
            </div
        </div>
        `;
    }
    document.getElementById("carritoItems").innerHTML = htmlContentToAppend;
    calcularTotales();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        itemsCarrito = resultObj.data;

        mostrarItems();
    });
});

