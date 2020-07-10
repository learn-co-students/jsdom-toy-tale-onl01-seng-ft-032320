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

function collectToys() {
  return fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        toy_data
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      for (const data of object.toys) {

      toy = document.createElement("div");
      toy.class = "card";

      
      let name = document.createElement("h2");
      name.innerText = data["name"]
      toy.appendChild(name);

      let image = document.createElement("img");
      image.class = "toy-avatar"
      image.src = data["toy-image-url"]
      toy.appendChild(image)

      let likes = document.createElement("p");
      toy.appendChild(likes)

      let button = document.createElement("button");
      button.class = "like-btn";
      toy.appendChild(button);

      document.querySelector("div#toy-collection").appendChild(toy);

      }

    })
    .catch(function(error) {
      document.body.innerHTML = error.message
    })
}
