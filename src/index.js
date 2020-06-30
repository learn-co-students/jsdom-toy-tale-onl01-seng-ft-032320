let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  fetchAllToys();
  submitData();


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


function render(toy) {

  const collectionDiv = document.querySelector("#toy-collection") 

  //create new dive to append into the collectionDiv
  const toyDiv = document.createElement("div")
  toyDiv.setAttribute("class", "card")
  toyDiv.setAttribute("id", `${toy.id}`)
  // attach the html code the way it was ask for. 
  toyDiv.innerHTML = 
  `
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" onClick= updateLikes(event)>Like <3</button>
  `;
  //  document.querySelector(".like-btn").addEventListener("click", updateLikes)
  // attach the child to the parent
  collectionDiv.appendChild(toyDiv)

}




function fetchAllToys(){
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then (function(data) {
    data.forEach(toy => render(toy))
  })

}


function submitData(){
  // get the form element 
  const formElement = document.querySelector(".add-toy-form")
  // create an event listener on form element on submit
  formElement.addEventListener("submit", (event) => {
    // prevent the default behavior
    event.preventDefault();
    // create varibles to store the pass values 
    const toyNameInput = document.querySelectorAll(".add-toy-form")[0][0]

    const toyImageInput = document.querySelectorAll(".add-toy-form")[0][1]
    // create a formData variable that holds the values that were pass as objects
    let formData = {
      name: toyNameInput.value,
      image: toyImageInput.value,
      likes: 0
    } ;

    // create a config object
    let configObj = {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    // create a fetch function 
    fetch("http://localhost:3000/toys", configObj)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      // find a way to use renderToy() function to add to the webpage the new created toy. 
      render(data);
    })
    
  })

}

function updateLikes() {
  // create a variable to hold the button element, id of the card and the current like value.
  let button = event.target;
  let buttonParent = button.parentElement;
  let currentLikes = parseInt(event.target.parentElement.querySelector("p").innerText.split(" ")[0])
  // create a formdata variable to hold the  data that will be updated
  let formData = {
  likes: currentLikes + 1
  }
  // create a configObj for update
  let configObj = {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  // create the fetch function
  fetch(`http://localhost:3000/toys/${buttonParent.id}`, configObj)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    document.getElementById(`${data.id}`).querySelector("p").innerHTML = `${data.likes} likes`;
    
  })
}