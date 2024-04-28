console.log('%c HI', 'color: firebrick')

async function displayBreeds() {
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");
    const allBreeds = await fetchBreeds();
    function renderBreeds(breeds) {
      for (const key in breeds) {
        const dogBreed = document.createElement("li");
        dogBreed.textContent = key;
        dogBreed.addEventListener("click", textColor);
        if (Array.isArray(breeds[key]) && breeds[key].length) {
          const brdSubList = document.createElement("ul");
          breeds[key].forEach(subBreed => {
            const dogSubBrd = document.createElement("li");
            dogSubBrd.textContent = subBreed;
            dogSubBrd.style.color = "#000000";
            dogSubBrd.addEventListener("click", textColor);
            brdSubList.appendChild(dogSubBrd);
          });
          dogBreed.appendChild(brdSubList);
        }
        breedList.appendChild(dogBreed);
      }
    }
  
    function emptyList() {
      const liCollection = document.querySelectorAll("#dog-breeds li");
      for (let i = 0; (li = liCollection[i]); i++) {
        li.parentNode.removeChild(li);
      }
    }
  
    dropdown.addEventListener("change", event => {
      let filteredBreeds = {};
      let letter = event.target.value;
      let filtered = Object.keys(allBreeds).filter(mainBreed =>
        mainBreed.startsWith(letter)
      );
      for (const key of filtered) {
        filteredBreeds[key] = allBreeds[key];
      }
      emptyList();
      renderBreeds(filteredBreeds);
    });
  
    function textColor(event) {
      event.target.style.color = "#009AE4";
    }
    renderBreeds(allBreeds);
  }
  
  async function fetchBreeds() {
    const resp = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await resp.json();
    return data.message;
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    displayBreeds();
  });