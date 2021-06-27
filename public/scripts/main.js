import  Modal  from './modal.js'

const modal = Modal()
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')




const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(button =>{
    //adicionar a escuta
    button.addEventListener("click", handleClik)

})

const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    
    button.addEventListener("click", (event)=> handleClik(event, false))
})



function handleClik(event,  check = true){
        event.preventDefault()
        const slug = check? "check": "delete"

        modalTitle.innerHTML = check ? "Marcar como lida essa pergunta" : "Excluir essa pergunta"

        const roomId = document.querySelector("#room-id").dataset.id
        const questionId = event.target.dataset.id
        const form = document.querySelector(".modal form")

        form.setAttribute("action",`/rom/${roomId}/:question/${slug}`)

        modalDescription.innerHTML = check ? "Tem certeza que deseja marcar como lida essa pergunta": "Tem certeza que deseja excluir essa pergunta"
        modalButton.innerHTML = check ? "Sim, marcar como lida": "Sim, excluir"
        check? modalButton.classList.remove("red"):modalButton.classList.add("red")
        modal.open()
    }
    





