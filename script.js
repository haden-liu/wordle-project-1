
const buttonElements = document.querySelectorAll('button')
const wordElements = document.querySelectorAll('.grid_row')
let row = 0
let letter = 0
let gameOver = false
let guessCorrect = false

const wordList = ['fight','brand','shout','jazzy','pizza']
const correctWord = wordList[Math.floor(Math.random()*wordList.length)]

buttonElements.forEach((element) => {
    element.addEventListener('click', function()
    {keyPress(element.attributes['data-key'].value)
})
})

function populateWord(key) {

    if (letter < 5) {
    wordElements[row].querySelectorAll('.word_cell')[letter].innerText = key
    letter += 1}
}

function checkWord() {
    const letterElements = wordElements[row].querySelectorAll('.word_cell')
    
    let numberOfCorrect = 0



    letterElements.forEach((element, index) => {
        const indexOfCorrectWord = correctWord.toLowerCase().indexOf(element.innerText.toLowerCase())
        
        // const indexOfCorrectWord = correctWord.toLowerCase().forEach((e,i)=> {})

      

        console.log(indexOfCorrectWord)
        
        if(indexOfCorrectWord === index) {
            numberOfCorrect += 1
            element.classList.add('word_cell_green')
        } else if (indexOfCorrectWord > 0) {
            element.classList.add('word_cell_grey')
        } else {
            element.classList.add('word_cell_gold')
        }
    })

    if (numberOfCorrect === 5) {
        gameOver = true
        guessCorrect = true
        alert('you have guessed the word')
    } else if (row === 5) {
        gameOver = true
        alert ('better luck next time. the word is ' + correctWord)
    }
}

function enterWord() {
    if (letter < 5) {
        alert('not enough letters')
    } else {
        checkWord()
        row+=1
        letter = 0
    }
}

function deleteLetter() {
     const letterElements = wordElements[row].querySelectorAll('.word_cell')
     for (let index = letterElements.length - 1; index >= 0; index --) {
        const element = letterElements[index]

        if(element.innerText !== '') {
            element.innerText =''
            letter -= 1
            break
        }
     }
}


function keyPress(key) {

    if(!gameOver) {
    if(key.toLowerCase() === 'enter') {
        enterWord()
    }
    else if(key.toLowerCase() === 'del') {
        deleteLetter()
    }
    else {
        populateWord(key)
    }}
    else {
        alert ('Game over')
    }
}