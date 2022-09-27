//get variable for all buttons and words
const buttonElements = document.querySelectorAll('button')
const wordElements = document.querySelectorAll('.grid_row')

//initial value of row and cell input
let row = 0
let letter = 0

// word list and correct word
const wordList = ['apple','fight','brand','shout','jazzy','pizza']
const correctWord = wordList[Math.floor(Math.random()*wordList.length)]

let gameOver = false
let guessCorrect = false

// add event listener to each button
// extract data attributes of each button, and assign the button value to each click
buttonElements.forEach(element => {
    element.addEventListener('click', function(){keyPress(element.attributes['data-key'].value)})
})

// filling word input box using the data attributes of the button
function populateWord(key) {
    if(letter < 5) {   
        wordElements[row].querySelectorAll('.word_cell')[letter].innerText = key
        letter+=1
    }
}

// after game over, remove value from inout box and color style
function clearWord() {
    const allElements = document.querySelectorAll('.word_cell')

    allElements.forEach(element => 
        {element.innerText = " "
         
        if (element.classList.contains("word_cell_green")) {
            element.classList.remove('word_cell_green')
        } else if (element.classList.contains("word_cell_grey")) {
            element.classList.remove('word_cell_grey')
        } else if(element.classList.contains('word_cell_gold')){
            element.classList.remove('word_cell_gold')
        }
    
    })

    

    
}



function checkWord() {
    let letterElements = wordElements[row].querySelectorAll('.word_cell')

    
    
    let numberOfCorrect = 0
    
    // find how many indexes of the enter word align with indexes of correct word
    // convert strings of the correct word and entered word to 2 arrays
    // change enter array to lower case
    // add different styles based on if condition
    const correctArray = correctWord.split('')   
    let enterArray = []
    
    letterElements.forEach((element) => {
        enterArray.push(element.innerText.toLowerCase())
        console.log(typeof(element.innerText))

    })
    // console.log(correctArray)
    // console.log(enterArray)

    for (let i = 0; i < correctArray.length; i++) {
        if (correctArray[i] == enterArray[i]) {
            letterElements[i].classList.add('word_cell_green')
            numberOfCorrect+=1
        } else if (correctArray[i] != enterArray[i] && correctArray.includes(enterArray[i])) {
            letterElements[i].classList.add('word_cell_grey')
        } else if (!correctArray.includes(enterArray[i])) {
            letterElements[i].classList.add('word_cell_gold')
        }
    }


    if (numberOfCorrect === 5) {
        gameOver = true
        guessCorrect = true
        alert('you have guessed the word')
        clearWord()
        //add HTML and function to record winner
        console.log("won 1")
        row = 0
        letter = 0
        gameRestart()
        
        
       

    

        

    } else if (row === 5) {
        gameOver = true
        alert ('better luck next time. the word is ' + correctWord)
        clearWord()
        // winner record remains same no change
        console.log('won 0')
        row = 0
        letter = 0
        gameRestart()
       
        

       
      
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

    function deleteWord() {
        const letterElements = wordElements[row].querySelectorAll('.word_cell')
        for (let i = letterElements.length - 1; i >= 0; i--) {
            let element = letterElements[i]
            if(element.innerText !== '') {
                element.innerText = ''
                letter-=1
                break

            }
        }

    }

function keyPress(key) {
    if (key.toLowerCase() === 'enter') {
        enterWord()
        
    } else if (key.toLowerCase() === 'del') {
        deleteWord()
    } else {
        populateWord(key)
    }
}

