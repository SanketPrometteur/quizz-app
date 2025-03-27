import { quizQuestions } from "./data/quetions.js";

// imported Qustion class
import { Question } from "./data/quiz-oop.js";



// Implementing OOP 
quizQuestions.forEach((quizQuestion)=>{
    const question = new Question(quizQuestion)

    
    console.log(question);
})

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion(){
    const question = quizQuestions[currentQuestionIndex];
    // console.log(question);

    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const progress = document.getElementById('progress');

    optionsContainer.innerHTML = '';

    // adding quetion 
    questionContainer.textContent = question.question;

    question.options.forEach((option)=>{
        console.log(option);
        const li = document.createElement('li');
        li.textContent = option;

        li.onclick=()=> handleAnswer(option);
        optionsContainer.appendChild(li);
        
    });

    progress.textContent = `Question ${currentQuestionIndex+1} of ${quizQuestions.length}`;
}

function handleAnswer(selectedAnswer){
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    const options = document.querySelectorAll('#options li');

    options.forEach((option)=>{
        option.classList.remove('selected-option');

        if(option.textContent === selectedAnswer){
            option.classList.add('selected-option')
        }
    })

    if(selectedAnswer === correctAnswer){
        score++;
    }
    
    options.forEach((option)=>{
        option.onclick = null;
    });

    document.getElementById('next-button').disabled = false;
}

function nextQuestion(){
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
        loadQuestion();
        document.getElementById('next-button').disabled = true;
    }else{
        showResult();
    }
}

function showResult(){
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('navigation').style.display='none';
    document.getElementById('result').style.display='block';
    document.getElementById('score').textContent=`${score}/${quizQuestions.length}`;
}
loadQuestion();
document.getElementById('next-button').disabled =true;

document.querySelector('.js-next-button').addEventListener('click',()=>{
    nextQuestion()
});