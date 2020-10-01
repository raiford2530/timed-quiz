var startBtn = document.getElementById("start-btn");
var timeSpan = document.getElementById("timer");
var qaSection = document.querySelector(".qa-section");
var questionHeader = document.querySelector(".question");
var choicesList = document.querySelector(".choices");
var answerIndicator = document.querySelector(".answer-indicator");
var highscoreSection = document.querySelector(".highscore-section");
var highscoreForm = document.getElementById("highscore-form");
var scoreSpan = document.getElementById("score");
var highscoreBox = document.getElementById("highscore-box");

var timeLeft;
var interval;
var timeout;
var questionList;
var currentIndex = 0;
var currentQuestion;
var score = 0;
var highscores = [];

function initialize() {
  //Initialize timer to 75 seconds
  timeLeft = 75;
  //Initialize list of questions
  questionList = [
    {
      question: "Commonly used data types DO NOT include:",
      answer: "alerts",
      getChoices: function () {
        return ["strings", "booleans", this.answer, "numbers"];
      },
    },
    {
      question:
        "The condition in an if/else statement is enclosed within ____.",
      answer: "curly brackets",
      getChoices: function () {
        return ["quotes", this.answer, "parentheses", "square brackets"];
      },
    },
    {
      question: "Arrays in JavaScript can be used to store",
      answer: "all of the above",
      getChoices: function () {
        return ["numbers and strings", "other arrays", "booleans", this.answer];
      },
    },
    {
      question:
        "String values must be enclosed within _____ when being assigned to variables.",
      answer: "quotes",
      getChoices: function () {
        return ["commas", "curly brackets", this.answer, "parentheses"];
      },
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      answer: "console.log",
      getChoices: function () {
        return ["JavaScript", "terminal/bash", "for loops", this.answer];
      },
    },
  ];
}

function startQuiz() {
  //Set intitial Time
  timeSpan.textContent = "Time: " + timeLeft;
  //Hide content of the main page
  document.querySelector(".start-page").classList.add("hide");

  //Show question and answers section
  qaSection.classList.remove("hide");

  //Render the current question and its choices
  renderQuestion();

  //Start timer and update time on page
  interval = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = "Time: " + timeLeft;

    if (timeLeft == 0) {
      clearInterval(interval);
      qaSection.classList.add("hide");
      highscoreSection.classList.remove("hide");
      scoreSpan.textContent = score;
    }
  }, 1000);
}

function renderQuestion() {
  //Get question in the current index from questions array
  currentQuestion = questionList[currentIndex];
  //Clear choices from list before rendering choices from question
  choicesList.innerHTML = "";
  //Set the text of the question header to the question
  questionHeader.textContent = currentQuestion.question;
  var choices = currentQuestion.getChoices();
  var choiceListItem;
  var choiceButton;

  for (var i = 0; i < choices.length; i++) {
    choiceListItem = document.createElement("li");
    choiceButton = document.createElement("button");
    choiceButton.classList.add("btn");
    choiceButton.textContent = i + 1 + ". " + choices[i];

    //If the current choice is the same as the answer to the question, give
    //it a data-answer attribute with a value of true
    if (currentQuestion.answer === choices[i]) {
      choiceButton.setAttribute("data-answer", "true");
    }

    choiceListItem.append(choiceButton);
    choicesList.append(choiceListItem);
  }

  //Increment index to access next question
  currentIndex++;
}

function checkSelectedAnswer(event) {
  //Checks to see if indicator for current selection has disappeared
  //and if not cancel it and show indicator for the next selection
  if (timeout) {
    clearTimeout(timeout);
  }

  var target = event.target;

  //Delegates click event to the buttons in the list of choices
  //and shows an indicator to indicate if the user's seleciton is right or wrong
  //then renders the next question
  if (target.matches("button")) {
    if (target.getAttribute("data-answer") === "true") {
      answerIndicator.textContent = "Right!";
      score += 11;
    } else {
      answerIndicator.textContent = "Wrong!";
      timeLeft -= 10;
    }

    answerIndicator.classList.remove("hide");

    timeout = setTimeout(() => {
      answerIndicator.classList.add("hide");
    }, 1000);

    if (currentIndex === questionList.length) {
      clearInterval(interval);
      qaSection.classList.add("hide");
      highscoreSection.classList.remove("hide");
      scoreSpan.textContent = score;
    } else {
      renderQuestion();
    }
  }
}

function submitHighScore(event) {
  event.preventDefault();
  var entry = highscoreBox.value;
  //Check to see if there are already highscores and if grab the list and use it
  var localHighscores = JSON.parse(localStorage.getItem("highscores"));
  if (localHighscores) {
    highscores = localHighscores;
  }

  highscores.push(entry + " - " + score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  window.location.replace("./highscores.html");
}

initialize();

startBtn.addEventListener("click", startQuiz);
choicesList.addEventListener("click", checkSelectedAnswer);
highscoreForm.addEventListener("submit", submitHighScore)
