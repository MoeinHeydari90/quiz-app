// Initializing an array for storing the quiz questions
let quizQuestions = [];

// Function to create an object from the quiz question
document
    .getElementById("quiz-form")
    .addEventListener("submit", function (event) {
        // To prevent refreshing the page after submitting
        event.preventDefault();

        const question = document.getElementById("question").value;
        const options = [
            document.getElementById("option1").value,
            document.getElementById("option2").value,
            document.getElementById("option3").value,
            document.getElementById("option4").value,
        ];
        const correctIndex =
            document.querySelector('input[name="correct"]:checked').value - 1; // The radios value starts from number 1
        const explanation = document.getElementById("explanation").value;

        // According to the format of the object of the quiz question
        const quizQuestion = {
            id: quizQuestions.length + 1, // To make a new id for each quiz question
            question: question,
            options: options.map((option, index) => ({
                text: option,
                isCorrect: index === correctIndex, // Mark as true if this option corresponds to the selected radio button
            })),
            explanation: explanation,
        };

        quizQuestions.push(quizQuestion);

        console.log(quizQuestions);
        alert("Quiz question submitted successfully!");
    });
