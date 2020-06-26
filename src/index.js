let addToy = false;
let likeBtns;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");

    addBtn.addEventListener("click", () => {
        console.log(this)
            // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    });
    getToys()
});





function getToys() {
    fetch(' http://localhost:3000/toys')
        .then(response => response.json())
        .then(data => {
            data.forEach(el => {
                document.querySelector("#toy-collection").innerHTML += `
                <div class="card" id=${el.id}>
                  <h2>${el.name}</h2>
                  <img src="${el.image}" height="150px">
                  <p>${el.likes}</p>
                  <button class="like-btn">Like</button>
                </div>  
              `
            })
            likeBtns = document.querySelectorAll(".like-btn");
            likeBtns.forEach(btn => {

                btn.addEventListener("click", function addLike(e) {

                    let add = parseInt(document.querySelector(".like-btn").parentElement.childNodes[5].innerText) + 1
                    return fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                "likes": add
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            document.querySelector(".like-btn").parentElement.childNodes[5].innerText = `${add}`
                            console.log(add)
                            e.preventDefault()
                        })
                })
            })
        })

}

function createToy() {
    return fetch('http://localhost:3000/toys', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": "Jessie",
                "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
                "likes": 0
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
}