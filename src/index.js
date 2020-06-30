const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

function likes(e) {
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
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})

// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

// function fetchToys() {
//   fetch("http://localhost:3000/toys")
//   .then(response => resoponse.json())
//   .then(json => createCard(json))
// }

// function createCard(json) {
//   const collection = document.querySelector('div#toy-collection');
//   // for each toy
//   for (const toy of json) {
//     let newDiv = document.createElement('div') // create div
//     newDiv.className = "card" // with class = "card"
//     createName(toy, newDiv)
//     createPhoto(toy, newDiv)
//     totalLikes(toy, newDiv)
//     addButton(toy, newDiv)
//     collection.appendChild(newDiv); // append to toyCollection
//   }
// }

// // Challenge 2 <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>
// // h2 tag with the toy's name
// function createName(toy, card) {
//   let name = document.createElement('h2')
//   name.innerText = toy.name
//   card.appendChild(name)
// }

// // img tag with: src of the toy's image // class of "toy-avatar"
// function createPhoto(toy, card) {
//   let img = document.createElement('img')
//   img.src = toy.image
//   img.className = "toy-avatar"
//   card.appendChild(img)
// }

// // p tag with total likes
// function totalLikes(toy, card) {
//   let likes = document.createElement('p')
//   likes.innerText = `${toy.likes} likes`
//   card.appendChild(likes)
// }

// // button with class="like-btn"
// function addButton(toy, card) {
//   let newButton = document.createElement('button')
//   newButton.addEventListener('click', function() {
//     increaseCount(toy);
//     window.location.reload(true);
//   })
//   newButton.className = "like-btn"
//   newButton.style = "width: 30px;height:30px;cursor:pointer;"
//   newButton.innerText = "♥"
//   card.appendChild(newButton)
// }

// // Challenge 3 <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>
// // POST fetch() request sent to http://localhost:3000/toys

// form = document.querySelector('.add-toy-form')
// form.addEventListener('submit', submitData)

// function submitData() {

//   let formData = {
//     "name": document.querySelectorAll('.input-text')[0].value,
//     "image": document.querySelectorAll('.input-text')[1].value,
//     "likes": "0"
//   }

//   let configObj = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(formData)
//   };

//   fetch("http://localhost:3000/toys", configObj)
//       .then(response => response.json())
//       .then(json => console.log(json))
// }

// // Challenge 4 <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>
// function increaseCount(toy) {


//   let configObj = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           "likes": parseInt(toy.likes) + 1
//         })
//   };


// fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
// }
// POST http://localhost:3000/toys
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
 
// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })

// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
 
// body: JSON.stringify({
//   "likes": <new number>
// })