// An array of 10 categories that users can select and evaluate their own knowledge
const categories = [
    "general-information",
    "geography",
    "history",
    "books-and-poetry",
    "sports",
    "movies",
    "science",
    "politics",
    "economy",
    "philosophy",
];

document.addEventListener("DOMContentLoaded", initializeQuizRoom);
// The function to create a menu of categories
function initializeQuizRoom() {
    const quizSubjectsContainer = document.getElementById(
        "quiz-subjects-container"
    );

    categories.forEach((category) => {
        const quizSubject = createQuizSubjectElement(category);
        quizSubjectsContainer.appendChild(quizSubject);
        // Calling the function for each of the categories
        fetchQuizData(category);
    });
}

function createQuizSubjectElement(category) {
    // to convert a kebab-case string to Title Case
    const titleOfCategory = convertToTitleCase(category);
    const quizSubject = document.createElement("div");
    quizSubject.textContent = titleOfCategory;
    quizSubject.classList.add("quiz-subject");
    quizSubject.addEventListener("click", () => createQuiz(category));
    return quizSubject;
}

// Generic function to create quiz
function createQuiz(category) {
    document.querySelector("main").classList.add("hidden");

    fetchQuizData(category)
        .then((quizData) => createQuizForm(quizData, category))
        .catch((error) => console.error(error));
}

// The variable to store the fetched data
const quizzes = [];

// Generic function to fetch quiz data based on category
async function fetchQuizData(category) {
    const response = await fetch(
        `https://raw.githubusercontent.com/MoeinHeydari90/MoeinHeydari90.github.io/main/data/${category}-questions.json`
    );
    // Converts the response body to JSON format
    const quizData = await response.json();
    quizzes.push(quizData);
    return quizData;
}

// Function to search in questions
function searchInQuestions() {
    // Get the search term and convert it to lowercase for case-insensitive search
    const searchTerm = document
        .getElementById("searchInQuestions")
        .value.toLowerCase()
        .trim();

    // Exit the function if the search term is empty
    if (!searchTerm) return;

    // Get the div element where the results will be displayed
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.style.display = "block";

    // Clear any previous search results
    resultsDiv.innerHTML = "";

    // The variable we need to check the existence of the found questions
    let foundQuestions = false;

    // Button for hiding results
    const exitButton = document.createElement("button");
    exitButton.id = "hideSearchResults";
    exitButton.innerHTML = "Hide Search Results";
    exitButton.classList.add("exit-btn");
    exitButton.onclick = exitResults;

    resultsDiv.appendChild(exitButton);

    for (const quiz of quizzes) {
        // Filter the questions that include the search term in their text
        const filteredQuestions = quiz.filter((item) =>
            item.question.toLowerCase().includes(searchTerm)
        );

        // Display the filtered questions with their IDs and categories
        if (filteredQuestions.length > 0) {
            foundQuestions = true;
            filteredQuestions.forEach((question) => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question-item");
                questionDiv.innerHTML = `<p>${question["quiz name"]} - ${question.id} - ${question.question}</p>`;
                resultsDiv.appendChild(questionDiv);
            });
        }
    }
    // If no questions were found, display a message
    if (!foundQuestions) {
        resultsDiv.innerHTML = "<p>No questions found</p>";
    }
}
// Function to create a quiz form based on the quiz data
function createQuizForm(quizData, category) {
    const titleOfCategory = convertToTitleCase(category);
    const quizContainer = document.getElementById("quiz-room");
    quizContainer.classList.remove("hidden");
    quizContainer.innerHTML = "";

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.textContent = "Exit Quiz";
    backButton.classList.add("exit-btn");
    backButton.addEventListener("click", () => exitQuiz());
    quizContainer.appendChild(backButton);

    const subject = document.createElement("h1");
    subject.textContent = `${titleOfCategory}`;
    quizContainer.appendChild(subject);

    // Sorting buttons
    const sortContainer = document.createElement("div");

    // The button that will sort the questions alphabetically
    const sortAlphabeticalButton = document.createElement("button");
    sortAlphabeticalButton.type = "button";
    sortAlphabeticalButton.textContent = "Sort Alphabetically";
    sortAlphabeticalButton.classList.add("sort-btn");

    // Sorts the quiz questions alphabetically based on their content.
    sortAlphabeticalButton.addEventListener("click", () => {
        quizData.sort((a, b) => a.question.localeCompare(b.question));
        createQuizForm(quizData, category); // Re-render the quiz with sorted data
    });
    sortContainer.appendChild(sortAlphabeticalButton);

    // The button that will sort the questions randomly
    const sortRandomButton = document.createElement("button");
    sortRandomButton.type = "button";
    sortRandomButton.textContent = "Sort Randomly";
    sortRandomButton.classList.add("sort-btn");
    sortRandomButton.addEventListener("click", () => {
        quizData.sort(() => Math.random() - 0.5); // Each time the comparison function is called, it returns a random value between -0.5 and 0.5. This random value determines the sort order.
        createQuizForm(quizData, category); // Re-render the quiz with sorted data
    });
    sortContainer.appendChild(sortRandomButton);

    // Put the sorting buttons in the top of the quiz container
    quizContainer.appendChild(sortContainer);

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

            // Create a checkbox button for each option
            const checkboxInput = document.createElement("input");
            checkboxInput.type = "checkbox";
            checkboxInput.value = optionIndex;
            checkboxInput.name = `question-${index + 1}`;
            checkboxInput.id = `question-${index + 1}-option-${
                optionIndex + 1
            }`; // Unique id for each option;
            optionContainer.appendChild(checkboxInput);

            // Create the text of option for each option
            const optionText = document.createElement("label");
            optionText.textContent = option.text;
            optionText.htmlFor = checkboxInput.id; // Correctly set the htmlFor property to match the checkbox id;
            optionContainer.appendChild(optionText);

            optionsContainer.appendChild(optionContainer);
        });

        questionContainer.appendChild(optionsContainer);
        quizContainer.appendChild(questionContainer);

        // Create a div for the explanation
        const explanationContainer = document.createElement("div");
        explanationContainer.classList.add("explanation-container", "hidden"); // The explanation is hidden until the user clicks on it submit button
        explanationContainer.textContent = question.explanation;
        questionContainer.appendChild(explanationContainer);
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

    // Variables to count the number of answers (correct, incorrect and unanswered)
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredQuestions = 0;
    let hasError = false; // Variable to track if there's an error

    // Iterate over each question container in the quiz
    questionContainers.forEach((questionContainer, index) => {
        // Within each question container, find the checkbox buttons that are checked (selected by the user)
        const selectedOptions =
            questionContainer.querySelectorAll("input:checked");

        // Check if more than one option is selected
        if (selectedOptions.length > 1) {
            hasError = true;
            questionContainer.classList.add("error"); // Add error class to highlight the question
        } else {
            questionContainer.classList.remove("error");
        }
    });

    // If there's an error, alert the user and return early
    if (hasError) {
        alert("You can only choose one option for each question.");
        return; // Prevent the form from submitting
    }

    // If no errors, proceed to handle the submission
    questionContainers.forEach((questionContainer, index) => {
        const selectedOptions =
            questionContainer.querySelectorAll("input:checked");
        const options = questionContainer.querySelectorAll(".option-container");

        // Check if selected input is equal to options.isCorrect or not
        options.forEach((option, optionIndex) => {
            // Determine if the selected option is the correct answer
            const isCorrect = quizData[index].options[optionIndex].isCorrect;
            if (
                selectedOptions.length === 1 &&
                selectedOptions[0].value === optionIndex.toString()
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

        // If no option is selected, increment the unansweredQuestions
        if (selectedOptions.length === 0) {
            unansweredQuestions++;
        }

        // Show the explanation
        const explanationContainer = questionContainer.querySelector(
            ".explanation-container"
        );
        explanationContainer.classList.remove("hidden");
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

// Function to convert a kebab-case string to Title Case
function convertToTitleCase(str) {
    return str
        .split("-") // Split the string by dash
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitalize the first letter of each word
        .join(" "); // Join the words back together with spaces
}

// Function to exit the quiz and return to quiz subjects page
function exitQuiz() {
    document.querySelector("main").classList.remove("hidden");
    document.getElementById("quiz-room").classList.add("hidden");
}

// Function to exit the results
function exitResults() {
    document.getElementById("searchResults").style.display = "none";
}
