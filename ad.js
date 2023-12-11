function mostraMobileNascosto() {
  const mobileNascosto = document.getElementById("mobileNascosto");
  let header=document.getElementById("header");
  let main=document.getElementById("main");
 
   if (mobileNascosto.style.display === "none") {
    mobileNascosto.style.display = "block";
    header.style.display = "none";
    main.style.display = "none";
  
  }else {
    mobileNascosto.style.display = "none";
    header.style.display = "block";
    main.style.display = "block";
  
  }

}
