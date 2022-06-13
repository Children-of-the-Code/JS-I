// I don't need to define typesof a variable... js is loosely types
// types still exist, but variables can change types at any moment
// let spanContent = "abc";
// spanContent = 0;

let span = document.getElementById("ChangingSpan");
let addButton = document.getElementById("addButton");
let subtractButton = document.getElementById("subtractButton");
let checkoutButton = document.getElementById("checkoutButton");

let spanContent = 0;

function addButtonClick() {
    console.log("Button clicked?");
    spanContent = spanContent + 1;
    span.innerText = spanContent;
}
function subtractButtonClick() {
    if(spanContent > 0){
        spanContent = spanContent - 1;
        span.innerText = spanContent;
    }
}
function checkoutButtonClick() {
    if(spanContent > 0){
        alert("Purchased " + spanContent + " chimkin(s)");
        spanContent = 0;
        span.innerText = spanContent;
        
    }
}

addButton.onclick = addButtonClick;
subtractButton.onclick = subtractButtonClick;
checkoutButton.onclick = checkoutButtonClick;