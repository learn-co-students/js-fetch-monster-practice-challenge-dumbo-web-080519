let allMonsterDiv = document.getElementById('monster-container')
let page = 1
let newMonsterDiv = document.querySelector('#create-monster')
let monsterForm = document.createElement('form')
let monsterBtn = document.querySelector('#create-monster')
let forwardArrowBtn = document.getElementById('forward')
let backArrowBtn = document.getElementById('back')
let pageNum = document.getElementById('page')

function getMonster(page){
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monstersArr => {
      allMonsterDiv.innerHTML = ""
      pageNum.innerText = `Page - ${page}`
      monstersArr.forEach(monster => {
        allMonsterDiv.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age} </h4>
        <p>Description: ${monster.description}</p>`
      })
    })
}
getMonster(page)

/////////ADD MONSTER FORM ///////////
  monsterForm.innerHTML += `
  <input id="name" placeholder="name...">
  <input type="number" id="age" placeholder="age...">
  <input id="description" placeholder="description...">
  <button id="create-monster">Create</button>
  `
  newMonsterDiv.append(monsterForm)

//////// CREATE MONSTER /////////

  monsterBtn.addEventListener('submit', function(evt){
    evt.preventDefault()

    let name = evt.target.name.value
    let age = evt.target.age.value
    let description = evt.target.description.value

    fetch("http://localhost:3000/monsters", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: description
      })
    })
    .then(res => res.json())
    .then(monstersArr => {
        allMonsterDiv.innerHTML += `
        <h2>${name}</h2>
        <p>Age: ${age} </h4>
        <p>Description: ${description}</p>`
        console.log(monstersArr)
    })
  })

  /////////

  forwardArrowBtn.addEventListener('click', function(evt){
    evt.preventDefault()
    page++
    getMonster(page)
  })
  backArrowBtn.addEventListener('click', function(evt){
    evt.preventDefault()
    page--
    getMonster(page)

  })
