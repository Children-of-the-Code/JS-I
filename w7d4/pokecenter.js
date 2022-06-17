const apiBaseURL = "https://pokeapi.co/api/v2/";
let cardDeck = document.getElementById("pokecards");
let nameButton = document.getElementById("pokemonButton");
let healSelect = document.getElementById("heal");
//allPokemon is an array of objects, which each contain a name and url
let allPokemon = [];
let nameInput = document.getElementById("nameInput");
let filteredPokemon = allPokemon;
let uppercase = false;



async function loadAllPokemon(){
    response = await fetch(apiBaseURL + "pokemon?limit=151");
    console.log(response);
    allPokemonJSON = await response.json();
    console.log(allPokemonJSON);
    console.log(allPokemonJSON.results);
    allPokemon = allPokemonJSON.results;
    console.log(allPokemon);
    refreshPokemon();
}
function refreshPokemon(){
    console.log(nameInput.value);
    filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(nameInput.value));
    filteredPokemon = filteredPokemon.sort(comparePokemonNames);
    console.log(filteredPokemon);
    cardDeck.innerHTML = "";
    for(let i = 0; i < filteredPokemon.length; i++){
        let pokeCard = document.createElement("div");
        pokeCard.classList.add("card");
        pokeCard.style.width="18rem;"
        let pokeCardBody = document.createElement("div");
        pokeCardBody.classList.add("card-body");
        let pokeCardTitle = document.createElement("h5");
        pokeCardTitle.classList.add("card-title");
        pokeCardTitle.innerText = filteredPokemon[i].name;
        pokeCardBody.appendChild(pokeCardTitle);
        pokeCard.appendChild(pokeCardBody);
        cardDeck.appendChild(pokeCard);

        pokeCard.id=filteredPokemon[i].name;
        pokeCard.addEventListener('click', healPokemon);
    }
}
// our sorting function expects either a 1 or -1 depending on if our value is greater than or less than another value
function comparePokemonNames(a, b){
    if(a.name> b.name){
        return 1;
    }
    if(b.name>a.name){
        return -1;
    }
    else{
        return 0;
    }
}
function swapUpperLower(){
    uppercase = !uppercase;
    if(uppercase){
        console.log("Converting to uppercase...");
        filteredPokemon = filteredPokemon.map(pokemon => pokemon.name.toUpperCase());
    }else{
        filteredPokemon = filteredPokemon.map(pokemon => pokemon.name.toLowerCase());
    }
    refreshPokemon();
}

function healPokemon(event){
    console.log(event.target);
    console.log(event.target.firstChild);
    console.log(event.target.firstChild.firstChild);
    alert("Pokemon "+ event.target.innerText + " healed by "+ healSelect.value);
}
nameInput.addEventListener('input', refreshPokemon);
nameButton.addEventListener('click', swapUpperLower);
loadAllPokemon();