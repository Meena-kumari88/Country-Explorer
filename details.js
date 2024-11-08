async function fetchCountryDetails(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const country = await response.json();
    return country[0]; 
}

async function displayCountryDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');
    const country = await fetchCountryDetails(countryName);
    // Display the flag
    const countryFlag = document.getElementById('country-flag');
    countryFlag.src = country.flags.png;

    // Display country details
    const countryInfo = document.getElementById('country-info');
    countryInfo.innerHTML = `
        <p><strong>Top Level Domain:</strong> ${country.tld.join(', ')}</p>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Area:</strong> ${country.area} km²</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
    `;

    // Set country name in heading
    document.getElementById('country-name').textContent = country.name.common;

    // Set up favorite icon state
    const favoriteIcon = document.getElementById('favorite-icon');
    const isFavorited = isFavorite(country.name.common);
    favoriteIcon.innerHTML = `<i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>`;

    // Add click event listener to toggle favorite
    favoriteIcon.onclick = () => toggleFavoriteDetailPage(country.name.common, country.flags.png);
}

// Favorite Functions
function isFavorite(countryName) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.name === countryName);
}

function toggleFavoriteDetailPage(countryName, flagUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteIcon = document.getElementById('favorite-icon').querySelector('i');
    const isFavorited = isFavorite(countryName);

    if (isFavorited) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.name !== countryName);
    } else {
        // Add to favorites if less than 5
        if (favorites.length < 5) {
            favorites.push({ name: countryName, flag: flagUrl });
        } else {
            alert("You can only have up to 5 favorites.");
            return;
        }
    }

    // Toggle icon classes and save favorites
    favoriteIcon.classList.toggle('fas');
    favoriteIcon.classList.toggle('far');
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Call the function to display country details
displayCountryDetails();