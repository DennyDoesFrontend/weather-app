// const url = `'https://api.api-ninjas.com/v1/jokes?limit=1?key=H0+vlzH5vDjeijHUnZouVg==0o1vM4QEu6ubEJoV`

// async function getQuotes() {
//     const response = await fetch(url);
//     response = await response.json();
//     console.log(response.json());
// }

// getQuotes();
const jokeContainer = document.querySelector('.joke');
const jokeBtn = document.querySelector('.jokeBtn');

// Assuming you're using fetch or another HTTP library
async function getJoke() {
    const url = 'https://api.api-ninjas.com/v1/jokes?limit=1';
    const apiKey = 'H0+vlzH5vDjeijHUnZouVg==0o1vM4QEu6ubEJoV';
  
    try {
      const response = await fetch(url, {
        headers: {
          'X-API-Key': apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // Handle the API response data
      jokeContainer.textContent = data[0].joke;
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  }
  
  // Call the async function
 jokeBtn.addEventListener('click', ()=> {getJoke()})
  