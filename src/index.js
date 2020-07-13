let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchAllToys()
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

function fetchAllToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(toy => render(toy))
    addToyListeners()
  });
}

function render(toy){
  const toyCollection = document.querySelector('#toy-collection');
  toyCollection.innerHTML += `
    <div class='card' id='toy-${toy.id}'>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class='toy-avatar'/>
    <p>${toy.likes}</p>
    <button class='like-btn'>Like <3</button>
    </div>
    `
}

function addToyListeners(){
  let toy = document.querySelectorAll('.card')
  toy.forEach(toy => {
    toy.querySelector('.like-btn').addEventListener('click', (e) => {
      likeToy(e)
    })
  })
}

function likeToy(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": more
        })
      })
      .then(res => res.json())
      .then((data => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  }

  function submitData(){
    const formElement = document.querySelector(".add-toy-form")
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const toyNameInput = document.querySelectorAll(".add-toy-form")[0][0]
      const toyImageInput = document.querySelectorAll(".add-toy-form")[0][1]
      let formData = {
        name: toyNameInput.value,
        image: toyImageInput.value,
        likes: 0
      };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
}

    fetch(`http://localhost:3000/toys`, configObj)
    .then(resp => resp.json())
    .then(data => render(data))
  })
}