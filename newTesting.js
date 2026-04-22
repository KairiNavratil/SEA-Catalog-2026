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

const pageSize = 25;

const pageNumber = 1;

let currentStreamers = [];

let filteredStreamers = [];


function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < streamers.length; i++) {

    // channel name string
    let name = streamers[i]["Channel"];

    // average viewers integer
    let viewers = streamers[i]["Average viewers"];

    // image path
    let image = "avatars/" + name + ".png";

    // affiliated boolean
    let affiliated = streamers[i]["Partnered"];

    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, name, image, viewers, affiliated);
    cardContainer.appendChild(nextCard);
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

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
  );
}

function removeLastCard() {
  names.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}
