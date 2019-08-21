// Setting up constants used throughout API search
const baseURL = 'https://pokeapi.co/api/v2/'; 
let url;

// Constants relating to HTML document
const searchTerm = document.querySelector('.search-txt'); 
const searchForm = document.querySelector('form'); 
const section = document.querySelector('section');

// Event Listener
searchForm.addEventListener('submit', fetchResults);

// Forming URL for http get request
function fetchResults(e) {
    e.preventDefault(); 
    let name = searchTerm.value;
    let capName;
    
    for(let x in name) {
        if(x == 0){
            capName = name[x].toLowerCase();
        } else {
            capName += name[x].toLowerCase();
        }
    }
    url = baseURL + 'pokemon/' + capName;

    console.log(capName);
    console.log(url);

// Get request
fetch(url)
   .then(function(result) {
       return result.json();
    }).then(function(json) {
        displayResults(json);
        console.log(json);
 })
};

 // Display data
 function displayResults(json) { 
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
    let pokes = json;

    let pokemon = document.createElement('h2');
    let tall = document.createElement('p');
    let wide = document.createElement('p');

    let img =  document.createElement('img');
    img.setAttribute("height", 150);
    img.setAttribute("width", 150);

    let names = pokes.name; // name
    let resultName;
    
    for(let x in names) {
        if(x == 0){
            resultName = names[x].toUpperCase();
        } else {
            resultName += names[x].toLowerCase();
        }
    }
    
    pokemon.textContent = resultName;

    
    let sprite = pokes.sprites.front_default; // image
    img.src = sprite;
    
    let height = pokes.height;
    let inchHeight = (height * 3.93701) / 12;
    let freedomHeight = inchHeight.toFixed(1);
    tall.textContent = freedomHeight + 'ft';

    let weight = pokes.weight; 
    let poundWeight = weight * .220462;
    let freedomWeight = poundWeight.toFixed(1);
    wide.textContent = freedomWeight + ' lbs';

    section.appendChild(pokemon);
    section.appendChild(img);
    section.appendChild(tall);
    section.appendChild(wide);
};