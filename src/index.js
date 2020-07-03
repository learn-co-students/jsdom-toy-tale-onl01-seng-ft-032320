let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  getToys();
  newToy();
  addLike();
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

//get toys
function getToys() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
          return response.json();
    })
    .then(function(json){
    renderToys(json)
    })
}

function renderToys(toys) {
    
  let collection = document.getElementById('toy-collection')
  toys.forEach(toy => {
    const newToy = document.createElement('div')
    newToy.classList.add("card")

    const newName = document.createElement('h2')
    newName.textContent = toy.name
    newToy.appendChild(newName)

    const newImg = document.createElement('img')
    newImg.src = toy.image
    newImg.classList.add("toy-avatar")
    newToy.appendChild(newImg)

    const pTag = document.createElement('p')
    pTag.textContent = `${toy.likes} Likes`
    newToy.appendChild(pTag)

    const button = document.createElement('button')
    button.innerText = "Like <3"
    button.id = toy.id
    button.classList.add("like-btn")
    newToy.appendChild(button)

    collection.appendChild(newToy)
  })
}

//add toy

function newToy(){
  const button = document.getElementById('new-toy-btn')
  button.addEventListener('click', function(event) {
    console.log('Add a new Toy button was clicked!');
  });
  const newToyBtn = document.querySelector('.submit')
    newToyBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('Create a New Toy Button was clicked');

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": "Jessie",
          "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
          "likes": 0
        })
      }).then(function(response) {
          return response.json();
        })
        .then(function(json){
          renderToy(json)
        console.log(json)
        });

    });
};

function renderToy(toy) {
    
    let collection = document.getElementById('toy-collection')
  
    const newToy = document.createElement('div')
    newToy.classList.add("card")

    const newName = document.createElement('h2')
    newName.textContent = toy.name
    newToy.appendChild(newName)

    const newImg = document.createElement('img')
    newImg.src = toy.image
    newImg.classList.add("toy-avatar")
    newToy.appendChild(newImg)

    const pTag = document.createElement('p')
    pTag.textContent = "Likes"
    newToy.appendChild(pTag)

    const button = document.createElement('button')
    button.innerText = "Like <3"
    button.id = toy.id
    button.classList.add("like-btn")
    newToy.appendChild(button)

    collection.appendChild(newToy)
  
}

// Increase Likes

function addLike() {
  let collection = document.getElementById('toy-collection')
    collection.addEventListener('click', event => {
      event.preventDefault();
      console.log(event.target.id);
      getObject(event.target.id)
     })
}
    

function getObject(id){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
    let newNumber = ++object.likes
    buttonAction(id, newNumber)
  });
}


function buttonAction(id, newNumber){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
        "likes": `${newNumber}`
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
    let button = document.getElementById(object.id)
    let card = button.parentElement
    let pTag = card.querySelector('p')
    pTag.textContent = `${object.likes} Likes`
    console.log(pTag);
  });
}
