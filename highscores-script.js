var highscores = JSON.parse(localStorage.getItem("highscores"));

var highscoresListEl = $("#highscores-list");

function initializeScores(){

  //sorts highscores high to low by userScore 
  highscores.sort(function(a, b){
    return b.userScore - a.userScore;
  });


  for(var i = 0; i < highscores.length; i++){
    var currentScoreObj = highscores[i];
    var listItemEl = $("<li>");
    listItemEl.html(currentScoreObj.userInitials + " - " + currentScoreObj.userScore);
    highscoresListEl.append(listItemEl);
  }
}

initializeScores();
console.log(highscores);