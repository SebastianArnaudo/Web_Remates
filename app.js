const modal = document.getElementById("modalConteiner");
const closeButton = document.getElementById("closeButton");

const card = document.querySelectorAll(".lote , .lotev2, .lotev3");

card.forEach(card =>{
    card.addEventListener("click",()=> openModal());
});


function openModal(){
    modal.classList.remove("modalH");
}

closeButton.addEventListener("click",()=> closeModal());

function closeModal(){
    modal.classList.add("modalH");
}