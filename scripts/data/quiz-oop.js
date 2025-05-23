import { quizQuestions } from "./quetions.js";
class Question{
    question;
    options;
    correctAnswer;

    constructor(quizQuestion){
        this.question = quizQuestion.question;
        this.options = quizQuestion.options;
        this.correctAnswer = quizQuestion.correctAnswer;
    }
}


export class Quiz{
    constructor(quizQuestions){
        this.quizQuestions = quizQuestions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion(){
        return new Question(quizQuestions[this.currentQuestionIndex]);
    }

    checkAnswer(selectedAnswer){
        const correctAnswer = this.quizQuestions[this.currentQuestionIndex].correctAnswer;

        if(selectedAnswer === correctAnswer){
            this.score++;
        }
    }

    nextQuestion(){
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex<this.quizQuestions.length){
            return this.getCurrentQuestion();
        }else{
            return null;
        }
    }

    previousQuestion(){
        this.currentQuestionIndex--;

        if(this.currentQuestionIndex>=0){
            this.score--;
            return this.getCurrentQuestion();
        }else{
            return null;
        }
    }

    getScore(){
        return this.score;
    }

    hasNext(){
        return this.currentQuestionIndex < this.quizQuestions.length;
    }
}