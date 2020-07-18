var timer = 120;
var questionNumber = 1;
var correct = 0;
var incorrect = 0;
var userName = "";
var lastQuestion = false;

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

  }
  
];

//returns a random integer between 0 and max (not including max)
function randomNumber(max){
  return Math.floor(Math.random()*max);
}

/*splices a random question from questionArray, updates questionCardEl to match random question (with answer options listed in random order), 
and waits for user to answer. If users chosen answer is correct, correct counter is incremented,
message flashes below question card to tell user their choice was correct. If the chosen answer is incorrect,
incorrect counter is incremented, 10 is subtracted from timer, and a message flashes below questionCard to tell the user 
their choice was incorrect.
*/
function askQuestion(){
  
  //chosing question from questionArray at random
  if (questionArray.length > 1){
    var chosenQuestion = questionArray.splice(randomNumber(questionArray.length), 1)[0];
  } else {
    var chosenQuestion = questionArray[0];
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

  answerChoiceEls.one("click", function(e){

    if (e.target.textContent === chosenQuestion.correctAnswer){
      correct++;
      //CHANGE THIS TO CORRECT MESSAGE FLASH
      console.log("correct!");

    } else{
      incorrect++;
      timer -= 10;
      //CHANGE THIS TO INCORRECT MESSAGE FLASH
      console.log("Incorrect!");
    }

    if(timer === 0 || lastQuestion === true){
      return; 
    } else{
      console.log(correct);
      console.log(incorrect);
      questionNumber++;
      setTimeout(askQuestion, 5000);
    }

  });


  
  
}//askQuestion()



askQuestion(0);








