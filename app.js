const modal = document.getElementById("modalConteiner"); //Contenedor de todos los pop Ups
const modalL = document.getElementById("modalLote");    //Pop Up de tarjetas
const modalI = document.getElementById("modalInput");   //Pop Up de contraceña

const accessButton = document.getElementById("accessButton"); //Boton del nav para acceder a la vista de admin
const closeButton = document.querySelectorAll(".closeButton"); //Boton de cierre de Pop Up

const passIn = document.getElementById("passInput"); //Imput del Pop Up de ingreso
const passVe = document.getElementById("viewPass"); //Boton para cambiar la visivilidad del contenido
const passButton = document.getElementById("insertPass"); //Boton para enviar contraseña.
const passMessage = document.getElementById("passMessage"); //Mensaje de "contraseña incorrecta"

//El boton "accessButton" despliega el Pup Up para ingresar la clave de acceso
accessButton.addEventListener("click",()=> openPass());

function openPass(){
    modal.classList.remove("modalH");
    modalI.classList.remove("modalH");
}

//Al presionar el boton se cambia el tipo de imput, mostrando u ocultando su contenido
passVe.addEventListener("click",e =>{
    if(passIn.type === "password"){
        passIn.type = "text";
    } else {
        passIn.type = "password";
    }
});

const password = "pepe"; //Contraseña de prueba

passButton.addEventListener("click", () => access()); //Al presionar el boton se envia la contraseña para ingresar

function access(){
    if(passIn.value === password){
        closeModal();
    } else {
        passMessage.style.display = "flex";
        passIn.value = "";
    }
}

const card = document.querySelectorAll(".lote");
//Elementos del inventario disponibles


const mImg = document.getElementById("modalI");
const mLote = document.getElementById("loteModal");
const mPrecio = document.getElementById("precioModal");
const mDato = document.getElementById("datModal");

//Al clicar sobre una tarjeta la misma se despliega en un Pop Up que expande la informacion del Lote
card.forEach(card => {
    card.addEventListener("click", () => openCard(card));
});

function openCard(c) {
    modal.classList.remove("modalH");
    modalL.classList.remove("modalH");

    mImg.src = c.querySelector(".imagenLote img").src;
    mLote.textContent = c.querySelector(".nroLote").textContent;
    mPrecio.textContent = c.querySelector(".precio").textContent;
    mDato.textContent = c.querySelector(".desc").textContent;
}

//Cualquier elemento "closeButton" accede a la misma funcion
//Que cambia el display de lo elementos del modal para ocultarlos
closeButton.forEach(button =>{
    button.addEventListener("click",()=> closeModal());
});

function closeModal(){
    modal.classList.add("modalH");
    modalL.classList.add("modalH");
    modalI.classList.add("modalH");
    passIn.value = "";
    passIn.type = "password";
    passMessage.style.display = "none";
    mImg.src = "";
    mLote.textContent = "";
    mPrecio.textContent = "";
    mDato.textContent = "";
}