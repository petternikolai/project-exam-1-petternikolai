// blogPage.js

import { getBlogPosts, posts } from "./app.js";

const postsPerPage = 10;
let currentPage = 1;

async function displayBlogPosts() {
  try {
    // Fetch the blog posts
    await getBlogPosts();

    const postsGrid = document.querySelector(".posts-grid");
    const seeMoreButton = document.querySelector("#see-more-button");

    // Clear the existing posts
    postsGrid.innerHTML = "";

    // Display the initial posts
    displayPosts();

    // Handle "See More" button click
    seeMoreButton.addEventListener("click", () => {
      // Increment the current page
      currentPage++;

      // Display the next set of posts
      displayPosts();
    });
  } catch (error) {
    console.error(error);
  }
}

function displayPosts() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToDisplay = posts.slice(startIndex, endIndex);

  // Iterate through the posts to create elements for each blog post
  for (const post of postsToDisplay) {
    // Create HTML elements for a blog post
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog-post");
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
    const postsGrid = document.querySelector(".posts-grid");
    postsGrid.appendChild(postContainer);
  }

  // Show "See More" button if there are more posts to display
  const seeMoreButton = document.querySelector("#see-more-button");
  seeMoreButton.style.display = endIndex < posts.length ? "block" : "none";
}

// Call the function when the page loads
displayBlogPosts();
