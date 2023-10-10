const yourAccessKey = "YOUR_UNSPLASH_ACCESS_KEY";
const API_URL = "https://api.unsplash.com/search/photos?";
const form = document.querySelector("form");
const input = document.getElementById("searchInput");
const searchResults = document.querySelector(".searchResults");
const showMoreBtn = document.getElementById("showMoreBtn");

let inputData = "";
let pageNo = 1;

async function searchImages() {
    inputData = input.value;
    const URL = `${API_URL}page=${pageNo}&query=${inputData}&client_id=${yourAccessKey}`;
    const response = await fetch(URL);
    const data = await response.json();
    const results = data.results;

    if (pageNo === 1) {
        searchResults.innerHTML = "";
    }
    results.map( (result) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("searchResult");
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(imgLink);
        searchResults.appendChild(imgWrapper);
    });

    pageNo++;
    if ( pageNo > 1) {
        showMoreBtn.style.display = "block";
    }
}

form.addEventListener("submit", (event) => {
   event.preventDefault();
   pageNo = 1;
   searchImages(); 
});

showMoreBtn.addEventListener("click", () => {
    searchImages(); 
 });