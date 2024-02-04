const questions =  [
    {
        question: "What is the capital of Japan?",
        answers: [
          { text: "Tokyo", correct: true},
          { text: "Beijing", correct: false},
          { text: "Seoul", correct: false},
          { text: "Bangkok", correct: false}
        ]
    },
    {
        question: "Which planet is closest to the sun?",
        answers: [
          { text: "Venus", correct: false},
          { text: "Mars", correct: false},
          { text: "Mercury", correct: true},
          { text: "Jupiter", correct: false}
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
      answers: [
          { text: "Atlantic Ocean", correct: false},
          { text: "Indian Ocean", correct: false},
          { text: "Southern Ocean", correct: false},
          { text: "Pacific Ocean", correct: true}
        ]      
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
      answers: [
          { text: "Charles Dickens", correct: false},
          { text: "William Shakespeare", correct: true},
          { text: "Jane Austen", correct: false},
          { text: "Mark Twain", correct: false}
        ]     
    },
    {
        question: "What is the capital of Australia?",
       answers: [
          { text: "Canberra", correct: true},
          { text: "Sydney", correct: false},
          { text: "Melbourne", correct: false},
          { text: "Perth", correct: false}
        ]  
    }
    // Add more questions as needed
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

 // Initialize variables
 let currentQuestionIndex = 0;
 let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();
