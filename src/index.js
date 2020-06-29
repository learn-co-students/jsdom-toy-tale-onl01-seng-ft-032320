let addToy = false;

function addToyCards() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => json.forEach(toy => renderToys(toy)))
}

function renderToys(toy) {
  const mainDiv = document.querySelector("#toy-collection")
  const newDiv = document.createElement("div")
  newDiv.classList.add("card")
  mainDiv.appendChild(newDiv)
  
  const heading = document.createElement("h2")
  heading.innerText = toy["name"]
  newDiv.appendChild(heading)

  const img = document.createElement("img")
  img.src = toy["image"]
  img.classList.add("toy-avatar")
  newDiv.appendChild(img)

  const pTag = document.createElement("p")
  pTag.innerText = `${toy["likes"]} Likes`
  newDiv.appendChild(pTag)

  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.innerText = "Like <3"
  newDiv.appendChild(button)
  button.addEventListener("click" , () => {
    event.preventDefault()
    likes = parseInt(pTag.innerText.split(" ")[0]) + 1
    pTag.innerText = `${likes} Likes`
    updateLike(likes, toy["id"])
  })
}

function updateLike(likes, toy) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": likes})
  }

  fetch(`http://localhost:3000/toys/${toy}`,configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      console.log(json)
      console.log("successfully updated likes")
    })
    .catch(function(error) {
      alert("There was an error updating the db")
      console.log(error.message)
    })
}

function addNewToy() {
  const toyName = document.querySelector('input[name="name"').value
  const toyImage = document.querySelector('input[name="image"').value
  document.querySelector('input[name="name"').value = ""
  document.querySelector('input[name="image"').value = ""
  let toyObject = {"name":toyName, "image":toyImage, "likes":"0"}

  renderToys(toyObject)

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObject)
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      console.log(object)
      console.log("Successfully added to db")
    })
    .catch(function(error) {
      alert("There was an error attempting to post")
      console.log(error.message)
    })
}

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
  const newToyButton = document.querySelector(".submit")
  newToyButton.addEventListener("click", () => {
    event.preventDefault()
    addNewToy()
  })
  addToyCards()
});
