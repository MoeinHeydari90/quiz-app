document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
    updateThemeIcon();

    const themeToggleButton = document.getElementById("theme-toggle");
    themeToggleButton.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "");
        } else {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark-mode");
        }
        updateThemeIcon();
    });
});

function updateThemeIcon() {
    const themeToggleButton = document.getElementById("theme-toggle");
    const themeIcon = themeToggleButton.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}
