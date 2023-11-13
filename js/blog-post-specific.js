async function displaySpecificPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  try {
    // Fetch the specific blog post data including the image URL
    const response = await fetch(
      `https://project-exam-1-petternikolai.no/wp-json/wp/v2/posts/${postId}`
    );

    if (response.ok) {
      const post = await response.json();

      // Set the document title to "Blog | TITLE OF BLOG POST"
      document.title = `Blog | ${post.title.rendered}`;

      // Display the content of the specific blog post
      const postContainer = document.querySelector(".specific-post");
      postContainer.innerHTML = `
          <img src="${post.better_featured_image.source_url}" alt="${post.title.rendered}">
          <h1>${post.title.rendered}</h1>
          <p>${post.content.rendered}</p>
        `;

      // Function to open the modal
      function openModal() {
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        modal.style.display = "block";
        modalImage.src = post.better_featured_image.source_url; // Replace with the URL of the larger image
      }

      // Function to close the modal
      function closeModal() {
        const modal = document.getElementById("imageModal");
        modal.style.display = "none";
      }

      // Event listener to open the modal when clicking the image
      const imageElement = document.querySelector(".specific-post img");
      imageElement.addEventListener("click", openModal);

      // Event listener to close the modal when clicking the close button
      const closeModalButton = document.querySelector(".close-modal");
      closeModalButton.addEventListener("click", closeModal);

      // Event listener to close the modal when clicking outside the modal
      const modal = document.getElementById("imageModal");
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    } else {
      console.error("Failed to fetch the specific blog post");
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching the specific blog post",
      error
    );
  }
}

// Call the function to display the specific blog post
displaySpecificPost();
