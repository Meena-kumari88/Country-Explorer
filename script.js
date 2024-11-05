function toggleSearch() {
  const searchBar = document.getElementById("searchBar");
  const searchIcon = document.getElementById("searchIcon");

  // Toggle active class for search bar visibility
  if (searchBar.classList.contains("active")) {
    searchBar.classList.remove("active");
    searchBar.style.display = "none";  
    searchIcon.style.display = "block"; 
  } else {
    searchBar.classList.add("active");
    searchBar.style.display = "flex";  
    searchIcon.style.display = "none"; 
  }
}
