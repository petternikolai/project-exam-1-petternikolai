// contact.js

function validateForm(event) {
  event.preventDefault(); // Prevent form submission for now

  // Get form input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Reset error messages
  resetErrors();

  // Validate inputs and accumulate errors
  const errors = [];

  if (name.length < 5) {
    errors.push("Name should be more than 5 characters.");
  }

  if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (subject.length < 15) {
    errors.push("Subject should be more than 15 characters.");
  }

  if (message.length < 25) {
    errors.push("Message content should be more than 25 characters.");
  }

  // Display accumulated errors
  if (errors.length > 0) {
    displayErrors(errors);
    return;
  }

  // If all validations pass, you can proceed with form submission or other actions
  // For now, you can just log the data to the console
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  // Optionally, reset the form
  document.getElementById("contactForm").reset();
}

// Add event listeners for input fields
document
  .getElementById("name")
  .addEventListener("click", () => resetError("name"));
document
  .getElementById("email")
  .addEventListener("click", () => resetError("email"));
document
  .getElementById("subject")
  .addEventListener("click", () => resetError("subject"));
document
  .getElementById("message")
  .addEventListener("click", () => resetError("message"));

function resetError(field) {
  document.getElementById(`${field}Error`).textContent = "";
  document.getElementById(field).classList.remove("error-input");
}

function isValidEmail(email) {
  // A simple email validation pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayErrors(errors) {
  // Display errors under the corresponding input fields
  errors.forEach((error) => {
    // Find the field name corresponding to the error
    const field = errorFields.find((fieldName) =>
      error.toLowerCase().includes(fieldName)
    );

    if (field) {
      const errorElement = document.getElementById(`${field}Error`);
      errorElement.textContent = error;

      // Add a class to the input field for styling
      document.getElementById(field).classList.add("error-input");
    }
  });
}

function resetErrors() {
  // Reset all error messages and remove the error class from input fields
  errorFields.forEach((field) => {
    const errorElement = document.getElementById(`${field}Error`);
    const inputField = document.getElementById(field);

    errorElement.textContent = "";
    inputField.classList.remove("error-input");
  });
}

function resetErrors() {
  // Reset all error messages
  errorFields.forEach((field) => {
    const errorElement = document.getElementById(`${field}Error`);
    errorElement.textContent = "";
  });
}

// Array to map errors to input fields
const errorFields = ["name", "email", "subject", "message"];
