// script.js
const countryList = document.getElementById('country-list');
const loadMoreButton = document.getElementById('load-more');
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');

let currentPage = 1;
const pageSize = 20; 
let allCountries = []; 

// Function to fetch countries
async function fetchCountries() {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    allCountries = await response.json(); 
    return allCountries;
}

function displayCountries(countries) {
  countryList.innerHTML = ''; 
  countries.forEach(country => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common} Flag">
          <h2>${country.name.common}</h2>
          <div class="favorite-icon" onclick="toggleFavorite(event)">
              <i class="far fa-heart"></i>
          </div>
      `;
      // Add click event to navigate to details page
      card.onclick = () => {
        window.location.href = `details.html?name=${encodeURIComponent(country.name.common)}`;
    };
      countryList.appendChild(card);
  });
}
function toggleFavorite(event) {
  const heartIcon = event.currentTarget.querySelector('i'); 
  heartIcon.classList.toggle('fas'); 
  heartIcon.classList.toggle('far');
}


// Load more countries
async function loadMoreCountries() {
    const countries = await fetchCountries();
    const paginatedCountries = countries.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    displayCountries(paginatedCountries);
    currentPage++;
}

// Initial load
loadMoreCountries();

// Load more button click event
loadMoreButton.addEventListener('click', loadMoreCountries);

// Search countries dynamically
function searchCountries() {
  const query = searchInput.value.trim().toLowerCase();
  suggestionsContainer.innerHTML = ""; 

  if (query.length > 0) {
      const filteredCountries = allCountries.filter(country =>
          country.name.common.toLowerCase().includes(query)
      ).slice(0, 5); 

      filteredCountries.forEach(country => {
          const suggestion = document.createElement('div');
          suggestion.textContent = country.name.common;
          suggestion.onclick = () => {
              // Clear previous country cards
              countryList.innerHTML = ""; 
              // Display selected country at the top
              displayCountries([country]);
              searchInput.value = ""; 
              suggestionsContainer.innerHTML = ""; 
              suggestionsContainer.style.display = 'none'; 
          };
          suggestionsContainer.appendChild(suggestion);
      });
         // Show or hide suggestions
         suggestionsContainer.style.display = filteredCountries.length > 0 ? 'block' : 'none';
        
         // "View all" interaction
         if (filteredCountries.length > 0) {
             const viewAll = document.createElement('div');
             viewAll.textContent = "View all results";
             viewAll.style.fontWeight = 'bold';
             viewAll.onclick = () => {
                 // Clear previous country cards
                 countryList.innerHTML = ""; 
                 // Show all matched countries
                 displayCountries(filteredCountries); 
                 suggestionsContainer.innerHTML = ""; 
                 searchInput.value = "";
                 suggestionsContainer.style.display = 'none'; 
             };
             suggestionsContainer.appendChild(viewAll);
         }
     } else {
         suggestionsContainer.style.display = 'none'; 
     }
 }

// Toggle search functionality
function toggleSearch() {
    const searchBar = document.getElementById("searchBar");
    const searchIcon = document.getElementById("searchIcon");

    if (searchBar.classList.contains("active")) {
        searchBar.classList.remove("active");
        searchBar.style.display = "none";  
        searchIcon.style.display = "block"; 
        suggestionsContainer.innerHTML = ""; 
        suggestionsContainer.style.display = 'none'; 
    } else {
        searchBar.classList.add("active");
        searchBar.style.display = "flex";  
        searchIcon.style.display = "none"; 
    }
}

// Initial fetch to populate allCountries
fetchCountries();
