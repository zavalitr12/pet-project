import { createModal } from "./create-task-modal.js"
import { taskInfoForm } from "./task-info-form.js"

export const card = function (task, events) {
    const card = document.createElement("div")
    const cardName = document.createElement("span")
    cardName.className = "cardName"
    cardName.innerText = task.id + " - " + task.name
    card.appendChild(cardName)
    card.className = "column-item__card"
    const body = document.querySelector("body")
    if (task.status == 0) {
        card.classList.add("statusForm0")
    }
    if (task.status == 1) {
        card.classList.add("statusForm1")
    }
    if (task.status == 2) {
        card.classList.add("statusForm2")
    }
    function onMouseDown() {
        if (task.status == 0) {
            card.classList.remove("statusForm0")
        }
        if (task.status == 1) {
            card.classList.remove("statusForm1")
        }
        if (task.status == 2) {
            card.classList.remove("statusForm2")
        }
        card.classList.add("column-item__card-moving")
        body.appendChild(card)
        function onMouseMove(mousemoveEvent) {
            card.style.top = mousemoveEvent.pageY - card.offsetHeight / 2 + "px"
            card.style.left = mousemoveEvent.pageX - card.offsetWidth / 2 + "px"
        }
        document.addEventListener("mousemove", onMouseMove)
        function onMouseUp(mouseUpEvent) {
            const mouseGlass = document.elementsFromPoint(mouseUpEvent.pageX, mouseUpEvent.pageY)
            document.removeEventListener("mousemove", onMouseMove)
            const elemUnderMouse = mouseGlass.find(function (elem) {
                if (elem.className === "user-item__column-item") {
                    return true
                }
            })
            if (elemUnderMouse === undefined) {
                body.removeChild(card)
                const currentColumn =
                    document.querySelector(`[data-statusId='${task.status}'][data-userId='${task.assignee}']`)
                card.classList.remove("column-item__card-moving")
                currentColumn.appendChild(card)
            } else {
                body.removeChild(card)
                elemUnderMouse.appendChild(card)
                card.classList.remove("column-item__card-moving")
                task.status = Number(elemUnderMouse.getAttribute("data-statusId"))
                task.assignee = Number(elemUnderMouse.getAttribute("data-userId"))
                if (task.status == 0) {
                    card.classList.add("statusForm0")
                }
                if (task.status == 1) {
                    card.classList.add("statusForm1")
                }
                if (task.status == 2) {
                    card.classList.add("statusForm2")
                }
            }

            card.removeEventListener("mouseup", onMouseUp)
        }

        card.addEventListener("mouseup", onMouseUp)
    }
    cardName.addEventListener("mousedown", function (event) {
        event.stopPropagation()
    })
    cardName.addEventListener("click", function () {
        console.log(task)
        const taskModalContainer = createModal((data, closeBox) => taskInfoForm(data, closeBox, {
            saveTask: (event) => events["saveTask"](card, event.detail.task)
        }), () => { body.removeChild(taskModalContainer) }, { task })
        body.appendChild(taskModalContainer)

    })
    card.addEventListener("mousedown", onMouseDown)
    return card
}