function mostraMobileNascosto() {
  const mobileNascosto = document.getElementById("mobileNascosto");
  let header = document.getElementById("header");
  let main = document.getElementById("main");

  if (mobileNascosto.style.display === "none") {
    mobileNascosto.style.display = "block";
    header.style.display = "none";
    main.style.display = "none";
  } else {
    mobileNascosto.style.display = "none";
    header.style.display = "block";
    main.style.display = "block";
  }
}

function VaiAlCatalogo() {
  let nome = document.getElementById("inputNome").value;
  let prezzo = document.getElementById("inputPrezzo").value;
  let categoria = document.getElementById("inputCategoria").value;
  window.location.href = `catalogo.html?&categoria=${categoria}&prezzo=${prezzo}&nome=${nome}`;
}

function RitornaAlCatalogo() {
  window.location.href = "ad.html";
}




window.addEventListener("load", function () {
  let page = window.location.href.includes("catalogo.html") ? "catalogo.html" : "ad.html";

  if(window.location.href.includes(page)){
    let url = new URL(window.location.href);
    let nome = url.searchParams.get("nome")
    let prezzo = url.searchParams.get("prezzo")
    let categoria = url.searchParams.get("categoria")

    let prezzoMin = 0;
    let prezzoMax = Infinity; 
    
    if(prezzo =="0-100"){
      prezzoMax = 100;
    }else if(prezzo =="100-200"){
      prezzoMin = 100;
      prezzoMax = 200;
    } else if(prezzo =="200-500"){
      prezzoMin = 200;
      prezzoMax = 500;
    }else if(prezzo =="500"){
      prezzoMin = 500;
      prezzoMax = Infinity;
    }
    filtraCatalogo(nome, prezzoMin, prezzoMax, categoria);
  } else {
    console.log("non sono nel catalogo");
  }
})



function filtraCatalogo(nome, prezzoMin, prezzoMax, categoria) {

  fetch(`https://fakestoreapi.com/products`)
    .then((response) => response.json())
    .then((data) => {

    
      catalogoFiltrato = data.filter((prodotto) => {
        if ( prezzoMax != undefined && nome != undefined &&  categoria != undefined ) {
          return prodotto.price >= prezzoMin && prodotto.price <= prezzoMax && prodotto.title.includes(nome) &&  prodotto.category === categoria;
        }else if ( prezzoMax != undefined && nome != undefined &&  categoria === undefined ) {
          return prodotto.price >= prezzoMin && prodotto.price <= prezzoMax && prodotto.title.includes(nome);
        }else if ( prezzoMax != undefined && nome == undefined &&  categoria != undefined ) {
          return prodotto.price >= prezzoMin && prodotto.price <= prezzoMax && prodotto.category.includes(categoria);
        }else if ( prezzoMax != undefined && nome == undefined &&  categoria == undefined ) {
          return prodotto.price >= prezzoMin && prodotto.price <= prezzoMax;
        }
      });

      for (let i = 0; i < catalogoFiltrato.length; i++) {
        let prodotto = catalogoFiltrato[i];
     
        document.getElementById("ContainerProdottiCard").innerHTML += `
        <div onclick="descriptione(${i})" style="display: flex;"  id="detagli" class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        
        <div  class="ContainerCard">
        <div style="background-image: url(${prodotto.image});" class="boom"></div>
            <div class="LineCard"> </div>
            <div class="ContainerCardText">
                <h2 class="DescriptionProduct">${prodotto.title}</h2>
                <p class="PriceCard">€ ${prodotto.price}</p>
            </div>
            <button class="ButtonCard">Aggiungi al carello</button>
            <div id="magia${i++}" class="magia">${prodotto.description})</div>
        </div>
      </div>
        `;
    
      }
    })
    .catch((error) => console.log(error));
}


function descriptione(i) {
  var magiaDiv = document.getElementById("magia" + i);
  if (magiaDiv.style.display === "none") {
    magiaDiv.style.display = "block";
  } else {
    magiaDiv.style.display = "none";
  }
}