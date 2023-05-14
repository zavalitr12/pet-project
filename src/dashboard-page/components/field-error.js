export function fieldError() {
    const fieldErrorEl = document.createElement("span")
    fieldErrorEl.className = "fieldError"
    fieldErrorEl.innerText = "Поле не может быть пустым"
    return fieldErrorEl;
}