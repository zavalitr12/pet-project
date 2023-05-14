export function createModal(component, closeBoxEvent, data) {
    // modal itself --------------
    const boxCreateTaskContainer = document.createElement("div")
    boxCreateTaskContainer.className = "boxCreateTaskContainer";
    boxCreateTaskContainer.addEventListener("click", function(){
        closeBoxEvent();
    })
    // -------------------------------------------------

    // container for external components
    const boxCreateTask = document.createElement("div")
    boxCreateTask.className = "body__boxCreateTask"
    boxCreateTask.addEventListener("click", function(event){
        event.stopPropagation();
    })
    boxCreateTaskContainer.appendChild(boxCreateTask)
    // ---------------------------

    // close modal btn ----------
    const closeBox = document.createElement("div")
    closeBox.className = "closeBox";
    closeBox.addEventListener("click", closeBoxEvent);
    boxCreateTask.appendChild(closeBox)
    // ---------------------------

    // external component
    const componentEl = component(data, closeBoxEvent);
    boxCreateTask.appendChild(componentEl);

    return boxCreateTaskContainer

}