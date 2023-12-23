function vaiARegistrazione() {
    window.location.href = "./Registrazione.html";
}


function vaiAlCatalogo() {

    let nome = document.getElementById("inputNome").value;
    let prezzo = document.getElementById("inputPrezzo").value;
    let categoria = document.getElementById("inputCategoria").value;

    window.location.href = `Catalogo.html?nome=${nome}&prezzo=${prezzo}&categoria=${categoria}`;
}

function vaiAlCatalogoCategoria(category) {
    window.location.href = `catalogo.html?categoria=${category}`;
}

window.addEventListener("load", function () {
  
    if (window.location.href.includes("Catalogo.html")) {
        
        let url = new URL(window.location.href);
        let prezzo = url.searchParams.get("prezzo");
        let nome = url.searchParams.get("nome");
        let categoria = url.searchParams.get("categoria");
        let prezzoMin;
        let prezzoMax;

        if(prezzo === "") {   
            prezzoMin === "";
            prezzoMax === "";
        } else if (prezzo === "0-100") {
            prezzoMin = 0;
            prezzoMax = 100;
        } else if (prezzo === "100-200") {
            prezzoMin = 100;
            prezzoMax = 200;
        } else if (prezzo === "200-300") {
            prezzoMin = 200;
            prezzoMax = 300;
        } else if (prezzo === "300") {
            prezzoMin = 300;
            prezzoMax = Infinity;
        }

        filtraCatalogo(nome, prezzoMin, prezzoMax, categoria);
    } else {
        console.log("non sono nel catalogo");
    }

})


function filtraCatalogo(nome, prezzoMin, prezzoMax, categoria) {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("EffetoCaricamento").style.display = "none";
            let prodotti = data;
            console.log(prodotti)


            let prodottiFiltrati = prodotti.filter((prodotto) => {
                return (!prezzoMax || (prodotto.price >= prezzoMin && prodotto.price <= prezzoMax)) &&
                    (!nome || prodotto.title.includes(nome)) &&
                    (!categoria || prodotto.category === categoria);
            })
           visualizzaProdotti(prodottiFiltrati);
        }).catch((error) =>
            console.log(error));

}








function visualizzaProdotti(prodotti) {

    let container = document.getElementById("ContainerProdottiCard");

    for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];

        container.innerHTML += `
        <div  style="display: flex;"  id="detagli" class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        
        <div  class="ContainerCard">
        <div onclick="VaiAllProdotto(${prodotto.id})" style="background-image: url(${prodotto.image});" class="boom"></div>
            <div class="LineCard"> </div>
            <div  class="ContainerCardText">
                <h2 onclick="VaiAllProdotto(${prodotto.id})" class="DescriptionProduct">${prodotto.title}</h2>
                <p onclick="VaiAllProdotto(${prodotto.id})" class="PriceCard">€ ${prodotto.price}</p>
            </div>
            <div  onclick="descriptione(${i})" id="magia${i}" class="magia"><span style="font-weight: bold">Descrizione:</span> ${prodotto.description})</div>
    <button class="ButtonCard">Aggiungi al carello</button></div>
        </div>
      </div>
        `;

    }
}


