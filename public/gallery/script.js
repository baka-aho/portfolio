const baseUrl = "http://localhost:3000/"; // Define your base URL here

function navigateTo(endpoint, element) {
  // Remove 'selected' class from all menu items
  const menuItems = document.querySelectorAll(".menu");
  menuItems.forEach((item) => item.classList.remove("selected"));

  // Add 'selected' class to the clicked item
  element.classList.add("selected");

  // Redirect to the specified endpoint
  window.location.href = baseUrl + endpoint;
}
