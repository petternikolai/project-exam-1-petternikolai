function toggleHamburgerMenu() {
  var overlay = document.querySelector(".hamburger-overlay");
  var hamburger = document.querySelector(".hamburger");

  // Toggle overlay display
  overlay.style.display = overlay.style.display === "block" ? "none" : "block";

  // Check the current state and update icon and class
  if (hamburger.innerHTML === "☰") {
    hamburger.innerHTML = "✕"; // Change to 'X'
    hamburger.classList.add("icon-x"); // Add class for 'X' styling
  } else {
    hamburger.innerHTML = "☰"; // Change back to hamburger icon
    hamburger.classList.remove("icon-x"); // Remove 'X' styling class
  }
}
