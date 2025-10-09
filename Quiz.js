fetch('quizData.json') // Replace 'data.json' with the URL or file path
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    console.log(data); // Use the JSON data
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


let currentQuestion = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const currentQuiz = data[currentQuestion];
  questionEl.textContent = currentQuiz.question;

  // Loop through options and update text + show/hide options if less than total
  optionsEl.forEach((optionEl, index) => {
    if (index < currentQuiz.options.length) {
      optionEl.style.display = "block";
      optionEl.textContent = currentQuiz.options[index];
      optionEl.onclick = () => {
        if (index === currentQuiz.correct) {
          score++;
        }
        nextQuestion();
      };
    } else {
      // Hide option elements not needed for this question
      optionEl.style.display = "none";
    }
  });
}


function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = `${score}/${quizData.length}`;
}

function startQuiz() {
  startBtn.style.display = "none";
  loadQuestion();
  document.getElementById("quiz").style.display = "block";
}


nextBtn.onclick = nextQuestion;
startBtn.onclick = startQuiz;

// Initialize the quiz