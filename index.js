/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i =0; i<games.length; i++){
        const game = games[i];

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `<img src="${game.img}" class="game-img"/>
        <h3> ${game.name}</h3>
        <p> ${game.description}</p>
        <p> Backers: ${game.backers} </p>`

        gamesContainer.appendChild(gameCard);
    }


}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributions = GAMES_JSON.reduce((sum, game) =>{
    return sum + game.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${contributions.toLocaleString('en-US')}`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
},0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numOfGames = GAMES_JSON.length;
gamesCard.innerHTML = numOfGames;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
const unfundedFilter = document.createElement("div");

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
const unfunded = GAMES_JSON.filter((game) =>{
    return game.pledged<game.goal;
});
 addGamesToPage(unfunded);
}


// show only games that are fully funded
const fundedFilter = document.createElement("div");
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
const goalMet = GAMES_JSON.filter((game) => {
    return game.pledged>= game.goal;
})

addGamesToPage(goalMet)
}

// show all games
const allGames = document.createElement("div");
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    allGames.innerHTML = addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games with ${unfundedCount} game${unfundedCount !== 1? 's' : ' '} remaining unfunded.`;

// create a new DOM element containing the template string and append it to the description container
const tString = document.createElement("p");
tString.innerHTML = displayStr;
descriptionContainer.append(tString)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restGames] = sortedGames;
// Destructure properties of the first game
const { name: name1, description: description1, pledged: pledged1, goal: goal1, backers: backers1, img: img1 } = firstGame;

// Destructure properties of the second game
const { name: name2, description: description2, pledged: pledged2, goal: goal2, backers: backers2, img: img2 } = secondGame;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement("p")
firstGameName.innerHTML = name1;
const secondGameName = document.createElement("p")
secondGameName.innerHTML = name2;
firstGameContainer.append(firstGameName)
secondGameContainer.append(secondGameName)

// do the same for the runner up item

