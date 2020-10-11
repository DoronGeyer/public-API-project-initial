/*   PUBLIC API PROJECT AIMING FOR EXCEEDS*/
//DOM element references
const galleryDiv = document.getElementById("gallery");
const pageBody = document.getElementsByTagName("body")[0];
const searchContainer = document.querySelector("body > header > div > div.search-container");
const h1 = document.querySelector(".h1-text");
//User interactivity values and references
let modalDiv = null;
let userListLoaded = [];
let filteredList = [];
let currentModalUserIndex = 0;
/****************** API request functionality ******************/
async function fetchUrlData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    galleryDiv.textContent =` "there was an error ", ${error}`
    return console.log("there was an error ", error);
  }
}

/******************Card constructor function**************/
function createCardElements(index) {
  let cardHTMLelement = `
          <div class="card">
          <div class="card-img-container">
              <img class="card-img" src= ${index.picture.large} alt= "${index.name.first} ${index.name.last}">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${index.name.first} ${index.name.last}</h3>
              <p class="card-text email" >${index.email}</p>
              <p class="card-text cap">${index.location.city}, ${index.location.state}</p>
          </div>
      </div>`;
  galleryDiv.insertAdjacentHTML("beforeend", cardHTMLelement);
}
/******************MODAL element constructor using template literals**************/
//important to note, close button is using onclick html handler to remove modal window.
function modalConstructor(person) {
  const address = person.location;
  let contentHTML = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class="strong-tag">X</strong></button>
      <div class="modal-info-container .shadow">
          <img class="modal-img" src=${person.picture.large} alt="profile photo">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text" id= "modal-email">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.phone.replace("-", " ")}</p>
          <p class="modal-text">${address.street.number} ${address.street.name}, ${address.city}, ${address.state} ${address.postcode}</p>
          <p class="modal-text">Birthday: ${(person.dob.date = new Intl.DateTimeFormat("en-US")
                                          .format(new Date(person.dob.date)))}</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" ${currentModalUserIndex == 0 ? "disabled" :''} class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" ${currentModalUserIndex == filteredList.length-1 ?"disabled":''} class="modal-next btn">Next</button>
  </div>
</div>`;
  pageBody.insertAdjacentHTML("beforeend", contentHTML);
  modalDiv = document.querySelector("body > div.modal-container");
  modalDiv.addEventListener("click", (e) => modalButtonHandler(e));
}
/******************EVENT HANDLER FUNCTIONS**************/
//function to search through cards an hide non matching cards from display.
function searchUsers(e) {
  let cardCollection = document.getElementsByClassName("card");
  let iterable = [...cardCollection];
  if (e.target.tagName === "INPUT" || e.target.id === "search-submit") {
    searchInput = document.querySelector("#search-input").value.toLowerCase();
    for (const card of iterable) {
      let cardName = card.querySelector("h3").textContent.toLowerCase();
      if (cardName.includes(searchInput)) {
        card.classList.add("show-card");
        card.style.display = "inherit";
      } else {
        card.classList.remove("show-card");
        card.style.display = "none";
      }
    }
    filteredList = userListLoaded.filter((person) =>
      `${person.name.first} ${person.name.last}`
        .toLowerCase()
        .includes(searchInput)
    );
    filteredList.length>0?h1.textContent ="EMPLOYEE DIRECTORY" : h1.textContent="NO RESULTS FOUND" ;
  } else {
    filteredList = userListLoaded;
  }
}

//Funciton to compare the email value as a unique identifier on click with the userListLoaded data and pass it to constructor
function checkModalMatch(event) {
  if (event.target.closest("div.card")) {
    let userEmail = event.target.closest("div.card").querySelector("p.email").textContent;
    for (let i = 0; i < filteredList.length; i++) {
      const currentUser = filteredList[i];
      if (currentUser.email === userEmail) {
        currentModalUserIndex = i;
        modalConstructor(currentUser);
      }
    }
  }
}
// Function for handling user click events on modal buttons.
function modalButtonHandler(e) {
  if (e.target.className === "modal-close-btn" ||e.target.className === "strong-tag") {
    pageBody.removeChild(modalDiv);
  }
  if (e.target.id === "modal-prev") {
      pageBody.removeChild(modalDiv);
      let newModalIndex = currentModalUserIndex - 1;
      currentModalUserIndex = newModalIndex;
      modalConstructor(filteredList[newModalIndex]);
    }
    if (e.target.id === "modal-next") {
        pageBody.removeChild(modalDiv);
        let newModalIndex = currentModalUserIndex + 1;
        currentModalUserIndex = newModalIndex;
        modalConstructor(filteredList[newModalIndex]);             
  } 
}

//Program initialisation.
fetchUrlData("https://randomuser.me/api/?nat=US&results=12").then((data) => {
  data.forEach((index) => createCardElements(index));
  userListLoaded = data;
  filteredList = userListLoaded;
});
/******************EVENT LISTENERS**************/
galleryDiv.addEventListener("click", (e) => checkModalMatch(e));
searchContainer.addEventListener("keyup", (e) => searchUsers(e));
searchContainer.addEventListener("click", (e) => searchUsers(e));
