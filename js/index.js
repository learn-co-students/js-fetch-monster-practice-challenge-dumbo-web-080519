let monsterContainer = document.getElementById("monster-container")
let monsterForm = document.getElementById("monster-form")
let monsterButton = document.getElementById("monster-button")
let backButton = document.getElementById("back")
let forwardButton = document.getElementById("forward")
let counter = 1
let url = `http://localhost:3000/monsters/?_limit=50&_page=`


///////////    INDEX  /////////
function displayMonsters(monster){
   monsterContainer.innerHTML += `<h2 data-id="${monster.id}">${monster.name} </h1>
   <p> ${monster.age} </p>
   <p> ${monster.description}</p>`
}

////// FETCH ALL THE MONSTERS //////////
function monsterFetch(){
  fetch(`${url}${counter}`)
  .then(res => res.json())
  .then(monstersArray => {
    monstersArray.forEach(function(monster){
      displayMonsters(monster)
     })
  })
}

monsterFetch()

/////// CREATE FORM //////////
monsterForm.addEventListener("click", function(event){
  event.preventDefault()
  let eventTarget = event.target
  let name = document.getElementById("name")
  let age = document.getElementById("age")
  let description = document.getElementById("description")

  if (event.target.id === "monster-button"){
     fetch("http://localhost:3000/monsters", {
       method: 'POST',
       headers: {
         'Content-Type':'application/json',
         'Accept':'application/json'
       },
       body: JSON.stringify(
         {
           name: name.value,
           age: age.value,
           description: description.value
         }
       )
     })
     .then(res => res.json())
     .then(resObject => {
       displayMonsters(resObject)
       name.value =  ""
       age.value  = ""
       description.value  = ""
     })
   }
})

forwardButton.addEventListener('click', function(event){
  // when clicked, fetch the next page (counter++)
  counter ++
  monsterContainer.innerHTML = ""
  monsterFetch()
})

backButton.addEventListener("click", function(event){
  if( counter !== 1){
    counter --
    monsterContainer.innerHTML = ""
    monsterFetch()
  }
  else{

  }
})
