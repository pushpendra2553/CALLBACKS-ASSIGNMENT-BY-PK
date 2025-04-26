// Code for 5 second delay function
function simulateDelay(callback) {
    setTimeout(() => {
      callback(); 
    }, 5000);
  }
  
  function fetchAndDisplayPosts() {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Fetching Posts";
  
    // code for Fetch Api (Dummy Json)
    fetch('https://dummyjson.com/posts')
      .then(response => response.json())
      .then(data => {
        resultDiv.innerHTML = "<h3>Post Titles:</h3><ul>";
  
        data.posts.forEach(post => {
          resultDiv.innerHTML += `<li>${post.title}</li>`;
        });
        resultDiv.innerHTML += "</ul>";
      })
      .catch(error => {
        resultDiv.textContent = "Error fetched in data: " + error;
      });
  }
  
  // COde for Event listener for button
  document.getElementById("greetBtn").addEventListener("click", () => {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Callbacks Executed after 5 seconds. Please Wait........";
  

    simulateDelay(fetchAndDisplayPosts);
  });
  