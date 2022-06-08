let wordsArr = words.split("\n");
let randomWord = wordsArr[Math.floor(Math.random()*wordsArr.length)].toUpperCase();

let letters = [""];
let curr = 0;
let tries = 0;


let counter = str => {
  return str.split('').reduce((total, letter) => {
    total[letter] ? total[letter]++ : total[letter] = 1;
    return total;
  }, {});
};

let countLettersActualWord = counter(randomWord);

function clickButton(el) {
  if (curr <= 4) {
    var amount = el.getAttribute("value");
    document.getElementById("display" + tries + curr).innerText = amount;
    letters[0] += amount;
  }
  if (curr <= 4) {
    curr++;
  }
}

function backspace() {
  if (curr > 0) {
    curr--;
    document.getElementById("display" + tries + curr).innerText = null;
    letters[0] = letters[0].substring(0, letters[0].length - 1);
  }
}

function enter() {
  let countLettersGuessedWord = counter(letters[0]);
  if (curr === 5) {
    let underlines = ["_", "_", "_", "_", "_"];
    for (let i = 0; i < letters[0].length; i++) {
      if (letters[0][i] === randomWord[i]) {
        underlines[i] = letters[0][i];
      }
      else if (randomWord.includes(letters[0][i]) && countLettersActualWord[letters[0][i]] >= countLettersGuessedWord[letters[0][i]]) {
        underlines[i] = "+";
        countLettersGuessedWord[letters[0][i]] -= 1;
      }
      else {
        underlines[i] = "-";
        countLettersGuessedWord[letters[0][i]] -= 1;
      }
    }
    for (let i = 0; i < underlines.length; i++) {
      if (underlines[i] === "+") {
        document.getElementById("display" + tries + i).style.backgroundColor = "#ffc425";
        document.getElementById("display" + tries + i).style.borderColor = "#ffc425";
      }
      else if (underlines[i] === "-") {
        document.getElementById("display" + tries + i).style.backgroundColor = "gray";
        document.getElementById("display" + tries + i).style.borderColor = "gray";
      }
      else {
        document.getElementById("display" + tries + i).style.backgroundColor = "#019a01";
        document.getElementById("display" + tries + i).style.borderColor = "#019a01";
      }
    }
    if (letters[0] === randomWord && tries >= 0) {
      document.getElementById("result").innerText = "Congratulations! You got the word " + randomWord + " in " + String(tries + 1) + " tries!";
      tries = 6;
    }
    tries += 1;
    curr = 0;
    letters = [""];
    underlines = ["_", "_", "_", "_", "_"];
    if (tries === 6) {
      document.getElementById("result").innerText = "Oops! The correct answer is " + randomWord + "!";
    }
  }
}

document.addEventListener("keydown", function(event) {
  if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
    if (curr <= 4) {
      document.getElementById("display" + tries + curr).innerText = event.key.toUpperCase();
      letters[0] += event.key.toUpperCase();
    }
    if (curr <= 4) {
      curr++;
    }
  }
  if (event.keyCode == 8) {
    backspace()
  }
  if (event.keyCode == 13) {
    enter()
  }
});