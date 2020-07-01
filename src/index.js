let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  });

});


var mainObj = []

document.addEventListener('DOMContentLoaded', () => {
  var toyCollection = document.getElementById('toy-collection')

  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    // mainObj[1] = json;
    createCard(json)
  })
  
});


function createCard (jsonObj) {
  let toyCollection = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')

  for (const toy of jsonObj) {
    // console.log(toy)
    createToyElement(toy);
  }
}

function createToyElement(toyJson) {
  let toyCollection = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')


  toyCollection.appendChild(toyCard)

  createChildElements(toyCard, toyJson)
}

function createChildElements(toyCardElement, currentToy) {

  let headingh2 = document.createElement('h2')
  let headingimg = document.createElement('img')

  headingimg.src = currentToy['image']
  headingimg.classList.add('img')

  let headingp = document.createElement('p')
  let headingbutton = document.createElement('button')
  headingbutton.classList.add('like-btn')

  console.log(currentToy)
  headingh2.innerText = currentToy['name']
  headingp.innerText = `${currentToy['likes']} Likes`

  toyCardElement.appendChild(headingh2)
  toyCardElement.appendChild(headingimg)
  toyCardElement.appendChild(headingp)
  toyCardElement.appendChild(headingbutton)
}

let submitButton = document.getElementsByClassName('submit')
console.log(submitButton)
submitButton.addEventListener("click", function() {
  fetch ("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
      })
    
  })

})