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

// Collect all radio button elements within the option containers
const radioButtons = Array.from(
    document.querySelectorAll('.option-container input[type="radio"]')
);
// Collect all text input elements within the option containers
const optionInputs = Array.from(
    document.querySelectorAll('.option-container input[type="text"]')
);

// Function to shuffle the options
function randomizeOptions() {
    // Extracting values from option inputs
    let options = optionInputs.map((input) => input.value);

    // Maps over radio buttons and returns true if the radio button is checked
    let radios = radioButtons.map((radio) => radio.checked);

    // Create an array of indices, in this case [0, 1, 2, 3]
    let indices = options.map((_, index) => index); // The underscore _ is used here to indicate that this parameter is not needed or used in the function

    // Shuffle the indices array with Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Create new arrays for shuffled options and radios
    let shuffledOptions = indices.map((index) => options[index]);
    let shuffledRadios = indices.map((index) => radios[index]);

    // Assigning shuffled values back to option inputs
    optionInputs.forEach((input, index) => {
        input.value = shuffledOptions[index];
    });

    // Assigning shuffled radio buttons back
    radioButtons.forEach((radio, index) => {
        radio.checked = shuffledRadios[index];
    });

    // Update background color after randomizing
    updateBackgroundColor();
}

// Function to update the background color of the text inputs
function updateBackgroundColor() {
    // Add a change event listener to each radio button
    radioButtons.forEach((radio, index) => {
        radio.addEventListener("change", function () {
            // Loop through all text inputs
            optionInputs.forEach((input, i) => {
                // If the radio button at the current index is checked, add the green background class
                if (i === index && radio.checked) {
                    input.classList.add("green-background");
                } else {
                    // Otherwise, remove the green background class
                    input.classList.remove("green-background");
                }
            });
        });
    });

    // Change the background color of the option entries based on the selected radio button
    radioButtons.forEach((radio, index) => {
        if (radio.checked) {
            // If the radio button is checked, add the green background class to the corresponding text input
            optionInputs[index].classList.add("green-background");
        } else {
            // Otherwise, remove the green background class
            optionInputs[index].classList.remove("green-background");
        }
    });
}

updateBackgroundColor();
