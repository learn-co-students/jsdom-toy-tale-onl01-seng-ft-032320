let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  renderToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  function renderToys(){
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    const divContainer = document.getElementById('toy-collection')
      for (const element of json){
        // console.log(element)
        const card = document.createElement('div')
        card.className = 'card'
        divContainer.appendChild(card)
        const h2 = document.createElement('h2')
        h2.innerText = element.name
        card.appendChild(h2)
        const img = document.createElement('img')
        img.className = 'toy-avatar'
        img.src = element.image
        img.innerHTML = img.src
        card.appendChild(img)
        const p = document.createElement('p')
        p.innerHTML = element.likes + ' Likes'
        card.appendChild(p)
        const button = document.createElement('button')
        button.className = 'like-btn'
        button.setAttribute('id', element.id)
        button.innerText = 'Like <3'
        card.appendChild(button)
        button.addEventListener('click', (e) => {
          console.log(e.target.dataset);
          likeToy(e)
        });
      }
  });
 } 
 let newToyName = document.getElementById("name").value;
 let newToyImg = document.getElementById("img").value;
  let configObj = {
    method: 'POST',
    headers: 
    {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({
    "name": newToyName,
    "image": newToyImg,
    "likes": 0
    })
  }
  function createToy() {
    fetch('http://localhost:3000/toys', configObj)
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      let new_toy = renderToys(object)
      divContainer.append(new_toy)
    })
  };
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
      .then((like_obj => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  }
  
});
