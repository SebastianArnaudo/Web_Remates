// === MODALES ===
const modal = document.getElementById("modalContainer"); //Contenedor de todos los pop Ups
const modalL = document.getElementById("modalLote");    //Pop Up de tarjetas
const modalI = document.getElementById("modalInput");   //Pop Up de contraceña
const modalC = document.getElementById("modalConfirm"); //Pop Up de confirmacion de salida del modo Admin
const modalF = document.getElementById("modalFormul"); //Pop Up de creacion de tarjeta
const modalV = document.getElementById("modalValid"); // Pop Up de validacion de numero de lote
const modalD = document.getElementById("modalDelete"); //Pop up de confirmacion borrado de lote

// === BOTONES ===
const accessButton = document.getElementById("accessButton"); //Boton del nav para acceder a la vista de admin
const closeButton = document.querySelectorAll(".closeButton"); //Boton de cierre de Pop Up
const exitButton =  document.getElementById("exitButton"); //Boton del nav para salir a la vista de admin
const confirmExitButton = document.getElementById("confirmExitButton"); //Boton para confirmar la salida del modo admin
const passButton = document.getElementById("insertPass"); //Boton para enviar contraseña
const passVe = document.getElementById("viewPass"); //Boton para cambiar la visivilidad del contenido
const addLote = document.getElementById("addLote"); //Boton del formulario para cargar los datos
const closeMesagge = document.getElementById("closeValidM"); //Boton para cerrar el mensaje de validacion
const accepOverW = document.getElementById("overwrite"); //Boton para aceptar la reescritura
const declineOverW = document.getElementById("noOverwrite"); //Boton para rechazar la reescritura
const acepptDelete = document.getElementById("accepDelete"); //Boton para aceptar el borrado de lote
const declineDelete = document.getElementById("noDelete"); //Boton para rechazar el borrado de lote
const leftSlideModal = document.getElementById("slideButtonLeft"); //Boton izquierdo del slide de pop de lote
const rightSlideModal = document.getElementById("slideButtonRight"); //Boton derecho del slide de pop de lote
const slideButtonFormulLeft = document.getElementById("slideButtonFormulLeft"); //Boton izquierdo del slide del formulario
const slideButtonFormulRight = document.getElementById("slideButtonFormulRight"); //Boton derecho del slide del formulario

// === INPUTS Y MENSAJES ===
const passIn = document.getElementById("passInput"); //Input del Pop Up de ingreso
const passMessage = document.getElementById("passMessage"); //Mensaje de "contraseña incorrecta"
const inputTitle = document.getElementById("inputTitle"); //Input titulo de lote
const inputNro = document.getElementById("inputNro"); //Input numero de lote
const inpuPrecio = document.getElementById("inputPre"); //Input precio de lote
const inputDes = document.getElementById("inputDes"); //Input descipcion de lote
const inputImg = document.getElementById("imgInput"); //Input foto de lote
const imgPreviewCont = document.getElementById("imgPreviewContainer"); //Contenedor de la vista previa
const imgPreview = document.getElementById("imgPreview"); //Vista previa de imagen ingresada
const validMessage = document.getElementById("validM"); //Mensaje del Pop Up de validacion

// === TARJETAS ===
const cardContainer = document.getElementById("loteContainer"); //Contenedor de las tarjetas de lote
const card = document.querySelectorAll(".lote"); //Elementos del inventario disponibles


// === ADMIN ===
const adminLote = document.getElementById("lotePlus");  //Tarjeta para crear lotes, solo visible para el administrador.

// === ELEMENTOS DE LA TARJETA EN MODAL ===
const mImg = document.getElementById("modalI"); //Elemento imagen del pop up de tarjetas
const mLote = document.getElementById("loteModal"); //Elemento numero de lote del pop up de tarjetas
const mPrecio = document.getElementById("precioModal"); //Elemento precio del pop up de tarjetas
const mDato = document.getElementById("datModal"); //Elemento descripcion del pop up de tarjetas

// === VARIABLES GLOBALES ===

let loteActual = null; //Variable global para almacenar lotes a seleccionado
let loteEncontrado = null; //Variable global para almacenar la posicion de un lote existente
let numLote = null; //Variable global para almacenar el numero del lote actual
let currentImageIndex = 0; // índice global para saber qué imagen mostrar
let imagesLote = []; // array global con las imágenes del lote abierto
let imagesForm //array global con las imagenes del formulario
let currentFormImage  // índice global para saber qué imagen mostrar

// === AUTENTICACION ===

const password = "pepe"; //Contraseña de prueba

accessButton.addEventListener("click",()=> openPass());
passButton.addEventListener("click", () => access()); 

//Al presionar el boton del input se cambia el tipo de mismo, mostrando u ocultando su contenido
passVe.addEventListener("click",e =>{
    if(passIn.type === "password"){
        passIn.type = "text";
    } else {
        passIn.type = "password";
    }
});

//El boton "accessButton" despliega el Pup Up para ingresar la clave de acceso
function openPass(){
    modal.classList.remove("modalHidden");
    modalI.classList.remove("modalHidden");
}

//Al presionar el boton "passButton" se envia la contraseña para ingresar
function access(){
    if(passIn.value === password){
        toggleAdmineMode();
    } else {
        passMessage.style.display = "flex";
        passIn.value = "";
    }
}

// === CAMBIOS DE MODO ===

exitButton.addEventListener("click",()=> confirmModal());
confirmExitButton.addEventListener("click",()=> toggleAdmineMode());

//Al presionar el boton del nav para salir del modo admin se activa el pop up de confirmacion
function confirmModal(){
    modal.classList.remove("modalHidden");
    modalC.classList.remove("modalHidden");
}

//Funcion que cambia el display de los elementos segun si se esta o no en modo admin
function toggleAdmineMode() {
    const adminSections = document.querySelectorAll(".adminButtons"); //Contenedor de los botones de las tarjetas solo visibles para el administrador

    if (adminLote.classList.contains("hidden")) {
        adminLote.classList.remove("hidden");
        adminSections.forEach(sec => sec.classList.remove("hidden"));
        accessButton.classList.add("hidden");
        exitButton.classList.remove("hidden");
    } else {
        adminLote.classList.add("hidden");
        adminSections.forEach(sec => sec.classList.add("hidden"));
        accessButton.classList.remove("hidden");
        exitButton.classList.add("hidden");
    }
    closeModal();
}

// === FORMULARIO DE CREACION ===
adminLote.addEventListener("click",()=> openForm());

//Al clicear la nueva tarjeta exclusiva del modo admin
//se despliega el pop up de creacion de lote
function openForm(){
    modal.classList.remove("modalHidden");
    modalF.classList.remove("modalHidden");
    if(modalF.classList.contains("editLote")){
        modalF.classList.remove("editLote");
        modalF.classList.add("newLote");
    }
}

inputImg.addEventListener("change", function() {
    imagesForm = Array.from(this.files).map(file => URL.createObjectURL(file));
    currentFormImage = 0;

    imgPreview.src = imagesForm[currentFormImage];
    imgPreviewCont.classList.remove("hidden");
    if(imagesForm.length > 1){
    slideButtonFormulLeft.classList.remove("slideButtonOff");
    slideButtonFormulRight.classList.remove("slideButtonOff");
    } else {
        slideButtonFormulLeft.classList.add("slideButtonOff");
        slideButtonFormulRight.classList.add("slideButtonOff");
    }

});

slideButtonFormulLeft.addEventListener("click",function(e){
    e.preventDefault();

    currentFormImage = (currentFormImage - 1 + imagesForm.length) % imagesForm.length;
    imgPreview.src = imagesForm[currentFormImage];
});
slideButtonFormulRight.addEventListener("click",function(e){
    e.preventDefault();

    currentFormImage = (currentFormImage + 1) % imagesForm.length;
    imgPreview.src = imagesForm[currentFormImage];
});

// === CREACION / EDICION DE LOTE ===

//addLote.addEventListener("click", ()=> getDat()); VERSION FINAL PERMITIENDO RECARGA
addLote.addEventListener("click", function(e){
    e.preventDefault();
        getDat();
});

//Obtiene la informacion de los inputs del formulario
function getDat(){
    const inputT = inputTitle.value;
    const inputN = inputNro.value;
    const inputP = inpuPrecio.value;
    const inputD = inputDes.value;
    let [message, error] = validNro(inputN);

    if(modalF.classList.contains("newLote")){
        if (error != "ok"){
            openValid(message);
            if(error != "Error 1"){
                vewbtnValid();
            }
        } else{
            const newL = createLote();
            fillLote(newL,inputT,inputN,inputP,inputD,imagesForm);
            closeModal();
        }
    } else if(modalF.classList.contains("editLote")){
        if (error != "ok"){
            openValid(message);
            if(error != "Error 1"){
                vewbtnValid();
            }
        } else{
            if(confirmChange(inputT,inputN,inputP,inputD,imagesForm)){
                message = "¿Desea guardar los cambios?";
                openValid(message);
                vewbtnValid();
            }else{
                closeModal();
            }
        }
    }
}

//Validacion de lote
function openValid(p){
    validMessage.textContent = p;
    modal.classList.remove("modalHidden");
    modalV.classList.remove("modalHidden");
}
function vewbtnValid(){
    accepOverW.classList.remove("hidden"); 
    declineOverW.classList.remove("hidden"); 
    closeMesagge.classList.add("hidden"); 
}
function restauBtnValid(){
    modalV.classList.add("modalHidden"); 
    accepOverW.classList.add("hidden");
    declineOverW.classList.add("hidden");
    closeMesagge.classList.remove("hidden");
}
function validNro(n){
    let p = "ok"; 
    let e = "ok";
    const num = Number(n);

    //Validaciones numericas simples
    if (n === "" || n == null){
        p = "Debe tener un número de lote";
        e = "Error 1"
    } else if (num < 1){
        p = "El número de lote debe ser mayor a '0'";
        e = "Error 1"
    } else if (!Number.isInteger(num)){
        p = "El número de lote debe ser un entero";
        e = "Error 1"
    } 

    //Validacion de numero unico
    if(modalF.classList.contains("newLote")){
        if (!noRepit(num)) {
            p = "Ese número de lote ya está en uso. ¿Desea sobrescribirlo?";        
            e = "Error 2"
        }
    } else if (modalF.classList.contains("editLote")) {
        const numActual = Number(loteActual.dataset.numero);
        if (num != numActual) { 
            if (!noRepit(num)) {
                p = "Ese número de lote ya está en uso. ¿Desea sobrescribirlo?";        
                e = "Error 2"
            }
        }
    }
    return [p, e];
}
function confirmChange(t,n,p,d,images){
     // Valores actuales en el lote
    let change = false;
    let titleLote = loteActual.querySelector(".title").textContent.trim();
    let numerLote = Number(loteActual.dataset.numero);
    let priceLote = loteActual.querySelector(".precio").textContent.replace("Precio base: $", "").trim();
    let descLote = loteActual.querySelector(".desc").textContent.trim();

    // Comparaciones
    if (t.trim() !== titleLote) change = true;
    if (Number(n) !== numerLote) change = true;
    if (p.trim() !== priceLote) change = true;
    if (d.trim() !== descLote) change = true;

    const loteImages = JSON.parse(loteActual.dataset.images || "[]");

    if (loteImages.length !== images.length) change = true;
    else {
        for (let j = 0; j < loteImages.length; j++){
            if (loteImages[j] !== images[j]) {
                change = true;
                break;
            }
        }
    }

    return change;
}
function noRepit(n){ 
    const numero = Number(n);
    const lotes = Array.from(cardContainer.querySelectorAll(".lote[data-numero]"));
    let unico= true;

    for(let i = 0; i < lotes.length; i++){
        let dataNum = lotes[i]; 
        if(numero == Number(dataNum.dataset.numero)){
            loteEncontrado = lotes[i];
            unico = false;
        } 
    } 
    if(unico){
        loteEncontrado = null; 
    }
    return unico;
}

closeMesagge.addEventListener("click",()=> restauBtnValid());

declineOverW.addEventListener("click",()=> restauBtnValid());

accepOverW.addEventListener("click", () => {
    const t = inputTitle.value;
    const n = Number(inputNro.value);
    const p = inpuPrecio.value;
    const d = inputDes.value;

    if (modalF.classList.contains("newLote")) {
        // --- CREACIÓN ---
        if (loteEncontrado) {
            // Número ya existe, se sobrescribir
            fillLote(loteEncontrado, t, n, p, d,imagesForm);
        } else {
            // Número libre, se crea nuevo lote
            const newL = createLote();
            fillLote(newL, t, n, p, d,imagesForm);
        }
    } 
    if(modalF.classList.contains("editLote")) {
        const numActual = Number(loteActual.dataset.numero);

        if (n === numActual) {
            // Número no cambió, se aplican cambios
            fillLote(loteActual, t, n, p, d,imagesForm);
        } else if (!loteEncontrado) {
            // Número cambiado a uno libre, se actualiza lote
            fillLote(loteActual, t, n, p, d,imagesForm);
        } else {
            // Número cambiado a uno ocupado, se elimina existente y se actualiza
            cardContainer.removeChild(loteEncontrado);
            fillLote(loteActual, t, n, p, d,imagesForm);
        }
    }

    closeModal();
    restauBtnValid();
});

//Creacion del lote
function createLote(){
    //Creacion de elementos
    const lote = document.createElement("div"); //contenedor principal del lote
    const imgCont = document.createElement("div"); //contenedor de la imagen del lote
    const imgLot = document.createElement("img"); //imagen del lote
    const titleCont = document.createElement("div"); //contenedor del titulo
    const title = document.createElement("h2"); //titulo/numero del lote
    const sNum = document.createElement("span"); //span donde se guarda el numero
    const sTitle = document.createElement("span"); //span donde se guarda el titulo
    const descCont = document.createElement("div"); //contenedor de los datos del lote
    const precio = document.createElement("h1"); //precio del lote
    const descLote = document.createElement("p"); //descripcion del lote
    const btnContain = document.createElement("div"); //contendeor de los botones de administracion
    const btnEd = document.createElement("button"); //boton de edicion del lote
    const imgEd = document.createElement("img");  //imagen de el boton de edicion
    const btnDe = document.createElement("button"); //boton de eliminacion del lote
    const imgDe = document.createElement("img"); //imagen del boton de eliminacion

    //Asignacion de clases e IDs
    lote.setAttribute("class","lote");
    // lote.setAttribute("data-numero", n);

    imgCont.setAttribute("class","imagenLote");
    imgLot.setAttribute("class","imgLote");

    titleCont.setAttribute("class","nroLote");
    sNum.setAttribute("class","num");
    sTitle.setAttribute("class","title");

    descCont.setAttribute("class","dato");
    precio.setAttribute("class","precio");
    descLote.setAttribute("class","desc");
    
    btnContain.setAttribute("class","adminButtons");
    btnEd.setAttribute("class","editButton");
    btnDe.setAttribute("class","deleteButton");


    //Asignacion de imagen
    imgEd.src = "Imgs/pencil.png";
    imgDe.src = "Imgs/trash.png";

    
    if(adminLote.classList.contains("hidden")){
        btnContain.classList.add("hidden");
    }

    //Estructuracion del lote
    imgCont.append(imgLot);
    descCont.append(precio,descLote);
    btnEd.append(imgEd);
    btnDe.append(imgDe);
    title.textContent = "Lote n°";
    title.append(sNum);             
    title.append(": ");            
    title.append(sTitle);   
    titleCont.append(title);
    btnContain.append(btnEd,btnDe);
    lote.append(imgCont,titleCont,descCont,btnContain);


    lote.imgLot = imgLot;
    lote.sNum = sNum;
    lote.sTitle = sTitle;
    lote.precio = precio;
    lote.descLote = descLote;

    return(lote);
}

//Dando contenido al lote
function fillLote(l,t,n,p,d,i){
    
    l.setAttribute("data-numero", n);
    // Guardamos todas las imágenes en un atributo HTML
    if (i && i.length > 0) {
        l.setAttribute("data-images", JSON.stringify(i));
    }

    // Selecciono los elementos internos del lote
    const img = l.querySelector(".imgLote");
    const sNum = l.querySelector(".num");
    const sTitle = l.querySelector(".title");
    const precio = l.querySelector(".precio");
    const desc = l.querySelector(".desc");


    if(i && i.length > 0) {
        l.dataImages = i;   // guardamos todas las URLs
        img.src = i[0];     // mostramos la primera en la tarjeta
        img.alt = t;
    } else {
        img.alt = t;
    }

    sNum.textContent =  n;
    sTitle.textContent = t;

    if (p === "") {
        precio.textContent = "Precio base: -";
    } else {
        precio.textContent = "Precio base: $" + p;
    }

    desc.textContent = d;

    insertLote(l,n);
}

//Ordenando el lote
function insertLote(lote,n){
    // Insertando en el contenedor de lotes
    // Obtener todos los lotes reales (con data-numero)
    const lotes = Array.from(cardContainer.querySelectorAll(".lote[data-numero]"));
    const nuevoNumero = Number(n);

    // Buscar índice donde insertar
    let insertIndex = lotes.findIndex(l => Number(l.dataset.numero) > nuevoNumero);

    // Nodo de referencia: si no hay índice, va antes del lotePlus
    if (insertIndex === -1) {
        cardContainer.insertBefore(lote, adminLote);
    } else {
        cardContainer.insertBefore(lote, lotes[insertIndex]);
    }
}

// === ABRIR, EDITAR Y BORRAR TARJETAS ===

//Al clicar sobre una tarjeta (que no sea "adminLote")
//la misma se despliega en un Pop Up que expande la informacion del Lote

//card.addEventListener("click", (e) => { 
//(en la version final el listener ira directamente en el lote, siempre que no sea adminLote)

cardContainer.addEventListener("click", (e) => {
    const lote = e.target.closest(".lote"); //Se revisa si se clico en algun componente de los lotes
    if (!lote) return; // No se clickeó un lote

    if (e.target.closest(".editButton")){
        openEditForm(lote);
    } else if (e.target.closest(".deleteButton")){
        removeLote(lote);
    } else {
        openCard(lote);
    }

});

//ABRIR
function openCard(c) {
    modal.classList.remove("modalHidden");
    modalL.classList.remove("modalHidden");
    loteActual = c;

    //Segun corresponde se va obteniendo la informacion 
    //de cada elemento de la tarjeta para reflejarla en el modal

    imagesLote = JSON.parse(c.dataset.images || "[]");
    currentImageIndex = 0;

    // Setear la primera imagen
    if (imagesLote.length > 0) {
        mImg.src = imagesLote[currentImageIndex];
        rightSlideModal.classList.remove("slideButtonOff");
        leftSlideModal.classList.remove("slideButtonOff");
    } else {
        mImg.src = c.querySelector(".imagenLote img").src;
        rightSlideModal.classList.add("slideButtonOff");
        leftSlideModal.classList.add("slideButtonOff");
    }

    mLote.textContent = c.querySelector(".nroLote").textContent;
    mPrecio.textContent = c.querySelector(".precio").textContent;
    mDato.textContent = c.querySelector(".desc").textContent;
}

leftSlideModal.addEventListener("click", () => {
    if (imagesLote.length === 0) return; // no hay imágenes
    currentImageIndex = (currentImageIndex - 1 + imagesLote.length) % imagesLote.length;
    mImg.src = imagesLote[currentImageIndex];
});

rightSlideModal.addEventListener("click", () => {
    if (imagesLote.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % imagesLote.length;
    mImg.src = imagesLote[currentImageIndex];
});

//EDITAR
function openEditForm(c){
    loteActual = c;
    document.querySelector("#formulLote").reset();

    if(modalF.classList.contains("newLote")){
        modalF.classList.remove("newLote");
        modalF.classList.add("editLote");
    }

    modal.classList.remove("modalHidden");
    modalF.classList.remove("modalHidden");
    imgPreviewCont.classList.remove("hidden");

    inputTitle.value = c.querySelector(".title").textContent;
    inputNro.value = c.querySelector(".num").textContent;
    inpuPrecio.value = c.querySelector(".precio").textContent.replace("Precio base: $", "");
    inputDes.value = c.querySelector(".desc").textContent;
    
    // Inicializar arreglo de imágenes desde el lote
    const loteImages = JSON.parse(c.dataset.images || "[]");
    imagesForm = loteImages.slice(); 
    
    // copia para manipular
    currentFormImage = 0;
    if(imagesForm.length > 0){
        imgPreview.src = imagesForm[0];
        if(imagesForm.length > 1){
            slideButtonFormulLeft.classList.remove("slideButtonOff");
            slideButtonFormulRight.classList.remove("slideButtonOff");
        }
    }
}

//BORRAR

function removeLote(c){
    loteActual = c;

    modal.classList.remove("modalHidden");
    modalD.classList.remove("modalHidden");
}

acepptDelete.addEventListener("click",()=>{
    numLote = Number(loteActual.dataset.numero);
    cardContainer.removeChild(loteActual);
    reorderLotes();
    closeModal();
});
declineDelete.addEventListener("click",()=>{
    closeModal();
})

function reorderLotes(){
    const lotes = Array.from(cardContainer.querySelectorAll(".lote[data-numero]"));

    lotes.forEach(lote => {
        const actual = Number(lote.dataset.numero);
        if (actual > numLote) {
            const nuevo = actual - 1;
            lote.dataset.numero = nuevo;
            lote.querySelector(".num").textContent = nuevo;
        }
    });
}

// === CERRAR TARJETA ===

//Cualquier elemento "closeButton" accede a la misma funcion
//Que cambia el display de lo elementos del modal para ocultarlos
closeButton.forEach(button =>{
    button.addEventListener("click",()=> closeModal());
});

function closeModal(){
    modal.classList.add("modalHidden");
    modalL.classList.add("modalHidden");
    modalI.classList.add("modalHidden");
    modalC.classList.add("modalHidden");
    modalF.classList.add("modalHidden");
    modalD.classList.add("modalHidden");
    passIn.value = "";
    passIn.type = "password";
    passMessage.style.display = "none";
    mImg.src = "";
    mLote.textContent = "";
    mPrecio.textContent = "";
    mDato.textContent = "";
    document.querySelector("#formulLote").reset();
    
    if (imgPreview) imgPreview.src = "";
    if (imgPreviewCont) imgPreviewCont.classList.add("hidden");
}