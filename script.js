var timer = 120;
var questionNumber = 1;
var correct = 0;
var incorrect = 0;
var userName = "";
var lastQuestion = false;



var timerEl = $("#time-left").html(timer);
var questionCardEl = $("#question-card");
var answerChoiceEls = $(".answer-choice");
var questionText = $("#question-text");
var resultAlertEl = $("#result-alert");
var resultText = $("#result");
var initialsFormEl = $("#initials-form");
var initialsInputEl = $("#initials-input");

//initialized an array of question Objects that each contain text, answerChoices[], and correctAnswer properties
var questionArray = [
  {
    text: "Question0 text",
    answerChoices: ["answer0", "answer1", "answer2", "answer3"],
    correctAnswer: "answer0"

  },

  {
    text: "Question1 text",
    answerChoices: ["answer0", "answer1", "answer2", "answer3"],
    correctAnswer: "answer0"

  },

  {
    text: "Question2 text",
    answerChoices: ["answer0", "answer1", "answer2", "answer3"],
    correctAnswer: "answer0"

  },

  {
    text: "Question3 text",
    answerChoices: ["answer0", "correctAnsw", "answer2", "answer3"],
    correctAnswer: "correctAnsw"

  }

];

//returns a random integer between 0 and max (not including max)
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

var chosenQuestion;
/*splices a random question from questionArray, updates questionCardEl to match random question (with answer options listed in random order), 
and waits for user to answer.
*/
function askQuestion() {

  //chosing question from questionArray at random
  if (questionArray.length > 1) {
    chosenQuestion = questionArray.splice(randomNumber(questionArray.length), 1)[0];
  } else {
    chosenQuestion = questionArray[0];
    lastQuestion = true;
  }

  //set question number
  $("#question-number").html(questionNumber);

  //setting answer choices on questionCard to answer choices in question at random
  $.each($(answerChoiceEls), function (i) {
    var r = randomNumber(chosenQuestion.answerChoices.length);
    answerChoiceEls[i].textContent = chosenQuestion.answerChoices.splice(r, 1);
  });

  questionText.html(chosenQuestion.text);





}//


function takeQuiz() {
  //Hide start card and display count clock and question card
  $("#start-card").attr("style", "display: none");
  $("#count-clock").attr("style", "display: block");
  questionCardEl.attr("style", "display: block");

  //Decrement timer and update counter clock every second until timer reaches 0
  var interval = window.setInterval(function () {
    timerEl.html(timer);
    if (timer > 0) {
      timer--;
    } else clearInterval(interval);
  }, 1000);

  //Update question card with random question
  askQuestion();

  /*Listen for user's click and tests choice against correct answer.  If users chosen answer is correct, correct counter is incremented,
  message flashes below question card to tell user their choice was correct. If the chosen answer is incorrect,
  incorrect counter is incremented, 10 is subtracted from timer, and a message flashes below questionCard to tell the user 
  their choice was incorrect.*/
  answerChoiceEls.on("click", function (e) {

    if (e.target.textContent === chosenQuestion.correctAnswer) {
      correct++;

      //Flashes "Correct!" in div below questionCard for .3 seconds
      resultText.attr("class", "correct");
      resultText.html("Correct!");
      resultAlertEl.attr("style", "display: block");
      window.setTimeout(function () { resultAlertEl.attr("style", "display: none"); }, 300);
      console.log(resultText);

    } else {
      incorrect++;
      timer -= 10;

      //Flashes "Wrong!" in div below questionCard for .3 seconds
      resultText.attr("class", "incorrect");
      resultText.html("Wrong!");
      resultAlertEl.attr("style", "display: block");
      window.setTimeout(function () { resultAlertEl.attr("style", "display: none"); }, 300);




    }

    //create alerts for last question game over vs time out game over to ensure logic is working properly 
    if (timer === 0 || lastQuestion === true) {
      questionCardEl.attr("style", "display: none");
      $("#score-card").attr("style", "display: block");
      window.clearInterval(interval);
      timerEl.html(timer);
      $("#final-score").html(timer);

    } else {
      console.log(correct);
      console.log(incorrect);
      questionNumber++;
      askQuestion();
    }

  });

  //once form is submitted create an object. If local storage is empty, create an array of user scores. If such an array already exists push new user score object to that array.
  initialsFormEl.submit(function (e) {
    e.preventDefault();
    var initials = initialsInputEl.val();
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if(highscores !== null){
      highscores.push({userInitials: initials, userScore: timer});
    } else{
     var highscores = [{userInitials: initials, userScore: timer}];
    }

    localStorage.setItem("highscores", JSON.stringify(highscores));
    
    
  });
}

$("#start-button").on("click", takeQuiz);



















