let addToy = false;

document.addEventListener ("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");
  const toyBox = document.getElementById('toy-collection');
  // const toyUrl = 'http://localhost:3000/toys'

  loadEvents();
  fetchToys();

  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(results => makeToys(results)
    );
  }

  function createToy(toy) {
    let card = document.createElement('div');
    let h2 = document.createElement('h2');
    let image = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');
  
    card.class = 'card'
  
    h2.innerText = toy.name
  
    image.src = toy.image;
    image.class = 'toy-avatar';
  
    p.innerText = toy.likes;
  
    button.className = 'like-btn';
    button.innerText = '<3';
  
    toyBox.appendChild(card);
    card.append(h2, image, p, button);
  }

  function makeToys(toys) {
    toys.forEach(toy => createToy(toy));
  }

  function submitToy() {
    console.log("submitted");
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: form.name.value, 
        image: form.image.value,
        likes: 0
      } )
    })
    .then(function(response) {
      response.json();
    })
    .then(function(object) {
      createToy(object)
    });
  }

  function likeToy(e) {
    if (event.target.className === "like-btn") {
      let id = event.target.parentElement.dataset.id
      let like = event.target.previousElementSibling
      let likeCount = parseInt(event.target.previousElementSibling.innerText)
      like.innerText = `${++likeCount} likes`
  
      fetch('http://localhost:3000/toys/' + id, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": likeCount
        })
  
      })
        .then(response => response.json())
        .then(console.log)
    }
  }

  function displayForm() {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }

  function submit(e) {
    e.preventDefault();
    submitToy();
  }

  function loadEvents() {
    addBtn.addEventListener("click", displayForm);
    form.addEventListener("submit", submit);
    toyBox.addEventListener("click", likeToy);
  }

})