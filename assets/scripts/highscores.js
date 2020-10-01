var highscoreList = document.getElementById("highscore-list");
var backBtn = document.getElementById("back-btn");
var clearBtn = document.getElementById("clear-btn");
var highscores;

function loadHighscores(){
    //Try to get highscores from local storage
    highscores = localStorage.getItem("highscores");
    
    //If there are highscores in local storage grab them and create the list for them
    if(highscores)
    {
        highscores = JSON.parse(localStorage.getItem("highscores"));
        
        for(var i = 0; i < highscores.length; i++){
            var item = document.createElement("li");
            item.textContent = highscores[i];
            highscoreList.append(item);
        }
    }
}

//Make page navigate back to index.html
function goBack(){
    window.location.replace("./index.html");
}

//Clear the highscore list and remove from local storage
function clearHighscores(){
    highscoreList.innerHTML = "";
    localStorage.removeItem("highscores");
}

loadHighscores();


backBtn.addEventListener("click", goBack)
clearBtn.addEventListener("click", clearHighscores);
