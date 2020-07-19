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
function randomNumber(max){
  return Math.floor(Math.random()*max);
}

var chosenQuestion;
/*splices a random question from questionArray, updates questionCardEl to match random question (with answer options listed in random order), 
and waits for user to answer. If users chosen answer is correct, correct counter is incremented,
message flashes below question card to tell user their choice was correct. If the chosen answer is incorrect,
incorrect counter is incremented, 10 is subtracted from timer, and a message flashes below questionCard to tell the user 
their choice was incorrect.
*/
function askQuestion(){
  
  //chosing question from questionArray at random
  if (questionArray.length > 1){
    chosenQuestion = questionArray.splice(randomNumber(questionArray.length), 1)[0];
  } else {
    chosenQuestion = questionArray[0];
    lastQuestion = true;
  }

  //set question number
  $("#question-number").html(questionNumber);

  //setting answer choices on questionCard to answer choices in question at random
  $.each($(answerChoiceEls), function(i){
    var r = randomNumber(chosenQuestion.answerChoices.length);
    answerChoiceEls[i].textContent = chosenQuestion.answerChoices.splice(r,1);
  });

  questionText.html(chosenQuestion.text);

  

  
  
}//


function takeQuiz(){
  $("#count-clock").attr("style", "display: block");
  $("#start-card").attr("style", "display: none");
  questionCardEl.attr("style", "display: block");

  window.setInterval(function(){
    timerEl.html(timer);
    if(timer > 0){
      timer--;
    } else clearInterval();
  }, 1000);

  askQuestion();

  //console.log elements to ensure they're working properly
  answerChoiceEls.on("click", function(e){

    if (e.target.textContent === chosenQuestion.correctAnswer){
      correct++;
      //CHANGE THIS TO CORRECT MESSAGE FLASH
      console.log(this.textContent);
      console.log(chosenQuestion.correctAnswer);
      console.log("correct!");

    } else{
      incorrect++;
      timer -= 10;
      //CHANGE THIS TO INCORRECT MESSAGE FLASH
      console.log(this.textContent);
      console.log(chosenQuestion.correctAnswer);
      console.log("Incorrect!");
    }

    //create alerts for last question game over vs time out game over to ensure logic is working properly 
    if(timer === 0 || lastQuestion === true){
      return; 
    } else{
      console.log(correct);
      console.log(incorrect);
      questionNumber++;
      askQuestion();
    }

  });
}

$("#start-button").on("click", takeQuiz);



















