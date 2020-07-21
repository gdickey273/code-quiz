//retrieve JSON array from local storage, parse it, and save to var highscores
var highscores = JSON.parse(localStorage.getItem("highscores"));

var highscoresListEl = $("#highscores-list");

function initializeScores(){

  //sorts highscores high to low by userScore 
  highscores.sort(function(a, b){
    return b.userScore - a.userScore;
  });

  //creates an li for each object in highscores, sets values with object references, and appends the li to ol
  for(var i = 0; i < highscores.length; i++){
    var currentScoreObj = highscores[i];
    var listItemEl = $("<li>");
    listItemEl.html(currentScoreObj.userInitials + " - " + currentScoreObj.userScore);
    highscoresListEl.append(listItemEl);
  }
}

//listens for clear-highscores-button click and clears li elements. 
$("#clear-highscores-button").on("click", function(){
  highscoresListEl.empty();
  localStorage.removeItem("highscores");
});


initializeScores();