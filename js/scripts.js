/*   PUBLIC API PROJECT AIMING FOR EXCEEDS*/
//global variables.
const galleryDiv = document.getElementById("gallery");
const pageBody = document.getElementsByTagName("body")[0];
let testPerson = '';
/* API request functionality */
async function fetchUrlData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json(); //TODO: remove after completion just for reference
    testPerson = data.results[0]
    console.log( testPerson)
    return data.results;
  } catch (error) {
    return console.log("there was an error ", error);
  }
}
fetchUrlData("https://randomuser.me/api/?nat=US&results=12")
            .then((data) => {
                data.forEach((index) => {
                        createCardElements(
                                        index.picture.medium,
                                        index.name.first,
                                        index.name.last,
                                        index.email,
                                        index.location.city,
                                        index.location.state
                        )
                    })
                })

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
//Search input construction using IIFE
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
            imgElement.setAttribute("alt","profile-picture");
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
};
//TODO:  I have added a person parameter based on array values. This will be used for all the property values in modal
//TODO:      a click event handler on the image should trigger a search through array for a matched value and then provide that index to the 
//TODO:       modalcostructor function.
//Modal constructor function
 function modalConstructor(person){
    const modalContainer = createElement('DIV',['modal-container']);
    const modalDiv = createElement('DIV',['modal']);
    const closeButton = createElement('BUTTON',['modal-close-button'],'modal-close-button');
          closeButton.innerHTML = `<strong>X</strong>`;
    const modalInfoContainer = createElement("DIV",['modal-info-container']);
    
    const modalImage = createElement('IMG',['modal-img']); 
            modalImage.src = `${person.picture.medium}`;
            modalImage.alt = 'profile picture';
    
    const h3 = createElement('H3',['modal-name','cap']);
          h3.innerHTML =`${person.name.first} ${person.name.last}`
    
    const pEmail = createElement('P',['modal-text']);
          pEmail.textContent= `${person.email}`;
    
    const pCity = createElement('P',['modal-text']);
          pCity.textContent= `${person.location.city}`;
    
          const hrBreak = createElement('HR',['hr-line-break']);
    const pPhoneNumber = createElement('P',['modal-text']);
          pPhoneNumber.textContent= `${person.phone.replace('-', ' ')}`;
    
    const pAddress = createElement('P',['modal-text']);
    const address = person.location;
          pAddress.textContent= `${address.street.number}${address.street.name}, ${address.city}, ${address.state} ${address.postcode}`;//123 Portland Ave., Portland, OR 97204
   
    const pBirthday = createElement('P',['modal-text']);
          pBirthday.textContent= `${person.dob.date = new Intl.DateTimeFormat('en-US').format(new Date(person.dob.date))}`;

    //exceeds additions
    const modalButtonContainer = createElement('DIV',['modal-btn-container']);
          modalButtonContainer.innerHTML= `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                           <button type="button" id="modal-next" class="modal-next btn">Next</button>`


    modalContainer.appendChild(modalDiv);
    modalDiv.appendChild(closeButton);
    modalDiv.appendChild(modalInfoContainer);
    modalInfoContainer.appendChild(modalImage);
    modalInfoContainer.appendChild(h3);
    modalInfoContainer.appendChild(pEmail);
    modalInfoContainer.appendChild(pCity);
    modalInfoContainer.appendChild(hrBreak);
    modalInfoContainer.appendChild(pPhoneNumber);
    modalInfoContainer.appendChild(pAddress);
    modalInfoContainer.appendChild(pBirthday);

    modalContainer.appendChild(modalButtonContainer);
    console.log(person)

};
modalConstructor(testPerson);
// test person is from the array of data pulled. it is index 0 of the 12 indeces logging to the console
/*
<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
======================== -->*/