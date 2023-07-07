// Get the necessary DOM elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

// Array to store liked book IDs
let likedBooks = [];

// Event listener for form submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      searchBooks(searchTerm);
    }
  });

  // Function to search for books based on the entered search term
function searchBooks(searchTerm) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`;
  
    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unable to retrieve search results.');
        }
      })
      .then(function(data) {
        displaySearchResults(data);
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }
  