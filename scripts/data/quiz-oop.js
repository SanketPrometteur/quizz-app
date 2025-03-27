import { quizQuestions } from "./quetions.js";
export class Question{
    question;
    options;
    correctAnswer;

    constructor(quizQuestion){
        this.question = quizQuestion.question;
        this.options = quizQuestion.options;
        this.correctAnswer = quizQuestion.correctAnswer;
    }
}

// quizQuestions.forEach((quizQuestion)=>{
//     const question = new Question(quizQuestion)

//     console.log(question);
// })