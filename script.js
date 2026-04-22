/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

let pageSize = 25;

let pageNumber = 1;

let currentStreamers = [];

let filteredStreamers = [];


function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  // setup pagination
  let startIndex = (pageNumber - 1) * pageSize;
  let endIndex = startIndex + pageSize;
  let pageList = currentStreamers.slice(startIndex, endIndex);

  for (let i = 0; i < pageList.length; i++) {

    // channel name string
    let name = pageList[i]["Channel"];

    // average viewers integer
    let viewers = pageList[i]["Average viewers"];

    // image path
    let image = "avatars/" + name + ".png";

    // affiliated boolean
    let affiliated = pageList[i]["Partnered"];

    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, name, image, viewers, affiliated);
    cardContainer.appendChild(nextCard);
  }
}

// update text tags on page
function updatePagination() {
  let totalPages = Math.ceil(currentStreamers.length / pageSize);
  if (totalPages === 0) {
    totalPages = 1;
  }

  let curDisplay = document.getElementById("currentPageDisplay");
  curDisplay.textContent = pageNumber;

  let totalDisplay = document.getElementById("totalPagesDisplay");
  totalDisplay.textContent = totalPages;

  let subtitle = document.querySelector(".catalog-subtitle");
  let showing = Math.min(pageSize, currentStreamers.length);
  subtitle.textContent = "Showing " + showing + " of " + currentStreamers.length + " channels";

  let prevBtn = document.getElementById("prevPage");
  if (pageNumber === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  let nextBtn = document.getElementById("nextPage");
  if (pageNumber === totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}


// using template but editing card
function editCardContent(card, newName, newImageURL, newViewers, newAffiliated) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newName;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newName + " Poster";

  const cardViewers = card.querySelector(".viewers-text");

  let formattedViewers = newViewers;
  let tempViewers = parseInt(newViewers);

  // ex 50000 -> 50K
  if (tempViewers >= 1000) {
    formattedViewers = (tempViewers / 1000).toFixed(0) + "K";
  }

  cardViewers.textContent = formattedViewers;

  const badge = card.querySelector(".partner-badge");
  if (newAffiliated === "True") {
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }

  // console log to check card
  console.log("new card:", newName, "- html: ", card);
}

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
  );
}

// initialize variables
currentStreamers = streamers;

// call showCards on load
document.addEventListener("DOMContentLoaded", function () {
  showCards();
  updatePagination();
});

// map for fast lookups
let streamerCache = new Map();
for (let i = 0; i < streamers.length; i++) {
  streamerCache.set(streamers[i].Channel.toLowerCase(), streamers[i]);
}

// pagination hooks
let prevBtn = document.getElementById("prevPage");
prevBtn.addEventListener("click", function () {
  if (pageNumber > 1) {
    pageNumber--;
    showCards();
    updatePagination();
  }
});

let nextBtn = document.getElementById("nextPage");
nextBtn.addEventListener("click", function () {
  let totalPages = Math.ceil(currentStreamers.length / pageSize);
  if (pageNumber < totalPages) {
    pageNumber++;
    showCards();
    updatePagination();
  }
});

let pageSizeSelect = document.getElementById("pageSize");
pageSizeSelect.addEventListener("change", function (e) {
  pageSize = parseInt(e.target.value);
  pageNumber = 1;
  showCards();
  updatePagination();
});

// watch search bar
let searchBar = document.getElementById("searchInput");
searchBar.addEventListener("input", function (e) {
  let query = e.target.value.toLowerCase();
  updateCards(query);
});

// watch sort button
let sortType = "viewers";
let filterBtn = document.querySelector(".filter-btn");

// change default text on load
filterBtn.innerHTML = filterBtn.innerHTML.replace("Filters", "Sort: Viewers");

filterBtn.addEventListener("click", function () {
  if (sortType === "viewers") {
    sortType = "name";
    filterBtn.innerHTML = filterBtn.innerHTML.replace("Sort: Viewers", "Sort: Name");
  } else {
    sortType = "viewers";
    filterBtn.innerHTML = filterBtn.innerHTML.replace("Sort: Name", "Sort: Viewers");
  }
  
  let query = document.getElementById("searchInput").value.toLowerCase();
  updateCards(query);
});

// update cards on search
function updateCards(query) {
  // filter by name
  let filtered = streamers.filter(function (s) {
    return s.Channel.toLowerCase().includes(query);
  });

  // sort logic
  if (sortType === "viewers") {
    filtered.sort(function (a, b) {
      return b["Average viewers"] - a["Average viewers"];
    });
  } else if (sortType === "name") {
    filtered.sort(function (a, b) {
      if (a.Channel.toLowerCase() < b.Channel.toLowerCase()) {
        return -1;
      }
      if (a.Channel.toLowerCase() > b.Channel.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  // save array and reset page state
  currentStreamers = filtered;
  pageNumber = 1;

  // rebuild
  showCards();
  updatePagination();
}
