let artistSpan = document.getElementById("artistSpan");
let loadArtistButton = document.getElementById("loadArtistButton");
let artistInput = document.getElementById("artistInput");
let saveArtistButton = document.getElementById("saveArtistButton");

function saveArtist(){
    let httpRequest = new XMLHttpRequest();
    let artistName = artistInput.value;
    httpRequest.onreadystatechange = recieveData;
    httpRequest.open("POST", "https://tedsartists.azurewebsites.net/");
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(JSON.stringify({"name":artistName}));

    console.log(JSON.stringify({"name":artistName}));

    function recieveData(){
        // readystate 4 means the request is complete
        if(httpRequest.readyState == 4){
            if(httpRequest.status = 200){
                refreshList();
            }
        }
    }
}

function refreshList(){
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = recieveData;
    httpRequest.open("GET", "https://tedsartists.azurewebsites.net/");
    httpRequest.send();
    function recieveData(){
        // readystate 4 means the request is complete
        if(httpRequest.readyState == 4){
            if(httpRequest.status = 200){
                let HTTPresponse = httpRequest.responseText;
                let responseJSON = JSON.parse(HTTPresponse);
                // ul stands for unordered list, we can add list items as its children
                let artistList = document.createElement('ul');
                artistSpan.innerHTML="";

                for(let i = 0; i < responseJSON.length; i++){
                    console.log(responseJSON[i]);
                    let artistListItem = document.createElement('li');
                    artistListItem.innerText = responseJSON[i].name;
                    artistList.appendChild(artistListItem);
                }

                artistSpan.appendChild(artistList);

            }
        }
    }
}

saveArtistButton.onclick = saveArtist;
loadArtistButton.onclick = refreshList;