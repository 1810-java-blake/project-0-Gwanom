function logResult(result) {
    console.log(result);
    return result; //so that tabulateResponse can use it
}

function logError(error) {
    console.log(error);
}

function validateSearchResponse(response) {
    if (response.count == 0) {
        let table = document.getElementById("results");
        while(table.firstChild){
            table.removeChild(table.firstChild);
        }
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>No entries matched the search term</td>"
        table.appendChild(tr);
        throw Error("NoEntriesMatchTerms")
    }
    return response;
}

function readResponseAsJSON(response) {
    return response.json();
}

function searchAPI(pathToResource) {
    fetch(pathToResource)
        .then(readResponseAsJSON)
        .then(validateSearchResponse)
        .then(logResult)
        .then(tabulateResponse)
        .catch(logError);
}

//the callback function inserts the table row into the table
//this ensures that the request to the api has completed
//before the new html is inserted into the document
function getHomeworldName(pathToPlanet, callback){
    let planet = {};    
    fetch(pathToPlanet)
    .then(readResponseAsJSON)
    .then(logResult)
    .then(parsed => {
        planet = parsed;
    })
    .catch(logError)
    return planet.name;
}



function tabulateResponse(response){
    let resultRows = document.getElementById("results");
    while(resultRows.firstChild){
        resultRows.removeChild(resultRows.firstChild);
    }
    response.results.forEach(element => {
        let tr = document.createElement("tr");
        console.log(`tabulateResponse: ${element.homeworld}`); //DEBUG
        tr.innerHTML = 
        `<td>${element.name}</td>
         <td>${getHomeworldName(element.homeworld)}</td>
         <td>${element.birth_year}</td>
         <td>${element.films.length}</td>`;
        resultRows.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let searchBtn = document.getElementById("searchBtn");
    let textInput = document.getElementById("searchField")

    searchBtn.addEventListener("click", () => {
        searchAPI(`https://swapi.co/api/people/?search=${textInput.value}`);
    });
});