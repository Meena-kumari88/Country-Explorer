async function fetchCountryDetails(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const country = await response.json();
    return country[0]; 
}

async function displayCountryDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');
    const country = await fetchCountryDetails(countryName);

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
}

// Call the function to display country details
displayCountryDetails();
