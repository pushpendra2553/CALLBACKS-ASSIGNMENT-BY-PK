// CODE FOR 5 SECONDS TIMER (SETTIMEOUT)
function fetchWithTimeout(resource, options = {}, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Operation timed out"));
      }, timeout);
  
      fetch(resource, options)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }
  
  // CODE FOR FETCH API (DUMMY JSON)
  async function fetchPosts() {
    const resultDiv = document.getElementById("asyncResult");
    resultDiv.textContent = "Loading... Please wait.";
  
    try {
      const response = await fetchWithTimeout("https://dummyjson.com/posts");
  
      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }
  
      const data = await response.json();
      displayPosts(data.posts);
    } catch (error) {
      resultDiv.textContent = `Error: ${error.message}`;
    }
  }
  
// CODE FOR DISPLAY POSTS FUNCTION
  function displayPosts(posts) {
    const resultDiv = document.getElementById("asyncResult");
    resultDiv.innerHTML = "<h3>Post Titles:</h3><ul>";
  
    posts.forEach(post => {
      resultDiv.innerHTML += `<li>${post.title}</li>`;
    });
  
    resultDiv.innerHTML += "</ul>";
  }
  
  // CODE FOR BUTTON EVENT LISTENER
  document.getElementById("asyncBtn").addEventListener("click", fetchPosts);
  