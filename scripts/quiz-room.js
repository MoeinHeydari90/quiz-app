// Function to fetch quiz data from a JSON file
async function fetchQuizData() {
    const response = await fetch(
        "https://raw.githubusercontent.com/MoeinHeydari90/MoeinHeydari90.github.io/main/data/general-information-questions.json"
    );
    // Converts the response body to JSON format
    const quizData = await response.json();
    return quizData;
}

// Function to create a quiz form based on the quiz data
function createQuizForm(quizData) {
    const quizContainer = document.getElementById("quiz-room");

    // Create a new question for each object of the quiz data
    quizData.forEach((question, index) => {
        // Create a div with class question-container
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        // Create text of question and put it in the container
        const questionText = document.createElement("h3");
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionContainer.appendChild(questionText);

        // Create a div with class options-container for 4 options
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        // Create an option for each options of the quiz question
        question.options.forEach((option, optionIndex) => {
            // Create a div with class option-container
            const optionContainer = document.createElement("div");
            optionContainer.classList.add("option-container");

            // Create a radio button for each option
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.value = optionIndex;
            optionContainer.appendChild(radioInput);

            // Create the text of option for each option
            const optionText = document.createElement("label");
            optionText.textContent = option.text;
            optionContainer.appendChild(optionText);

            optionsContainer.appendChild(optionContainer);
        });

        questionContainer.appendChild(optionsContainer);
        quizContainer.appendChild(questionContainer);
    });

    // Create the submit button at the end of the quiz form
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.id = "submit-quiz";
    submitButton.classList.add("submit-btn");
    submitButton.addEventListener("click", () => handleSubmit(quizData));
    quizContainer.appendChild(submitButton);
}

// Function to handle quiz submission
function handleSubmit(quizData) {
    const questionContainers = document.querySelectorAll(".question-container");
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredQuestions = 0;

    // Iterate over each question container in the quiz
    questionContainers.forEach((questionContainer, index) => {
        // Within each question container, find the radio button that is checked (selected by the user)
        const selectedOption = questionContainer.querySelector("input:checked");
        const options = questionContainer.querySelectorAll(".option-container");

        // Check if selected input is equal with options.isCorrect or not
        options.forEach((option, optionIndex) => {
            // Determine if the selected option is the correct answer
            const isCorrect = quizData[index].options[optionIndex].isCorrect;
            if (
                selectedOption &&
                selectedOption.value === optionIndex.toString()
            ) {
                if (isCorrect) {
                    option.classList.add("correct");
                    correctAnswers++;
                } else {
                    option.classList.add("incorrect");
                    incorrectAnswers++;
                }
            }
        });

        // If no option is selected, increment the unansweredQuestions counter
        if (!selectedOption) {
            unansweredQuestions++;
        }
    });

    // Display the results
    document.getElementById("submit-quiz").classList.add("hidden");
    const resultsContainer = document.createElement("div");
    resultsContainer.innerHTML = `
        <h2>Quiz Results</h2>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${incorrectAnswers}</p>
        <p>Unanswered Questions: ${unansweredQuestions}</p>
    `;
    document.getElementById("quiz-room").appendChild(resultsContainer);
}

function startQuiz() {
    // Fetch quiz data and create the quiz form
    fetchQuizData()
        .then((quizData) => createQuizForm(quizData))
        .catch((error) => console.error(error));
}
