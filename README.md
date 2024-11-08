## Country Explorer Documentation

This documentation details the features and implementation of the "Country Explorer" web application, which leverages the RestCountries API to display country information.

### 1. Overview

The Country Explorer website provides users with an interactive interface to discover and learn about different countries. Key features include:

- **Country Card Display:** Displays country cards with essential information (flag, name) and interactive elements.
- **Favorites Section:** Allows users to save up to 5 favorite countries for quick access.
- **Search Functionality:** Enables users to find specific countries using a search bar and auto-suggestions.
- **Filtering:** Provides options to filter countries by language and region.
- **Details Page:** Offers in-depth information about a selected country, including capital, population, area, languages, and more.
- **Load More Button:** Allows users to progressively load more country cards as needed.

### 2. Technical Details

**2.1. Technologies:**

- **HTML:**  Defines the structure of the web pages.
- **CSS:**  Styles the user interface and ensures responsiveness across different devices.
- **JavaScript:** Provides interactivity and dynamic data fetching.
- **RestCountries API:** A public API that provides access to country data.
- **Local Storage:** Used to store user favorites.

**2.2. Project Structure:**

- **index.html:**  The main page of the application, displaying the country cards, search bar, filters, and favorites section.
- **style.css:**  Contains the CSS styles for the entire application.
- **script.js:**  Handles all JavaScript logic, including data fetching, DOM manipulation, search, filtering, and favorite management.
- **details.html:**  Displays detailed information about a selected country.
- **details.css:**  Styles the country details page.
- **details.js:**  Handles data fetching and display of country details on the details page.

### 3. Implementation Details

**3.1. Data Fetching:**

- The application uses the RestCountries API (https://restcountries.com/v3.1/all) to fetch a list of all countries.
- The fetched data is stored in the `allCountries` array.
- Data for individual countries is fetched dynamically when a user selects a country card.

**3.2. Country Card Display:**

- The `displayCountries` function generates HTML elements for each country, displaying its flag and name.
- The `card` elements are appended to the `country-list` div.
- Each card has a click event handler that navigates the user to the `details.html` page with the selected country's name as a query parameter.

**3.3. Favorites Section:**

- The `favorites` array, stored in local storage, keeps track of the user's favorite countries.
- The `displayFavorites` function generates a list of favorite countries in the `favorites-list` div.
- The `toggleFavorite` function adds or removes a country from the `favorites` array and updates local storage.

**3.4. Search Functionality:**

- Users can type in the search bar to find specific countries.
- The `searchCountries` function filters the `allCountries` array based on the search query and updates the country card display.
- The `suggestionsContainer` displays a list of potential matches as the user types, enhancing the search experience.

**3.5. Filtering:**

- Filters are implemented using two dropdown menus: language and region.
- The `populateFilters` function populates the dropdown options from the available data in the `allCountries` array.
- The `filterCountries` function updates the country card display based on the selected filters.

**3.6. Details Page:**

- The `details.html` page displays detailed information about the selected country.
- The `displayCountryDetails` function fetches additional country data and populates the `country-info` section with relevant information.
- The `toggleFavoriteDetailPage` function allows users to add or remove a country from their favorites directly on the details page.

### 4. Future Enhancements

- Implement pagination for the country list to improve performance with larger datasets.
- Add more filters, such as population range, continent, etc.
- Allow users to customize the display of country information (e.g., order of fields).
- Consider using a more robust data storage mechanism for favorites, like IndexedDB, for better offline support.
- Integrate a map to visually display the location of selected countries.

### 5. Usage Instructions

1. Clone or download the project files.
2. Open `index.html` in a web browser.
3. Explore the country cards, search for countries, filter based on language and region, and add favorites.
4. Click on a country card to view its details page.

By following this documentation, you can understand the workings of the Country Explorer application, its technical aspects, and possible future enhancements. 
