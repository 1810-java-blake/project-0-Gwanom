function logResult(result) {
    console.log(result);
    return result;
}

function logError(error) {
    console.log("Looks like there was a problem: \n", error);
}

function validateSearchResponse(response) {
    console.log("validateSearchResponse");
    if (response.count == 0) {
        let table = document.getElementById("results");
        let thead = document.getElementById("tableHeader");
        while (thead.firstChild) {
            thead.removeChild(thead.firstChild);
        }
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>No entries matched the search term</td>"
        table.appendChild(tr);
        throw Error("NoEntriesMatchTerms") //to break promise chain
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

function replaceHeader() {
    let thead = document.getElementById("tableHeader");
    while (thead.firstChild) {
        thead.removeChild(thead.firstChild);
    }
    thead.innerHTML = 
        `<tr>
         <th>Name</th>
         <th>Manufacturer</th>
         <th>Starship Class</th>
         <th>Film Appearances</th></tr>`;
}

function parseFilmURL(filmURL) {
    let filmDictionary = {
        "https://swapi.co/api/films/1/": "A New Hope",
        "https://swapi.co/api/films/2/": "The Empire Strikes Back",
        "https://swapi.co/api/films/3/": "Return of The Jedi",
        "https://swapi.co/api/films/4/": "The Phantom Menace",
        "https://swapi.co/api/films/5/": "Attack of the Clones",
        "https://swapi.co/api/films/6/": "Revenge of the Sith",
        "https://swapi.co/api/films/7/": "The Force Awakens"
   };
   return filmDictionary[filmURL];
}

function tabulateResponse(response) {
    let resultRows = document.getElementById("results");
    while (resultRows.firstChild) {
        resultRows.removeChild(resultRows.firstChild);
    }
    replaceHeader();

    response.results.forEach(element => {
        var filmsString = '';
        element.films.forEach(film => {
            filmsString += `${parseFilmURL(film)} <br />`;
        });
        let tr = document.createElement("tr");
        tr.innerHTML = 
        `<td>${element.name}</td>
         <td>${element.manufacturer}</td>
         <td>${element.starship_class}</td>
         <td>
         <div class="tooltip">${element.films.length}<span class="tooltiptext">TEST</span></div>
         </td>`;
         resultRows.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let searchBtn = document.getElementById("searchBtn");
    let textInput = document.getElementById("searchField")

    searchBtn.addEventListener("click", () => {
        searchAPI(`https://swapi.co/api/starships/?search=${textInput.value}`);
    });
});