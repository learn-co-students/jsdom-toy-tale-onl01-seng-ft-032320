let addToy = false;

function getToys(){
  fetch("http://localhost:3000/toys")
  .then((response)=>response.json())
  .then((toyData)=>createInfoCard(toyData))
}

function updateToy(toy){
  console.log("Updating Toy")
  let toyElement = document.getElementById(toy.id)
  toyElement.lastChild.previousSibling.dataset.likes = toy.likes
  toyElement.lastChild.previousSibling.innerText = `${toy.likes} like(s)`
  console.log("Toy Updated");
  
}

function createSingleToy(toys) {
  const toyCollection = document.getElementById("toy-collection")

  let div = document.createElement("div")
  let h2 = document.createElement("h2")
  let img = document.createElement("IMG")
  let p = document.createElement("p")
  let button = document.createElement("button")
 
  div.className = "card"
  div.id = toys.id
  img.className = "toy-avatar"
  button.className = "like-btn"
  button.innerText = "<3"
  toyCollection.appendChild(div)
  h2.dataset.name = toys.name
  h2.innerText = toys.name
  img.src = toys.image
  p.dataset.likes = toys.likes
  p.innerText = `${p.dataset.likes} like(s)`
  
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)    
  div.appendChild(button)
  console.log("Added to DOM hopefully...")
}

function createAllToys(toys) {
  const toyCollection = document.getElementById("toy-collection")
  for (const toy of toys) {

    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    let img = document.createElement("IMG")
    let p = document.createElement("p")
    let button = document.createElement("button")
  
    div.className = "card"
    div.id = toy.id
    img.className = "toy-avatar"
    button.className = "like-btn"
    button.innerText = "<3"
    toyCollection.appendChild(div)
    h2.dataset.name = toy.name
    h2.innerText = toy.name
    img.src = toy.image
    p.dataset.likes = toy.likes
    p.innerText = `${p.dataset.likes} like(s)`
    
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)    
    div.appendChild(button)
  }
}

function createInfoCard(toys) {

  if (!Array.isArray(toys)){
    createSingleToy(toys)
  } else {
    createAllToys(toys)
  }

}



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector("body > div.container > form")
  const toyCollection = document.getElementById("toy-collection")


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()

  form.addEventListener("submit",(event)=>{
    event.preventDefault()
    console.log("Enterd")
    let toyData = {
      name: form.name.value,
      image: form.image.value,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    }

    fetch("http://localhost:3000/toys", configObj)    
    .then((response)=>response.json())
    .then(object => createInfoCard(object))

  })

  toyCollection.addEventListener("click", () => {
    if (event.target.tagName === "BUTTON"){
      let clicked = event.target
      let element = clicked.parentNode
      let toyURL = `http://localhost:3000/toys/${element.id}`
      let likeCount = parseInt(clicked.previousSibling.dataset.likes) + 1

      let toy = {
        likes: likeCount
      }

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(toy)
      }
    
      fetch(`${toyURL}`, configObj)    
      .then((response)=>response.json())
      .then(object => updateToy(object))
    }
  })

});
