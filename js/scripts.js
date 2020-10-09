/*   PUBLIC API PROJECT AIMING FOR EXCEEDS*/
//global variables.
const galleryDiv = document.getElementById("gallery");

/* API request functionality */
async function fetchUrlData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results[0]); //TODO: remove after completion just for reference
    return data.results;
  } catch (error) {
    return console.log("there was an error ", error);
  }
}
fetchUrlData("https://randomuser.me/api/?nat=US&results=12").
then((data) => {
  data.forEach((index) => {
        createCardElements(
                        index.picture.large,
                        index.name.first,
                        index.name.last,
                        index.email,
                        index.location.city,
                        index.location.state
        );
    });
});

/* DOM Element construction code */

// ELement constructor function
function createElement(elementType, classListArray, uniqueId = "none") {
  let newElement = document.createElement(elementType);
  if (uniqueId !== "none") {
    newElement.id = uniqueId;
  }
  newElement.classList.add(...classListArray);
  return newElement;
}
//Search input construction
!(function () {
  document.getElementsByClassName("search-container")[0]
          .insertAdjacentHTML(
            "beforeend",
            `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`
        );
})();
                       
//Card constructor function

function createCardElements(imgRef, first, last, email, city, state) {
  const cardDiv = createElement("DIV", ["card"]);
  const cardImgContainerDiv = createElement("DIV", ["card-img-container"]);
  const imgElement = createElement("IMG", ["card-img"]);
        imgElement.setAttribute("alt", "profile-picture");
        imgElement.src = `${imgRef}`;
  const cardInfoContainer = createElement("DIV", ["card-info-container"]);
  const h3 = createElement("H3", ["card-name", "cap"], "name");
        h3.textContent = `${first} ${last}`;
  const pEmail = createElement("P", ["card-text"]);
        pEmail.textContent = `${email}`;
  const pCityState = createElement("P", ["card-text", "cap"]);
        pCityState.textContent = `${city} ${state}`;

  galleryDiv.appendChild(cardDiv);
  cardDiv.appendChild(cardImgContainerDiv);
  cardImgContainerDiv.appendChild(imgElement);
  cardDiv.appendChild(cardInfoContainer);
  cardInfoContainer.appendChild(h3);
  cardInfoContainer.appendChild(pEmail);
  cardInfoContainer.appendChild(pCityState);
}
