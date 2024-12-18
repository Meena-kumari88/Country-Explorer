const countryList = document.getElementById('country-list');
const loadMoreButton = document.getElementById('load-more');
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');
const favoritesSection = document.getElementById('favorites-section');
const favoritesList = document.getElementById('favorites-list');

let currentPage = 1;
const pageSize = 10;
let allCountries = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let selectedLanguage = '';
let selectedRegion = '';

// Fetch Functions
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        allCountries = await response.json();
        console.log(allCountries);

        // Populate the filters after countries are loaded
        populateFilters();
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// Load more countries
async function loadMoreCountries() {
    if (allCountries.length === 0) {
        await fetchCountries();
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedCountries = allCountries.slice(0, endIndex);
    displayCountries(paginatedCountries, true);
    currentPage++;
}

// Display Functions
function displayCountries(countries, append = false) {
    const displayLimit = 8;
    if (!append) {
        countryList.innerHTML = '';
    }
    const countriesToShow = (selectedLanguage || selectedRegion || searchInput.value.trim())
        ? countries.slice(0, displayLimit)
        : countries;

    countriesToShow.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card';

        //const favoriteClass = isFavorite(country.name.common) ? 'fas' : 'far';
        card.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common} Flag">
        <h2>${country.name.common}</h2>
    `;
        card.onclick = () => {
            // Navigate to details page with country name as a query parameter
            window.location.href = `details.html?name=${encodeURIComponent(country.name.common)}`;
        };
        countryList.appendChild(card);
    });
    loadMoreButton.style.display = countries.length > displayLimit ? 'block' : 'none';
}

function displayFavorites() {
    favoritesList.innerHTML = '';
    if (favorites.length > 0) {
        favoritesSection.style.display = 'block';
        favorites.forEach(favorite => {
            const favItem = document.createElement('div');
            favItem.className = 'favorite-item';
            favItem.innerHTML = `
                <img src="${favorite.flag}" alt="${favorite.name} Flag">
                <span class="country-name">${favorite.name}</span>
                <span class="remove-favorite" onclick="removeFavorite('${favorite.name}')">&times;</span>
            `;
            favoritesList.appendChild(favItem);
        });
    } else {
        favoritesSection.style.display = 'none';
    }
}

// Favorite Functions
function isFavorite(countryName) {
    return favorites.some(fav => fav.name === countryName);
}


function removeFavorite(name) {
    favorites = favorites.filter(fav => fav.name !== name);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    filterCountries();
    //displayCountries(allCountries.slice(0, currentPage * pageSize));
}

// Filter Functions
function populateFilters() {
    const languageSet = new Set();
    const regionSet = new Set();

    allCountries.forEach(country => {
        if (country.languages) {
            Object.values(country.languages).forEach(language => languageSet.add(language));
        }
        if (country.region) {
            regionSet.add(country.region);
        }
    });

    // Populate language options
    const languageFilter = document.getElementById('languageFilter');
    languageSet.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });

    // Populate region options
    const regionFilter = document.getElementById('regionFilter');
    regionSet.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

function filterCountries() {
    const query = searchInput.value.trim().toLowerCase();
    selectedLanguage = document.getElementById('languageFilter').value;
    selectedRegion = document.getElementById('regionFilter').value;

    const filteredCountries = allCountries.filter(country => {
        const matchesSearch = query ? country.name.common.toLowerCase().includes(query) : true;
        const matchesLanguage = selectedLanguage ? Object.values(country.languages || {}).includes(selectedLanguage) : true;
        const matchesRegion = selectedRegion ? country.region === selectedRegion : true;

        return matchesSearch && matchesLanguage && matchesRegion;
    });

    displayCountries(filteredCountries);

    // Hide the "Load More" button if any filter is active
    loadMoreButton.style.display = filteredCountries.length > 8 ? 'block' : 'none';
}

// Search Functionality
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
                document.getElementById('languageFilter').value = '';
                document.getElementById('regionFilter').value = '';
                countryList.innerHTML = "";
                displayCountries([country]);
                searchInput.value = "";
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = 'none';
            };
            suggestionsContainer.appendChild(suggestion);
        });

        suggestionsContainer.style.display = filteredCountries.length > 0 ? 'block' : 'none';

        if (filteredCountries.length > 0) {
            const viewAll = document.createElement('div');
            viewAll.textContent = "View all results";
            viewAll.style.fontWeight = 'bold';
            viewAll.onclick = () => {
                countryList.innerHTML = "";
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

    loadMoreButton.style.display = query ? 'none' : 'block';
}

// Toggle Search Functionality
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


// Initial Load
fetchCountries().then(() => {
    displayFavorites();
    loadMoreCountries();
});

// Event Listeners
loadMoreButton.addEventListener('click', loadMoreCountries);
searchInput.addEventListener('input', searchCountries);
document.getElementById('languageFilter').addEventListener('change', filterCountries);
document.getElementById('regionFilter').addEventListener('change', filterCountries);