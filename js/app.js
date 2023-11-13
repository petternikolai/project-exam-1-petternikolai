let posts = [];
const postsPerPage = 100;

export async function getBlogPosts() {
  try {
    const response = await fetch(
      `https://project-exam-1-petternikolai.no/wp-json/wp/v2/posts?per_page=${postsPerPage}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    posts = data;
  } catch (error) {
    console.error(error);
  }
}

export { posts };
