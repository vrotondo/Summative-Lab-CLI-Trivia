// index.js
const promptSync = require('prompt-sync'); // For user input

// Sample trivia questions
const questions = [
    {
        question: "What is the capital of Bangladesh?",
        options: ["Paris", "Dhaka", "Berlin", "Madrid"],
        answer: "Dhaka",
    },
    {
        question: "Which planet is known as the Morning and Evening Star?",
        options: ["Earth", "Mars", "Venus", "Saturn"],
        answer: "Venus",
    },
    {
        question: "Who wrote 'The Lord of the Rings'?",
        options: ["J.R.R. Tolkien", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        answer: "J.R.R. Tolkien",
    },
];

let score = 0; // Track the user's score
const timeLimit = 10000; // 10 seconds per question

// Function to get user input
function promptUser(message) {
    const prompt = promptSync();
    return prompt(message);
}

// Function to display a question
function displayQuestion(question, index) {
    console.log(`Question ${index + 1}: ${question.question}`);
    question.options.forEach((option, i) => {
        console.log(`${i + 1}. ${option}`);
    });
}

// Function to validate the user's answer
function validateAnswer(question, userAnswer) {
    if (question.options[userAnswer - 1] === question.answer) {
        console.log("Correct!\n");
        return true;
    } else {
        console.log(`Incorrect! The correct answer is: ${question.answer}\n`);
        return false;
    }
}

// Function to start the game
function startGame() {
    console.log("Welcome to the Trivia Game!\n");

    questions.forEach((question, index) => {
        displayQuestion(question, index);

        // Set a timer for the question
        const timer = setTimeout(() => {
            console.log("\nTime's up! Moving to the next question.\n");
            promptUser(""); // Clear the input buffer
        }, timeLimit);

        // Get user input
        const userAnswer = promptUser("Your answer (enter the option number): ");

        // Clear the timer
        clearTimeout(timer);

        // Validate the answer
        if (validateAnswer(question, userAnswer)) {
            score++;
        }
    });

    // Display final score
    console.log(`Game over! Your final score is: ${score}/${questions.length}`);
}

startGame();

// Export for testing
module.exports = { startGame, questions, displayQuestion, validateAnswer, promptUser };