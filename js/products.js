//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let product = productsArray[i];
        htmlContentToAppend += `
        <div class="row">
            <div class="col-3">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ product.name +`</h4>
                    <p>Precio: ` + product.cost + ` ` + product.currency + ` 
                    <small class="text-muted">` + product.soldCount + ` vendidos</small>
                </div>
                <p class="mb-1">` + product.description + `</p>
            </div>
        </div>
    `
    

    document.getElementById("prod-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        productsArray = resultObj.data;
        showProductsList();
    });
});