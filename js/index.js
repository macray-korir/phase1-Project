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
  
// Function to display the search results on the page
function displaySearchResults(data) {
    resultsContainer.innerHTML = '';
  
    if (data.docs.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    data.docs.forEach(function(book) {
      const title = book.title || 'Title not available';
      const author = book.author_name?.[0] || 'Author not available';
      const coverId = book.cover_i || '';
      const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      const bookId = book.key || '';
  
      const bookCard = document.createElement('div');
      bookCard.classList.add('bookCard');
      bookCard.innerHTML = `
        <img src="${coverUrl}" alt="${title} Cover">
        <h3>${title}</h3>
        <p>By: ${author}</p>
        <button class="like-button" data-book-id="${bookId}">
          <i class="far fa-heart"></i>
        </button>
      `;
  
      const likeButton = bookCard.querySelector('.like-button');
      const heartIcon = bookCard.querySelector('.heart-icon');
  