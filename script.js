let answer = '';
let maxWrong = 5;
let minWrong = 0;
let guessed = [];
let wordStatus = null;
let mistakes = 0;
let goodGuesses = 0;

const movies = [
    "THE GODFATHER",
    "SCHINDLERS LIST",
    "ANGRY MEN",
    "LIFE IS BEAUTIFUL",
    "THE GOOD THE BAD AND THE UGLY",
    "THE SHAWSHANK REDEMPTION",
    "THE PURSUIT OF HAPPYNESS",
    "SEVEN SAMURAI",
    "THE INTOUCHABLES",
    "CENTRAL STATION",
    "REQUIEM FOR A DREAM",
    "A BEAUTIFUL MIND",
    "HACHI A DOGS TALE",
    "TAKEN",
    "MY SASSY GIRL",
    "AMORES PERROS",
    "THE SHINING",
    "APOCALYPTO",
    "GLADIATOR",
    "CAST AWAY",
    "THE DARK KNIGHT",
    "THE PIANIST",
    "TITANIC",
    "FIGHT CLUB",
    "BRAVEHEART",
    "IT IS A WONDERFUL LIFE",
    "WALL E",
    "ALIEN",
    "MEMORIES OF MURDER",
    "THE RETURN",
    "I SAW THE DEVIL",
    "CHILDREN OF HEAVEN",
    "A SEPARATION",
    "THE SIXTH SENSE",
    "A MOMENT TO REMEMBER",
    "DEPARTURES",
    "THE ROAD HOME",
    "SAVING PRIVATE RYAN",
    "THE BRIDGE ON THE RIVER KWAI",
    "BEN HUR",
    "THE EXORCIST",
    "THE SECRET IN THEIR EYES",
    "THE PROFESSIONAL",
    "THE GREEN MILE",
    "GRAN TORINO",
    "KILL BILL",
    "JURASSIC PARK" ,
    "SPIDER MAN NO WAY HOME",
    "BACK TO THE FUTURE",
    "FINDING NEMO"
]


function generateButtons(){
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => 
    `
    <button
    class="buttons"
    id='` + letter + `'
    onClick ="handleGuess('` + letter + `')"
    >
` + letter + `
    </button>
    `    
        ).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if(answer.indexOf(chosenLetter) >= 0){
        const letters = answer.split('').filter(a => a === chosenLetter);
        goodGuesses += letters.length;
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        updatePicture();
        guessedWord();
        checkIfGameLost();
    }
}



function updatePicture(){
    document.getElementById('firstPhoto').src = './images/' + mistakes + '.jpg'
}

function checkIfGameWon(){
    if(goodGuesses === answer.split(' ').join('').length){
        document.getElementById('keyboard').innerHTML = "Congratulations, you got it right!";
    }
}

function checkIfGameLost(){
    if(mistakes === maxWrong){
        document.getElementById('keyboard').innerHTML = "What a pity, you are dead!";
        document.getElementById('answer').innerHTML = "The answer was: " + answer;
    }
}

function guessedWord(){
    wordStatus = answer.split('').map(letter =>
         (guessed.indexOf(letter) >= 0 ? letter : 
         letter == " " ? ` <span style="margin-left: 15px;"></span> ` : " - ")).join('');
    document.getElementById('answer').innerHTML = wordStatus;
}

function updateMistakes(){
    document.getElementById('mistakes').innerHTML = mistakes;
}


function randomMovie(){
    answer = movies[Math.floor(Math.random() * movies.length)];
}

function reset(){
    mistakes = 0;
    goodGuesses = 0;
    guessed = [];
    document.getElementById('firstPhoto').src = './images/0.jpg';
    generateButtons();
    randomMovie();
    guessedWord();
    updateMistakes();

}

document.getElementById('maxWrong').innerHTML = maxWrong;
randomMovie();
guessedWord();
generateButtons();
