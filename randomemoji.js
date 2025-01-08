// randomemoji.js
function displayRandomEmojis() {
    const emojiContainer = document.getElementById("display-emoji");
    emojiData.forEach((item) => {
      const emojiElement = document.createElement("div");
      emojiElement.textContent = item.emoji;
      emojiElement.style.fontSize = "30px";
      emojiContainer.appendChild(emojiElement);
    });
  }
  
  // Call this function when the page loads
  document.addEventListener("DOMContentLoaded", displayRandomEmojis);
  