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
  //event listener for when new card is created
  let form = document.querySelector("body > div.container > form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = {
      name: form.name.value,
      image: form.image.value,
      likes: 0,
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    return fetch("http://localhost:3000/toys", configObj)
      .then(function (response) {
        return response.json();
      })
      .then((toy) => toyCards(toy));
  });

  fetchImages();
});

// gets the data from api
function fetchImages() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => rendertoyCards(toys));
}

//displays all the toys on the screen
function rendertoyCards(toys) {
  toys.forEach((toy) => toyCards(toy));
}

//creates card for single toy
function toyCards(toy) {
  let id = toy.id;

  let toyCollection = document.querySelector("#toy-collection");
  let toyCard = document.createElement("div");
  toyCard.setAttribute("class", "card");
  toyCard.setAttribute("id", id);
  let toyName = document.createElement("h2");

  let img = document.createElement("img");
  img.setAttribute("class", "toy-avatar");

  let p = document.createElement("p");

  let button = document.createElement("button");
  button.setAttribute("class", "like-btn");

  toyName.innerText = toy.name;
  img.src = toy.image;
  p.innerText = toy.likes + " Likes";
  button.innerText = "Like <3";
  button.addEventListener("click", () => {
    let currentCard = document.querySelector(
      "body > #toy-collection > div.card"
    );
    console.log(currentCard);
    p.innerText = toy.likes++ + " Likes";
    fetch("http://localhost:3000/toys/`${id}`", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: +1,
      }),
    });
  });
  toyCollection.appendChild(toyCard);
  toyCard.appendChild(toyName);
  toyCard.appendChild(img);
  toyCard.appendChild(p);
  toyCard.appendChild(button);
}
