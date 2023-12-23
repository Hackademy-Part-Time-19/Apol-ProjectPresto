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

function VaiAlCatalogoMen() {
  window.location.href = `catalogo.html?&categoria=men%27s%20clothing&prezzo=scegli&nome=`;
}

function VaiAlCatalogoWomen() {
  window.location.href = `catalogo.html?&categoria=women%27s%20clothing&prezzo=scegli&nome=`;
}

function VaiAlCatalogoKeri(categoria) {
  window.location.href = `catalogo.html?&categoria=${encodeURIComponent(
    categoria
  )}&prezzo=scegli&nome=`;
}

function RitornaAlCatalogo() {
  window.location.href = "ad.html";
}
function RitornaAllaHome() {
  window.location.href = "Home.html";
}

window.addEventListener("load", function () {
  let page = window.location.href.includes("catalogo.html")
    ? "catalogo.html"
    : "ad.html";

  if (window.location.href.includes(page)) {
    let url = new URL(window.location.href);
    let nome = url.searchParams.get("nome");
    let prezzo = url.searchParams.get("prezzo");
    let categoria = url.searchParams.get("categoria");

    let prezzoMin = 0;
    let prezzoMax = Infinity;

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
  } else if (window.location.href.includes("PagProdotto.html")) {
    let url = new URL(window.location.href);
    let idProdotto = url.searchParams.get("idProdotto");
    ottieniProdotto(idProdotto);
  } else {
    console.log("non sono nel catalogo");
  }
});

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
      <div  style="display: flex;"  id="detagli" class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
      
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

function descriptione(i) {
  var magiaDiv = document.getElementById("magia" + i);
  if (magiaDiv.style.display === "none") {
    magiaDiv.style.display = "block";
  } else {
    magiaDiv.style.display = "none";
  }
}

function VaiAllProdotto(id) {
  window.location.href = `PagProdotto.html?idProdotto=${id}`;
}

function ottieniProdotto(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      let prodotto = data;
      document.getElementById("TitoloPagProdotto").innerHTML = prodotto.title;
      document.getElementById(
        "ImgPagProdotto"
      ).style.backgroundImage = `url(${prodotto.image})`;
      document.getElementById("DesPagProdotto").innerHTML =
        prodotto.description;
      document.getElementById("PrezzoPagProdotto").innerHTML =
        prodotto.price + "€";

      console.log("funziona");
      filtraCatalogo2(nome, prezzoMin, prezzoMax, categoria);
    })
    .catch((error) => console.log(error));
}

function ottieniProdotti2() {
  fetch(`https://fakestoreapi.com/products`)
    .then((response) => response.json())
    .then((prodotti) => {
      prodotti.forEach((prodotto) => {
    
        document.getElementById("bumba").innerHTML += `
        <div  style="display: flex;padding: 0px;"  id="detagli" class="col-6	col-sm-4 col-md-3	col-lg-3	col-xl-2	col-xxl-2">  
        <div   class="ContainerCardProdotto2"> 
    <div onclick="VaiAllProdotto(${prodotto.id})"  style="background-image: url(${prodotto.image}); " class="boom"></div>
     <div style=" height: 1px;" class="LineCard"> </div>
     <div  class="ContainerCardText">
     <h2 onclick="VaiAllProdotto(${prodotto.id})" style=" font-size: 10px;margin-bottom:8px;" class="DescriptionProduct">${prodotto.title}</h2>
     <p onclick="VaiAllProdotto(${prodotto.id})"  class="PriceCard">${prodotto.price} €</p>
     </div>
        </div>
        </div>
        `;
      });
    })
    .catch((error) => console.log(error));
}
if (window.location.href.includes("PagProdotto.html")) {
  ottieniProdotti2();
}





const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const containerKER = document.getElementById('Kericontainer');

signUpButton.addEventListener('click', () => {
	containerKER.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	containerKER.classList.remove("right-panel-active");
});



function OpenLogin() {
  document.getElementById("RegistrazioneUtente").style.display = "flex";
 
}

function CloseLogin() {
  document.getElementById("RegistrazioneUtente").style.display = "none";
 
}