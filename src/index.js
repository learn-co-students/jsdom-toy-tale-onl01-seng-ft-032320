let addToy = false;
let toysUrl = 'http://localhost:3000/toys'

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
  document.querySelector(".add-toy-form").addEventListener('submit', onSubmitToy)
  document.getElementById('toy-collection').addEventListener('click', onSubmitLike)
  fetchToys(toysUrl);
});


function fetchToys(link) {
  return fetch(link)
  .then(resp => resp.json())
  .then(createToyDiv)
};

function getToyCollectionDiv(){
  return document.getElementById('toy-collection');
};

function createDiv(){
  let div = document.createElement('div');
  div.className = "card"
  return div;
}

function createName(){
  return document.createElement('h2');
}

function createImage(){
  let img = document.createElement('img');
  img.className = "toy-avatar"
  return img;
}

function createLikeCount(){
  return document.createElement('p');
}

function createButton(){
  let button = document.createElement('button');
  button.className = "like-btn"
  button.innerHTML = "Like"
  return button;
}

function createToyDiv(json) {
  json.forEach(obj => {  
   createToy(obj);
  });
};

function onSubmitToy(event){
  event.preventDefault();

  fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`, 
      image: `${event.target.image.value}`,
      likes: 0
    })
  })
  .then(function(response){
    return response.json();
  })
  .then(createToy)
};

function createToy(object){
  let toyDiv = getToyCollectionDiv();
  let div = createDiv();
  let name = createName();
  let img = createImage();
  let likeCount = createLikeCount();
  let button = createButton();
  
  name.innerHTML = object['name']
  img.src = object['image']
  likeCount.innerText = object['likes']

  div.appendChild(name);
  div.appendChild(img);
  div.appendChild(likeCount);
  div.appendChild(button);
  toyDiv.appendChild(div);
}

function onSubmitLike(event){
  let likeButtonIsPressed = event.target.className === "like-btn"


  if (likeButtonIsPressed) {
    let like = event.target.previousElementSibling
    let likeCount = parseInt(like.innerText)
    like.innerText = `${++likeCount} likes`
  
  fetch(toysUrl,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify ({
      likes: like
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(console.log)
  }
};
