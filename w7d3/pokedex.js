let pokemonNameInputButton = document.getElementById("getNameButton");
let pokemonNameInputBox = document.getElementById("nameInput");
let pokemonList = document.getElementById("list");
let panel = document.getElementById("panel");
const apiBaseURL = "https://pokeapi.co/api/v2/";

pokemonNameInputButton.addEventListener('click', updateList);

// async - function can be executed asynchronously (ie other functions may execute while
// this one is waiting for something to happen)
/*
javascript puts all functions activated by an event onto a message queue, and javascript
will continuously cycle through incoming events using the event loop, and it will complete all
functions that it recieves to the end before moving on
*/

// obtain an array of pokemon from the pokeAPI
async function updateList(){
    let name = pokemonNameInputBox.value;
    console.log("user clicked button");
    console.log(name);

    let response = await fetch(apiBaseURL + 'pokemon?limit=151');
    console.log(response);
    let responseJSON = await response.json();
    console.log(responseJSON);

    let pokemonListArray = refineList(responseJSON.results, name);

    updateListContents(pokemonListArray);
}
// transfer a JS array of pokemon into items of the list section in html
function updateListContents(pokemonListArray){
    list.innerHTML = "";
    // ul = unordered list
    pokemonListElement = document.createElement("ul");
    for(let i = 0; i < pokemonListArray.length; i++){
        let currentPokemon = pokemonListArray[i];
        pokemonListItem = document.createElement("li");
        pokemonListItem.innerText = currentPokemon.name;
        pokemonListElement.appendChild(pokemonListItem);
        pokemonListElement.addEventListener('click', displayPokemon);
    }
    list.appendChild(pokemonListElement);
}
/*
JS has some very useful array functions!
map, sort, filter, foreach
*/
function refineList(pokemonListArray, searchTerm){
    // for each element of pokemonListArray, call each element 'pokemon'
    // and check if 'pokemon'.name includes the search term
    // the return the list of only acceptable pokemon
    return pokemonListArray.filter(pokemon => pokemon.name.includes(searchTerm));
}
// I should have an event object passed into this function by the event listener..
// let's call that object 'event'
async function displayPokemon(event){
    console.log(event.target.innerText);
    let response = await fetch(apiBaseURL + "pokemon/" +event.target.innerText);
    let pokemonObject = await response.json();
    console.log(pokemonObject);
    updatePokemonPanel(pokemonObject);

}

function updatePokemonPanel(pokemonObject){
    panel.innerHTML = "";
    let nameTag = document.createElement("h3");
    nameTag.innerText = pokemonObject.name;
    panel.appendChild(nameTag);

    // JS has advanced for loops too..
    // for let (object/variable) of array
    // for let (object variable) in object
    for(let sprite in pokemonObject.sprites){
        console.log(sprite);
        if(pokemonObject.sprites[sprite] && (typeof pokemonObject.sprites[sprite] == 'string') ){
            let spriteImage = document.createElement('img');
            spriteImage.src = pokemonObject.sprites[sprite];
            panel.appendChild(spriteImage);
        }
    }
    let abilitiesList = document.createElement('ol');
    for(let i = 0; i < pokemonObject.abilities.length; i++){
        let ability = document.createElement('li');
        // abilities is an array of objects that contains an abilities object that contains a name
        ability.innerText = pokemonObject.abilities[i].ability.name;
        abilitiesList.appendChild(ability);
    }
    panel.appendChild(abilitiesList);
}