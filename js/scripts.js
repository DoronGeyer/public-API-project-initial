/*   PUBLIC API PROJECT AIMING FOR EXCEEDS*/
//global variables.
const galleryDiv = document.getElementById("gallery");
const pageBody = document.getElementsByTagName("body")[0];

/* API request functionality */
async function fetchUrlData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return console.log("there was an error ", error);
  }
}
fetchUrlData("https://randomuser.me/api/?nat=US&results=12")
            .then((data) => {
                let newData= data;
                data.forEach(index => createCardElements(index))
                    return newData;
                })
               .then(data=> modalConstructor(data[0]));

//Search input construction using IIFE
!(function () {
  document.getElementsByClassName("search-container")[0]
          .insertAdjacentHTML( "beforeend",
            `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`);
})();
                       
//Card constructor function
function createCardElements(index) {
      let cardHTMLelement = `
          <div class="card">
          <div class="card-img-container">
              <img class="card-img" src= ${index.picture.large} alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${index.name.first} ${index.name.last}</h3>
              <p class="card-text">${index.email}</p>
              <p class="card-text cap">${index.location.city}, ${index.location.state}</p>
          </div>
      </div>`
  galleryDiv.insertAdjacentHTML('beforeend',cardHTMLelement);
};
//MODAL element constructor using template literals

function modalConstructor(person){
  const address = person.location;
  let contentHTML = 
  `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${person.picture.large} alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.phone.replace('-', ' ')}</p>
          <p class="modal-text">${address.street.number}${address.street.name}, ${address.city}, ${address.state} ${address.postcode}</p>
          <p class="modal-text">Birthday: ${person.dob.date = new Intl.DateTimeFormat('en-US').format(new Date(person.dob.date))}</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
</div>`
pageBody.insertAdjacentHTML('beforeend',contentHTML);
}
