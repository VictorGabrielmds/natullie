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

const listEdit = document.getElementById("lista-edit")
const isEditPage = document.body.contains(listEdit)

var modal = document.querySelector(".product-modal")
var bgm = document.querySelector(".bg-modal")


showLoadingScreenFor(4000)


if(oilExists){carregarOleos("lista-oil");
} else if(cosmeticsExists){ carregarCosmeticos("lista-cosmetics"); }

console.log(isEditPage)
if(isEditPage){
    carregarOleos("lista-edit");
    carregarCosmeticos("lista-edit");
}


////////////////////////// FUNÇÕES ////////////////////////////

function toggleModalOfDetails(num, ){
    loadDataInDetailsModal(num);
    modal.classList.toggle("active");
    bgm.classList.toggle("bg-modal-atv");  
}

function loadDataInDetailsModal(num){
    
    //Verifica se o modal já está aberto; Se sim, ele não carrega nada
    if(!(document.getElementById("h-name-"+num))){
        return
    }

    document.querySelector(".eita").scrollIntoView()
    let name = document.getElementById("h-name-"+num).innerText;
    let image = document.getElementById("h-image-"+num).src.toString();
    let subname = document.getElementById("h-subname-"+num).innerText
    let concept = document.getElementById("h-concept-"+num).innerText;
    let description = document.getElementById("h-description-"+num).innerText
    let keywords = document.getElementById("h-keywords-"+num).innerText
    let system = document.getElementById("h-system-"+num).innerText
    let body = document.getElementById("h-body-"+num).innerText
    let mind = document.getElementById("h-mind-"+num).innerText
    let skin = document.getElementById("h-skin-"+num).innerText


    document.getElementById("product-name").innerHTML=name
    document.getElementById("product-subname").innerHTML='<i>'+subname+'</i>'

    document.getElementById("product-concept").innerHTML=concept

    document.getElementById("product-description").innerHTML=description

    document.getElementById("product-keywords").innerHTML = keywords
    document.getElementById("product-system").innerHTML = system

    document.getElementById("product-body").innerHTML=body
    document.getElementById("product-mind").innerHTML=mind
    document.getElementById("product-skin").innerHTML=skin
}

function showLoadingScreenFor(timeInMili){
    setTimeout(toggleLoadingScreen, timeInMili);
}

function toggleLoadingScreen(){
    document.getElementById("loading").classList.add("none");
}

function cadastrarProduto() {
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

function carregarCosmeticos(list){
    db.collection("cosmetics").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            nId++;

            let htmlProducts ='';
            htmlProducts += '<div class="col-6 col-md-3 col-lg-3 p-2 px-md-3">'
            if(list == "lista-edit"){
                htmlProducts += '   <div onclick="toggleModalOfEdit('+nId+')" class="item">'
            } else{
                htmlProducts += '   <div onclick="toggleModalOfDetails('+nId+')" class="item">'
            }
            
            htmlProducts += '       <div class="card align-items-center bg-light text-dark" >'
            htmlProducts += '           <img id="h-image-'+nId+'" class="card-img mx-auto" src="img/'+doc.data().image+'.png" alt="Imagem do card">'
            htmlProducts += '           <div style="margin-top:-45px" class="title align-bottom pb-2">'
            htmlProducts += '               <h5 class="text-center" id="h-name-'+nId+'">'+doc.data().name+'</h5>'
            htmlProducts += '           </div>'
            htmlProducts += '           <div class="btnsell product-price shadow py-2 px-4 m-3"><a>Detalhes</a></div>'
            htmlProducts += '       </div>'
            htmlProducts += '   </div>'
            htmlProducts += '   <div class="d-none">'
            htmlProducts += '       <h2 id="h-subname-'+nId+'">'+doc.data().subname+'</h2>'
            htmlProducts += '       <p id="h-description-'+nId+'">'+doc.data().description+'</p>'
            htmlProducts += '       <p id="h-body-'+nId+'">'+doc.data().body+'</p>'
            htmlProducts += '       <p id="h-mind-'+nId+'">'+doc.data().mind+'</p>'
            htmlProducts += '       <p id="h-skin-'+nId+'">'+doc.data().skin+'</p>'
            htmlProducts += '       <p id="h-type-'+nId+'">cosmetics</p>'
            htmlProducts += '   </div>'
            htmlProducts += '</div>'
            document.getElementById(list).innerHTML+=htmlProducts;
        });
    });
}

function carregarOleos(list){
    db.collection("oils").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            nId++;

            let htmlProducts ='';
            htmlProducts += '<div class="col-6 col-md-3 col-lg-3 p-2 px-md-3">'
            if(list == "lista-edit"){
                htmlProducts += '   <div onclick="toggleModalOfEdit('+nId+')" class="item">'
            } else{
                htmlProducts += '   <div onclick="toggleModalOfDetails('+nId+')" class="item">'
            }   
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
            htmlProducts += '       <h2 id="h-concept-'+nId+'">'+doc.data().concept+'</h2>'
            htmlProducts += '       <p id="h-description-'+nId+'">'+doc.data().description+'</p>'
            htmlProducts += '       <p id="h-keywords-'+nId+'">'+doc.data().keywords+'</p>'
            htmlProducts += '       <p id="h-system-'+nId+'">'+doc.data().system+'</p>'
            htmlProducts += '       <p id="h-body-'+nId+'">'+doc.data().body+'</p>'
            htmlProducts += '       <p id="h-mind-'+nId+'">'+doc.data().mind+'</p>'
            htmlProducts += '       <p id="h-skin-'+nId+'">'+doc.data().skin+'</p>'   
            htmlProducts += '       <p class="h-type">oils</p>'
            htmlProducts += '   </div>'
            htmlProducts += '</div>'
            document.getElementById(list).innerHTML+=htmlProducts;
        });
    });
}

function toggleModalOfEdit(num){
    loadDataInEditModal(num);
    modal.classList.toggle("active");
    bgm.classList.toggle("bg-modal-atv");  
}

function loadDataInEditModal(num){

    if(!(document.getElementById("h-name-"+num))){
        return
    }   

    var docRef = db.collection("oils").doc(document.getElementById("h-name-"+num).innerText);

    docRef.get().then((doc) => {
        if (doc.exists) {
                document.querySelector(".eita").scrollIntoView()
                var name = document.getElementById("product-name-edit").value = doc.data().name
                var subname = document.getElementById("product-subname-edit").value = doc.data().subname
                var concept = document.getElementById("product-concept-edit").value = doc.data().concept
                var description = document.getElementById("product-description-edit").value = doc.data().description               
                var keywords = document.getElementById("product-keywords-edit").value = doc.data().keywords
                var system = document.getElementById("product-system-edit").value = doc.data().system
                var body = document.getElementById("product-body-edit").value = doc.data().body
                var mind = document.getElementById("product-mind-edit").value = doc.data().mind
                var skin = document.getElementById("product-skin-edit").value = doc.data().skin
                document.querySelector("#product-type").value = document.querySelector(".h-type").innerHTML
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            document.getElementById("product-name-edit").value="name"
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function updateData(){
    let inputName = document.querySelector("#product-name-edit").value;
    let inputSubname = document.querySelector("#product-subname-edit").value;
    let inputConcept = document.querySelector("#product-concept-edit").value;
    let inputDescription = document.querySelector("#product-description-edit").value;
    let inputKeywords = document.querySelector("#product-keywords-edit").value;
    let inputSystem = document.querySelector("#product-system-edit").value;
    let inputBody = document.querySelector("#product-body-edit").value;
    let inputMind = document.querySelector("#product-mind-edit").value;
    let inputSkin = document.querySelector("#product-skin-edit").value;
    let inputArea = document.querySelector("#product-type").value;

    console.log(inputSystem)
    db.collection(inputArea).doc(inputName).set({
        name: inputName,
        subname: inputSubname,
        concept: inputConcept,
        image: "oleo_",
        description: inputDescription,
        keywords: inputKeywords,
        system: inputSystem,
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