document.addEventListener("DOMContentLoaded", function () {
    const carouselImages = document.getElementById("carouselImages");
    const seeWorldButton = document.getElementById("seeWorld");
    const countryList = document.getElementById("countryList");

    // Function to fetch random images for the carousel
    function fetchCarouselImages() {
        const imageUrls = [
            'https://source.unsplash.com/featured/?tourism',
            'https://source.unsplash.com/featured/?nature',
            'https://source.unsplash.com/featured/?city',
            'https://source.unsplash.com/featured/?landscape',
            'https://source.unsplash.com/featured/?culture'
        ];

        // Clear the current images
        carouselImages.innerHTML = '';

        // Create carousel items dynamically
        imageUrls.forEach((url, index) => {
            const div = document.createElement('div');
            div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            div.innerHTML = `<img src="${url}" class="d-block w-100" alt="...">`;
            carouselImages.appendChild(div);
        });
    }

    // Function to fetch and display countries
    async function fetchCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();

            // Clear previous country list
            countryList.innerHTML = '';

            // Display country flags and names
            countries.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.className = 'col-md-3 mb-4 text-center';
                countryDiv.innerHTML = `
                    <img src="${country.flags.png}" alt="${country.name.common} flag" class="img-fluid" style="max-height: 100px;">
                    <h5>${country.name.common}</h5>
                `;
                countryList.appendChild(countryDiv);
            });
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    // Fetch carousel images on page load
    fetchCarouselImages();

    // Add event listener for the "Let's see the world" button
    seeWorldButton.addEventListener("click", () => {
        fetchCountries();
    });
});
