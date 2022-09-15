const firebaseConfig = {
    apiKey: "AIzaSyAReYVYdhaPNIUYLlMi4eKkmDyqZvgoFfM",
    authDomain: "natullie-ff69c.firebaseapp.com",
    projectId: "natullie-ff69c",
    storageBucket: "natullie-ff69c.appspot.com",
    messagingSenderId: "520379231934",
    appId: "1:520379231934:web:e9c99c241b0b2c612e78ef"
    
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  let nId = 0;


const listOil = document.getElementById("lista-oil")
const oilExists = document.body.contains(listOil)

const listCosmetics = document.getElementById("lista-cosmetics")
const cosmeticsExists = document.body.contains(listCosmetics)

const listdiffuser = document.getElementById("lista-diffuser")
const diffuserExists = document.body.contains(listCosmetics)

setTimeout(carregamento, 1000*4);

if(oilExists){
    db.collection("oils").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            nId++;
            console.log("Item "+nId)

            let htmlProducts ='';
            htmlProducts += '<div class="col-6 col-md-3 col-lg-3 p-2 px-md-3">'
            htmlProducts += '   <div onclick="activeModal('+nId+')" class="item">'
            htmlProducts += '       <div class="card align-items-center bg-light text-dark" >'
            htmlProducts += '           <img id="h-image-'+nId+'" class="card-img mx-auto" src="img/'+doc.data().image+'.png" alt="Imagem do card">'
            htmlProducts += '           <div style="margin-top:-45px" class="title align-bottom pb-2">'
            htmlProducts += '               <h5 class="text-center" id="h-name-'+nId+'">'+doc.data().name+'</h5>'
            htmlProducts += '           </div>'
            htmlProducts += '           <div class=" btnsell product-price shadow py-2 px-4 m-3"><a>Detalhes</a></div>'
            htmlProducts += '       </div>'
            htmlProducts += '   </div>'
            htmlProducts += '   <div class="d-none">'
            htmlProducts += '       <h2 id="h-subname-'+nId+'">'+doc.data().subname+'</h2>'
            htmlProducts += '       <p id="h-description-'+nId+'">'+doc.data().description+'</p>'
            htmlProducts += '       <p id="h-body-'+nId+'">'+doc.data().body+'</p>'
            htmlProducts += '       <p id="h-mind-'+nId+'">'+doc.data().mind+'</p>'
            htmlProducts += '       <p id="h-skin-'+nId+'">'+doc.data().skin+'</p>'
            htmlProducts += '   </div>'
            htmlProducts += '</div>'
            document.getElementById("lista-oil").innerHTML+=htmlProducts;
        });
    });

} else if(cosmeticsExists){
    db.collection("cosmetics").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            nId++;
            console.log("Item "+nId)

            let htmlProducts ='';
            htmlProducts += '<div class="col-6 col-md-3 col-lg-3 p-2 px-md-3">'
            htmlProducts += '   <div onclick="activeModal('+nId+')" class="item">'
            htmlProducts += '       <div class="card align-items-center bg-light text-dark" >'
            htmlProducts += '           <img id="h-image-'+nId+'" class="card-img mx-auto" src="img/'+doc.data().image+'.png" alt="Imagem do card">'
            htmlProducts += '           <div style="margin-top:-45px" class="title align-bottom pb-2">'
            htmlProducts += '               <h5 class="text-center" id="h-name-'+nId+'">'+doc.data().name+'</h5>'
            htmlProducts += '           </div>'
            htmlProducts += '           <div class=" btnsell product-price shadow py-2 px-4 m-3"><a>Detalhes</a></div>'
            htmlProducts += '       </div>'
            htmlProducts += '   </div>'
            htmlProducts += '   <div class="d-none">'
            htmlProducts += '       <h2 id="h-subname-'+nId+'">'+doc.data().subname+'</h2>'
            htmlProducts += '       <p id="h-description-'+nId+'">'+doc.data().description+'</p>'
            htmlProducts += '       <p id="h-body-'+nId+'">'+doc.data().body+'</p>'
            htmlProducts += '       <p id="h-mind-'+nId+'">'+doc.data().mind+'</p>'
            htmlProducts += '       <p id="h-skin-'+nId+'">'+doc.data().skin+'</p>'
            htmlProducts += '   </div>'
            htmlProducts += '</div>'
            document.getElementById("lista-cosmetics").innerHTML+=htmlProducts;
        });
    });
}

var modal = document.querySelector(".product-modal")
var bgm = document.querySelector(".bg-modal")

function activeModal(num){

    let name = document.getElementById("h-name-"+num).innerText;
    let image = document.getElementById("h-image-"+num).src.toString();
    let subname = document.getElementById("h-subname-"+num).innerText
    let description = document.getElementById("h-description-"+num).innerText
    let body = document.getElementById("h-body-"+num).innerText
    let mind = document.getElementById("h-mind-"+num).innerText
    let skin = document.getElementById("h-skin-"+num).innerText
    modal.classList.toggle("active")
    bgm.classList.toggle("bg-modal-atv")
    document.getElementById("product-name").innerHTML=name
    document.getElementById("product-subname").innerHTML='<i>'+subname+'</i>'
    document.getElementById("product-name2").innerHTML=name
    document.getElementById("product-subname2").innerHTML=subname


    document.querySelector(".eita").scrollIntoView()

    document.getElementById("product-description").innerHTML=description

    document.getElementById("product-body").innerHTML=body
    document.getElementById("product-mind").innerHTML=mind
    document.getElementById("product-skin").innerHTML=skin
}

function desactiveModal(){
    modal.classList.toggle("active")
    
    bgm.classList.toggle("bg-modal-atv")
}

function carregamento(){
    document.getElementById("loading").classList.add("none");
    console.log("oi")
}

function cadastrarParceiro() {
    let inputName = document.querySelector("#GET-name").value;

    let inputSubname = document.querySelector("#GET-subname").value;
    let inputImage = document.querySelector("#GET-image").value;

    let inputDescription = document.querySelector("#GET-description").value;

    let inputBody = document.querySelector("#GET-body").value;
    let inputMind = document.querySelector("#GET-mind").value;
    let inputSkin = document.querySelector("#GET-skin").value;

    let inputArea = document.querySelector("#GET-area").value;
    console.log(inputArea)

    db.collection(inputArea).doc(inputName).set({
        name: inputName,
        subname: inputSubname,
        image: inputImage,
        description: inputDescription,
        body: inputBody,
        mind: inputMind,
        skin: inputSkin
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}
