import { getBlogPosts, posts } from "./app.js";

async function displayBlogPostsInCarousel() {
  try {
    // Fetch the blog posts
    await getBlogPosts();

    const gridPosts = document.querySelector(".grid-posts");
    const leftButton = document.querySelector(".left-button");
    const rightButton = document.querySelector(".right-button");
    const paginationDots = document.querySelector(".dots");
    const postsPerPage = 4;
    let currentPage = 0;

    // Calculate the total number of pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Define a function to display posts on the current page
    function displayPosts() {
      // Clear the existing posts
      gridPosts.innerHTML = "";

      // Calculate the start and end index for the current page
      const startIndex = currentPage * postsPerPage;
      const endIndex = startIndex + postsPerPage;

      // Iterate through the 'posts' array and create elements for each blog post on the current page
      for (let i = startIndex; i < endIndex && i < posts.length; i++) {
        const post = posts[i];

        // Create HTML elements for a blog post
        const postContainer = document.createElement("div");
        postContainer.classList.add("post");
        postContainer.addEventListener("click", () => {
          // Redirect to the specific blog post page with the post ID as a query parameter
          window.location.href = `blog-post-specific.html?id=${post.id}`;
        });

        const postImage = document.createElement("img");
        postImage.src =
          post.better_featured_image.media_details.sizes.medium.source_url;
        postImage.alt = post.title.rendered;

        const postTitle = document.createElement("h3");
        postTitle.textContent = post.title.rendered;

        const postExcerpt = document.createElement("p");
        postExcerpt.innerHTML = post.excerpt.rendered;

        // Append the elements to the post container
        postContainer.appendChild(postImage);
        postContainer.appendChild(postTitle);
        postContainer.appendChild(postExcerpt);

        // Append the post container to the grid
        gridPosts.appendChild(postContainer);
      }
    }

    // Define a function to update the pagination dots
    function updatePaginationDots() {
      // Remove the existing dots
      paginationDots.innerHTML = "";

      // Create dots and add event listeners for each page
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("i");
        dot.classList.add(
          "fa",
          "fa-circle",
          i === currentPage ? "fa-solid" : "fa-regular"
        );
        dot.addEventListener("click", () => {
          currentPage = i;
          displayPosts();
          updatePaginationDots();
        });
        paginationDots.appendChild(dot);
      }
    }

    // Create event listener for the left button
    leftButton.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
      } else {
        // Wrap to the last page when on the first page
        currentPage = totalPages - 1;
      }
      displayPosts();
      updatePaginationDots();
    });

    // Create event listener for the right button
    rightButton.addEventListener("click", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
      } else {
        // Wrap to the first page when on the last page
        currentPage = 0;
      }
      displayPosts();
      updatePaginationDots();
    });

    // Initialize the carousel
    displayPosts();
    updatePaginationDots();
  } catch (error) {
    console.error(error);
  }
}

displayBlogPostsInCarousel();