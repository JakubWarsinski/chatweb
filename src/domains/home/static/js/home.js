const heading = document.getElementById("typing-heading");
const baseText = "Zacznij rozmowę";
let dotCount = 0;

setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    heading.textContent = baseText + ".".repeat(dotCount);
}, 500);