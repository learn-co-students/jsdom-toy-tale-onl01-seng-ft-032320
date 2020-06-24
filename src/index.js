let addToy = false;

// <<<<<<<<<<<<<<<<<<<
// New Toy Button Div
// <<<<<<<<<<<<<<<<<<<
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


// <<<<<<<<<<<<<<<<<<<
// Get Existing Toys
// <<<<<<<<<<<<<<<<<<<
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    for(const toy in object) {
      const card = document.createElement('div');
      const collection = document.querySelector('#toy-collection');
      const h2 = document.createElement('h2');
      const img = document.createElement('img');
      const likes = document.createElement('p');
      const button = document.createElement('button');
      card.setAttribute('class', 'card');
      h2.innerHTML = object[toy].name;
      img.src = object[toy].image;
      img.setAttribute('class', 'toy-avatar');
      likes.innerHTML = `${object[toy].likes} Likes`;
      button.setAttribute('class', 'like-btn');
      button.innerHTML = "Like <3";
      button.addEventListener('click', function() {
        increaseLikes(object[toy]);
        window.location.reload(true);
      })

      
      collection.appendChild(card);
      card.appendChild(h2);
      card.appendChild(img);
      card.appendChild(likes);
      card.appendChild(button);
    }
  })
});


// <<<<<<<<<<<<<<<<<<<
// Create new Toy
// <<<<<<<<<<<<<<<<<<<
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-toy-form");
  form.addEventListener('submit', submitData);

  function submitData() {
    
    let formData = {
      name: document.querySelectorAll('.input-text')[0].value,
      image: document.querySelectorAll('.input-text')[1].value,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => console.log(json));
  }
});



// <<<<<<<<<<<<<<<<<<<
// Like Functionality
// <<<<<<<<<<<<<<<<<<<
function increaseLikes(toy) {

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toy.likes) + 1
    })
  };
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
}