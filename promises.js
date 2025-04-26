// CODE FOR FETCH API (DUMMY JSON)
function fetchPostsWithTimeout(timeout = 5000) {
    return new Promise((resolve, reject) => {
      const fetchPromise = fetch('https://dummyjson.com/posts')
        .then(response => {
          if (!response.ok) {
            reject("Failed to fetch posts.");
          }
          return response.json();
        })
        .then(data => resolve(data.posts))
        .catch(error => reject("Error: " + error.message));
  
      const timeoutId = setTimeout(() => {
        reject("Operation timed out.");
      }, timeout);
  

      fetchPromise.finally(() => clearTimeout(timeoutId));
    });
  }
  
  // CODE FOR Event listener FOR BUTTON
  document.getElementById("promiseBtn").addEventListener("click", () => {
    const resultDiv = document.getElementById("promiseResult");
    resultDiv.textContent = "Loading...";
  
    fetchPostsWithTimeout(5000)
      .then(posts => {
        resultDiv.innerHTML = "<h3>Post Titles:</h3><ul>";
        posts.forEach(post => {
          resultDiv.innerHTML += `<li>${post.title}</li>`;
        });
        resultDiv.innerHTML += "</ul>";
      })
      .catch(error => {
        resultDiv.textContent = error;
      });
  });
  