import { card } from "./dashboard-card.js"

import { fieldError } from "./field-error.js";

export function createTaskForm(data, closeBoxEvent) {
    const {users, tasks} = data;

    const formEl = document.createElement("div")
    formEl.className = "task-form"

    let isNameFieldErrorAdd = false
    let isDescFieldErrorAdd = false
    let isAssigneeFieldErrorAdd = false

    const nameFieldError = fieldError();
    const descriptionFieldError = fieldError();
    const assigneeFieldError = fieldError();

    
    const nameTaskContainer = document.createElement("div")
    nameTaskContainer.className = "task-form__form-item"
    const nameTask = document.createElement("input")
    nameTaskContainer.appendChild(nameTask)
    nameTask.className = "nameTask"
    nameTask.setAttribute("placeholder", "Введите название задачи")
    let nameTaskValue = ""
    nameTask.value = nameTaskValue
    nameTask.addEventListener("change", function (event) {
        nameTaskValue = event.target.value
    })
    formEl.appendChild(nameTaskContainer)
    
    // create desc field ----------------------
    const descriptionTaskContainer = document.createElement("div")
    descriptionTaskContainer.className = "task-form__form-item";
    const descriptionTask = document.createElement("textarea")
    descriptionTaskContainer.appendChild(descriptionTask)
    descriptionTask.className = "descriptionTask"
    descriptionTask.setAttribute("placeholder", "Введите описание задачи")
    let descriptionTaskValue = ""
    descriptionTask.value = descriptionTaskValue
    descriptionTask.addEventListener("change", function (event) {
        descriptionTaskValue = event.target.value
    })
    formEl.appendChild(descriptionTaskContainer)
    // -----------------------------------

    let assigneeTaskValueId;
    
    // create assignee field ----------------------
    const containerAssigneeTask = document.createElement("div")
    const assigneeTask = document.createElement("input")
    assigneeTask.className = "assigneeTask"
    containerAssigneeTask.className = "task-form__form-item"
    assigneeTask.setAttribute("placeholder", "Выберите пользователя")
    let assigneeTaskValue = ""
    assigneeTask.value = assigneeTaskValue
    assigneeTask.addEventListener("change", function (event) {
        assigneeTaskValue = event.targe.value
    })
    containerAssigneeTask.appendChild(assigneeTask)
    assigneeTask.addEventListener("click", function () {
            const dropDowen = document.createElement("ul")
            containerAssigneeTask.appendChild(dropDowen)
            assigneeTask.addEventListener("blur", function () {
                setTimeout(() => {
                    dropDowen.remove();
                }, 200);
            })
            users.forEach(function (user) {
                const dropDowenItem = document.createElement("li")
                dropDowenItem.innerText = user.name
                dropDowen.appendChild(dropDowenItem)
                dropDowenItem.addEventListener("click", function () {
                    assigneeTask.value = user.name
                    assigneeTaskValueId = user.id
                });
            })
    })
    formEl.appendChild(containerAssigneeTask)
    // ---------------------------------------
    
    const pushCreate = document.createElement("button")
    pushCreate.className = "box-create-task__push-create"
    pushCreate.innerText = "Добавить"
    pushCreate.addEventListener("click", function () {
        if (isNameFieldErrorAdd === true) {
            isNameFieldErrorAdd = false
            nameTaskContainer.removeChild(nameFieldError)
            nameTask.style.cssText = 'color: black; border: 2px solid black'
        }
        if (nameTaskValue.length === 0) {
            nameTaskContainer.appendChild(nameFieldError)
            isNameFieldErrorAdd = true
            nameTask.style.cssText = 'color: red; border: 2px solid red'
        }
        if (isDescFieldErrorAdd === true) {
            isDescFieldErrorAdd = false
            descriptionTaskContainer.removeChild(descriptionFieldError)
            descriptionTask.style.cssText = 'color: black; border: 2px solid black'
        }
        if (descriptionTaskValue.length === 0) {
            descriptionTaskContainer.appendChild(descriptionFieldError)
            isDescFieldErrorAdd = true
            descriptionTask.style.cssText = 'color: red; border: 2px solid red'
        }
        if (isAssigneeFieldErrorAdd === true) {
            isAssigneeFieldErrorAdd = false
            containerAssigneeTask.removeChild(assigneeFieldError)
            assigneeTask.style.cssText = 'color: black; border: 2px solid black'
        }
        if (assigneeTaskValueId === undefined) {
            containerAssigneeTask.appendChild(assigneeFieldError)
            isAssigneeFieldErrorAdd = true
            assigneeTask.style.cssText = 'color: red; border: 2px solid red'
        }
        if (nameTaskValue.length === 0 || descriptionTaskValue.length === 0 || assigneeTaskValueId === undefined) {
            return
        }
        const newTask = {
            id: tasks.length + 1,
            status: 0,
            name: nameTaskValue,
            description: descriptionTaskValue,
            assignee: assigneeTaskValueId,
        }
        tasks.push(newTask)
        const columnPush = document.querySelector(`[data-statusId='${newTask.status}'][data-userId='${newTask.assignee}']`)
        columnPush.appendChild(card(newTask))
        closeBoxEvent();
    });
    formEl.appendChild(pushCreate)

    return formEl
} 