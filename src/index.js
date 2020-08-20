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

  function getToys() { 
  fetch('http://127.0.0.1:3001/toys')
  .then(resp => resp.json())
  .then(data => renderToys(data))
 
   
  }

 
    
 
  function renderToys(data) {
    const main = document.querySelector('#toy-collection')
    data.forEach(toy => {
      const h3 = document.createElement('h3')
      h3.innerHTML = 
        `<li>${toy.id}</li>
        <li>${toy.name}</li>
         <img src=${toy.image} alt=${toy.name}>
         <li>${toy.likes}</li>
         `
         main.appendChild(h3)
    })
  }

  function postToy(toy) {
    fetch('http://127.0.0.1:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    })
  .then(resp => resp.json())
  .then((toy) => {
    let new_toy = renderToys(toy)
    main.append(new_toy)
  })
}
  
  
    getToys()
    postToy(data)
    
    
});
