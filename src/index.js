let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.getElementsByClassName("add-toy-form")[0];

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      renderToys(json);
    });

    function renderToys(toyBox) {
      for (const toy of toyBox) {
        let card = document.createElement("div"),
            name = document.createElement("h2"),
            avatar = document.createElement("img"),
            likes = document.createElement("p"),
            likesBtn = document.createElement("button");

        // set contents of elements
        name.innerText = toy.name;
        avatar.setAttribute("src", toy.image);
        likes.innerText = toy.likes + " Likes";
        likes.setAttribute("name", toy.name);
        likesBtn.innerText = "Like <3"

        // set classes of elements
        card.classList.add("card");
        avatar.classList.add("toy-avatar");
        likesBtn.classList.add("like-btn");

        // add event listeners
        likesBtn.addEventListener("click", function() {
          const destinationURL = "http://localhost:3000/toys/" + toy.id;
          let likesText = document.getElementsByName(toy.name)[0],
              likes = parseInt(likesText.innerText.replace(/[\sa-z]/gi, ""));

          configurationObject = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": likes + 1
            })
          }

          fetch(destinationURL, configurationObject)
            .then(function(response) {
              return response.json();
            })
            .then(function(object) {
              likes = object.likes;
              likesText.innerText = likes + " Likes";
            });
        });

        // add elements to their parents
        card.appendChild(name);
        card.appendChild(avatar);
        card.appendChild(likes);
        card.appendChild(likesBtn);
        toyCollection.appendChild(card);
      }
    }

    toyForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementsByName("name")[0],
            imgURL = document.getElementsByName("image")[0],
            destinationURL = "http://localhost:3000/toys";

      configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": name.value,
          "image": imgURL.value,
          "likes": 0
        })
      }

      fetch(destinationURL, configurationObject)
        .then(function(response) {
          return response.json();
        })
        .then(function(obj) {
          renderToys([obj]);
          name.value = "";
          imgURL.value = "";
        });
    });
});
