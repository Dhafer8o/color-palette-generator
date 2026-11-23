const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function (e) {
    const colorBox = e.target.closest(".color-box");
    if (!colorBox) return;

    const hexValue = colorBox.querySelector(".hex-value").textContent.trim();
    const copyButton = colorBox.querySelector(".copy-btn");

    navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(copyButton))
        .catch((err) => console.error("Failed to copy:", err));
});

function showCopySuccess(element) {
    clearTimeout(element.resetTimer);

    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = "#48bb78";

    element.resetTimer = setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = "";
    }, 2000);
}

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    paletteContainer.innerHTML = "";

    colors.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");

        colorBox.innerHTML = `
            <div class="color" style="background-color: ${color};"></div>
            <div class="color-info">
                <span class="hex-value">${color}</span>
                <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
            </div>`;
        paletteContainer.appendChild(colorBox);
    });
}
