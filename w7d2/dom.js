let button = document.getElementById("clickButton");
let text = document.getElementById("text");
let list = document.getElementById("list");

button.onclick = updateText;
//what this really does is designate the onclick property as a function
// then, when the button is clicked, JS will end up doing something like
// button.onClickEvent(onclick){
    // onclick();
// }
// at this point, onclick represents a function updateText, so the onclickevent method will
// run whatever onclick is

function updateText() {
// emptying the list here would result in a single item list
    num++;
    text.innerText = "Text updated!";

    let newListItem = document.createElement("li");
    newListItem.innerText = "list item " + num;
    list.appendChild(newListItem);
    // emptying the list here would result in a no item list
}

var num = 0;

// hoisting: variable and function declarations are moved to the top of the file before the script runs
// var vs let?
// JS has gone through many different versions..
// let is relatively recent - the difference is in how js handles scope
// var is not 'block scoped' - it doesn't work like java where a variable inside of a block of code
// exists only within that block - but let does use block scope
// (basically, i recommend always using let)
// in JS, we have global scope (entire script), function scope (within a function, which is what we call methods in java
// block scope, which only let/const have, and lexical scope - if we have a function within a function, 
// the outer function can access the inner functions variables - see revpro example)

for(let i = 0; i < 10; i++){
    var x = 0;
}
x = 0;

// basically, please just use let

function funcabc(){
    console.log("something");
}

let a = funcabc;
// a();

function callback(functionToBeCalled){
    console.log("before something");
    functionToBeCalled();
}

callback(a);
// because we're able to pass functions as variables, functions can be passed as arguments
// to a function, which can later be called
// this is called a callback function
// this is actually how something like onclick worked! we set onclick to a function, which is later called
// when the click event happens

// let and const come from es6 - javascript version 6
// const is kind of like final in java - the value can not be changed

// loosely typed in js?
let myVariable = 5;
myVariable = true;
myVariable = "var";
myVariable = funcabc;
// this is all valid! because js is loosely typed, even though variables do have types,
// a variable can switch at any time and the type is not designated beforehand

variable1 = 5;
variable2 = "5";
// type coersion - when JS is dealing with non-matching types, it will change the type
// of one of them on the fly to make certain operations work
if(variable1 == variable2){
    console.log("equal");
}else{
    console.log("not equal");
}
// triple === does a comparison on both value and type
if(variable1 === variable2){
    console.log("equal");
}else{
    console.log("not equal");
}