var startBtn = document.getElementById("start-btn");
var timeSpan = document.getElementById("timer");

var timeLeft;
var interval;

function initialize() {

    //Initialize timer to 75 seconds
    timeLeft = 75;

  }

  function startQuiz() {
    //Set intitial Time
    timeSpan.textContent = "Time: " + timeLeft;
  
  
    //Start timer and update time on page
    interval = setInterval(() => {
      timeLeft--;
      timeSpan.textContent = "Time: " + timeLeft;
  
      if (timeLeft == 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  initialize();
  
  startBtn.addEventListener("click", startQuiz);