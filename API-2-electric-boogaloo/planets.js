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
    thead.innerHTML = "<tr><th>Name</th><th>Climate</th><th>Orbital Period</th><th>Film Appearances</th></tr>";
}

function tabulateResponse(response) {
    let resultRows = document.getElementById("results");
    while (resultRows.firstChild) {
        resultRows.removeChild(resultRows.firstChild);
    }
    replaceHeader();

    response.results.forEach(element => {
        let tr = document.createElement("tr");
        tr.innerHTML = 
        `<td>${element.name}</td>
         <td>${element.climate}</td>
         <td>${element.orbital_period} days</td>
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
        searchAPI(`https://swapi.co/api/planets/?search=${textInput.value}`);
    });
});