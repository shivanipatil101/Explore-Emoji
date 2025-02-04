const emojiContainer = document.getElementById('emojiContainer');

function displayEmojis(data) {
  emojiContainer.innerHTML = ''; // Clear existing emojis
  data.forEach(emoji => {
    const div = document.createElement('div');
    div.className = 'emoji-item';
    div.textContent = emoji.emoji; // Use the emoji property
    div.title = emoji.description; // Set description as the title
    emojiContainer.appendChild(div);
  });
}
function filterEmojis(category) {
  if (category === 'all') {
    displayEmojis(emojiList); // Show all emojis
  } else {
    const filtered = emojiList.filter(emoji => emoji.category === category);
    displayEmojis(filtered);
  }
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase(); // Get the search query and convert it to lowercase

  // Get the currently selected category
  const activeCategoryButton = document.querySelector('.filter-btn.active');
  const activeCategory = activeCategoryButton ? activeCategoryButton.dataset.category : 'all';

  // Filter emojis based on both search query and category
  const filtered = emojiList.filter(emoji => {
    const matchesQuery =
      emoji.description.toLowerCase().includes(query) || // Match the query with the description
      emoji.aliases.some(alias => alias.toLowerCase().includes(query)) || // Match with aliases
      emoji.tags.some(tag => tag.toLowerCase().includes(query)); // Match with tags

    const matchesCategory =
      activeCategory === 'all' || emoji.category.toLowerCase().includes(activeCategory.toLowerCase()); // Match the selected category

    return matchesQuery && matchesCategory; // Both conditions must be true
  });

  displayEmojis(filtered); // Display emojis that match the query and category
});


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://akhil-06.github.io/emoji_project/emojiList.js')
    .then(response => response.text()) // Fetch raw JS file as text
    .then(script => {
      eval(script); // Execute the script to load emojiList
      if (typeof emojiList !== 'undefined') {
        displayEmojis(emojiList); // Display all emojis initially
      } else {
        console.error('Emoji list not found');
      }
    })
    .catch(err => console.error('Error fetching emoji data:', err));
});

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Add event listeners to all filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to the clicked button
      button.classList.add('active');

      // Get the category from the button's data-category attribute
      const category = button.dataset.category;

      // Filter and display emojis
      filterEmojis(category);
    });
  });
});

