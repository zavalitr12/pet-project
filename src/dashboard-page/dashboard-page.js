import "./style.css"

import tasks from "./tasks.json"
import users from "./users.json"
import { card } from "./components/dashboard-card.js"
import { createModal } from "./components/create-task-modal.js"
import { createTaskForm } from "./components/create-task-form.js"

export function dashboardPage() {
    const columns = [
        {
            id: 0,
            name: "To Do"
        },
        {
            id: 1,
            name: "In progress"
        },
        {
            id: 2,
            name: "Done"
        }
    ]
    const dashboardPage = document.createElement("div")
    const headerContainer = document.createElement("div")
    const createTask = document.createElement("button")
    createTask.className = "dashboard__createTask"
    createTask.innerText = "Добавить задание"
    const dashboardHeader = document.createElement("div")
    dashboardHeader.className = "dashboard__header"
    headerContainer.appendChild(createTask)
    headerContainer.appendChild(dashboardHeader)
    const body = document.querySelector("body")
    function clickCreateTask() {
        const createTaskModalEl = createModal(createTaskForm, closeBoxEvent, { users: users, tasks: tasks });
        body.appendChild(createTaskModalEl);
        function closeBoxEvent() {
            createTaskModalEl.remove();
        }
    }
    createTask.addEventListener("click", clickCreateTask)

    columns.forEach(function (column) {
        const nameEl = document.createElement("div")
        nameEl.innerText = column.name
        dashboardHeader.appendChild(nameEl)
        nameEl.className = "dashboard__header-name"
    })

    dashboardPage.appendChild(headerContainer)

    function rerenderCard(cardEl, task) {
        console.log(task)
        cardEl.remove()
        document.querySelector(`[data-statusid='${task.status}'][data-userid='${task.assignee}']`).appendChild(card(task))
    }

    users.forEach(function (user) {
        const userItem = document.createElement("div")
        const header = document.createElement("div")
        const userName = document.createElement("span")
        userName.innerText = user.name
        header.appendChild(userName)
        userItem.appendChild(header)
        const columnsContainer = document.createElement("div")
        columnsContainer.className = "user-item__columns-container"
        columns.forEach(function (column) {
            const columnItem = document.createElement("div")
            columnsContainer.appendChild(columnItem)
            columnItem.className = "user-item__column-item"
            columnItem.setAttribute("data-statusId", column.id)
            columnItem.setAttribute("data-userId", user.id)
            tasks.filter(function (task) {
                if (user.id === task.assignee && task.status === column.id) {
                    return true
                }
            }).forEach(function (task) {
                columnItem.appendChild(card(task, {
                    saveTask: rerenderCard
                }))
            })
        })
        userItem.appendChild(columnsContainer)
        dashboardPage.appendChild(userItem)
    })


    return dashboardPage
}