var product = {};
var comentarios = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showProductComments(){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < comentarios.length; i++){
        let comentarioActual = comentarios[i];
        comentarioPuntuacion = showProductScore(comentarioActual.score);

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <h5 class="mb-1">Calificación: `+ comentarioPuntuacion +`</h5><br>
                </div>
                <div class=col">
                    <div>
                        <p><strong>Descripción:</strong> ` + comentarioActual.description + `</p>
                        <p><strong>Usuario:</strong>  ` +comentarioActual.user + `</p>
                        <p><strong>Fecha comentario:</strong> ` + comentarioActual.dateTime + `</p>
                    </div>
                </div>
            </div>
        </div>`
    }

    document.getElementById("productComments").innerHTML = htmlContentToAppend;
}

function showProductScore(score){
    var comentarioEstrelas = "";

    switch (score){
        case 1:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 2:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 3:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 4:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 5:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`

            return comentarioEstrellas;
        break;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productPriceHTML = document.getElementById("productPrice");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj2){
        if (resultObj2.status === "ok")
        {
            comentarios = resultObj2.data;

            showProductComments();
        }
    });
});