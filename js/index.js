let monsterContainer = document.querySelector("#monster-container")
let url = "http://localhost:3000/monsters"


/////////// index READ
fetch(url + "/?_limit=50")
    .then(res => res.json())
    .then(monsterArray =>{monsterArray.forEach((monster)=>{
        makeMonster(monster)
    })
})

monsterContainer.classList.add("dataset_id")
function makeMonster(monster)
{
    monsterContainer.innerHTML += `<div data-id-${monster.id}>
    <ul>
    <button id="delete_btn">💜</button>
    <li>${monster.name}</li>
    <li>${monster.age}</li>
    <li>${monster.description}<li>
    </ul>
    </div>`

}

/////////// like
monster-container.addEventListener("click", 
    {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body:{
            name: name,
            age: age,
            description: description
        }
    })

