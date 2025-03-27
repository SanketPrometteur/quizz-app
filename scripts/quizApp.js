import { quizQuestions } from "./data/quetions.js";
import { Quiz } from "./data/quiz-oop.js";

export class QuizApp{
    constructor (quizQuestions){
        this.quiz = new Quiz(quizQuestions);
        this.currentQustion = null;
    }

    loadQuestion(){
        this.currentQustion = this.quiz.getCurrentQuestion();

        if(!this.currentQustion){
            this.showResult();
            return;
        }

        const questionContainer = document.getElementById('question');

        const optionsContainer = document.getElementById('options');

        const progress = document.getElementById('progress');

        optionsContainer.innerHTML = '';

        // displaying the question to UI
        questionContainer.textContent = this.currentQustion.question;

        // Display options
        this.currentQustion.options.forEach((option) => {
            const li = document.createElement('li');
            li.textContent = option;

            li.onclick= () => this.handleAnswer(option);
            optionsContainer.appendChild(li);
        });

        progress.textContent = `Question ${this.quiz.currentQuestionIndex+1} of ${this.quiz.quizQuestions.length}`;

         // Disable the previous button on the first question
         document.getElementById('previous-button').disabled = this.quiz.currentQuestionIndex === 0;
         // Disable the next button if it's the last question
         document.getElementById('next-button').disabled = false;

    }


    handleAnswer(selectedAnswer){
        const options = document.querySelectorAll('#options li');

        options.forEach((option)=>{
            option.classList.remove('selected-option');

            if(option.textContent === selectedAnswer){
                option.classList.add('selected-option');
            }
        });

        // check answer
        this.quiz.checkAnswer(selectedAnswer);

        // disable all other options
        options.forEach((option)=>{
            option.onclick = null;
        })

        // enable next button
        document.getElementById('next-button').disabled = false;
    }

    nextQuestion(){
        const nextQuestion = this.quiz.nextQuestion();
        if(nextQuestion){
            this.loadQuestion();
            
            // document.getElementById('next-button').disabled = true;
        }else{
            this.showResult();
        }
    }

    previousQuestion(){
        const previousQuestion = this.quiz.previousQuestion();
        if(previousQuestion){
            this.loadQuestion();
            
            // document.getElementById('previous-button').disabled = true;
        }else{
            this.showResult();
        }
    }

    showResult(){
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('navigation').style.display='none';
        document.getElementById('result').style.display='block';
        document.getElementById('score').textContent=`${this.quiz.getScore()}/${this.quiz.quizQuestions.length}`;
    }
}

const quizApp = new QuizApp(quizQuestions);

quizApp.loadQuestion();

// Next button to load the next question
document.querySelector('.js-next-button').addEventListener('click', () => {
    quizApp.nextQuestion();
});

//  Previous button to load the Previous question
document.querySelector('.js-previous-button').addEventListener('click', () => {
    quizApp.previousQuestion();
});

// Disable the Next button initially
document.getElementById('next-button').disabled = true;