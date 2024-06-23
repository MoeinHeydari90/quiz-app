document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");

    // If a saved theme exists, apply it to the document body
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    // Update the theme icon to match the current theme
    updateThemeIcon();

    // Get the theme toggle button element
    const themeToggleButton = document.getElementById("theme-toggle");

    // Add a click event listener to the theme toggle button
    themeToggleButton.addEventListener("click", () => {
        // Check if the document body currently has the "dark-mode" class
        if (document.body.classList.contains("dark-mode")) {
            // If it does, remove the "dark-mode" class and clear the saved theme in localStorage
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "");
        } else {
            // If it doesn't, add the "dark-mode" class and save it in localStorage
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark-mode");
        }
        // Update the theme icon to reflect the new theme
        updateThemeIcon();
    });
});

// Function to update the theme icon based on the current theme
function updateThemeIcon() {
    // Get the theme toggle button element
    const themeToggleButton = document.getElementById("theme-toggle");
    // Get the icon element within the theme toggle button
    const themeIcon = themeToggleButton.querySelector("i");

    // Check if the document body currently has the "dark-mode" class
    if (document.body.classList.contains("dark-mode")) {
        // If it does, change the icon to a moon
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        // If it doesn't, change the icon to a sun
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}
