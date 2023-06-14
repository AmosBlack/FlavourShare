import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

//app data
const firebaseConfig = {
  apiKey: "AIzaSyC49pzg6Clrb7jeSuZALvMah-4T09mVByA",
  authDomain: "flavourshare-62bac.firebaseapp.com",
  databaseURL: "https://flavourshare-62bac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flavourshare-62bac",
  storageBucket: "flavourshare-62bac.appspot.com",
  messagingSenderId: "545922875530",
  appId: "1:545922875530:web:2d5f92e9238bb3f9a36d73"
};

//app initialization
const app = initializeApp(firebaseConfig)
export const DB = getDatabase(app)
export const auth = getAuth(app)
export const postsInDB = ref(DB, `/posts/`)





//card container
const cardContainer = document.getElementById('recipe-cards');



function recipeCardContainerClear(container) {
  if(container){
    container.innerHTML = ""
  }

}


onValue(postsInDB, function (snapshot) {
  //db data
  var posts = snapshot.val()
  var posts_arr = Object.values(posts)

  //empty list
  recipeCardContainerClear(cardContainer)
  //create card for each recipe
  for (var i = 0; i < posts_arr.length; i++) {
    var recipeUnit = posts_arr[i]
    recipeCardCreate(recipeUnit)

  }
})


function recipeCardCreate(recipe) {
  //empty container
  //initialize cardisions
  const card = document.createElement("div")
  card.classList.add("card")

  //create preview/modal containers
  const preview = document.createElement("div")
  preview.classList.add("preview")
  const dialog = document.createElement("dialog")
  dialog.classList.add("myModal")
  card.appendChild(dialog)

  //view button
  const button = document.createElement("button")
  button.innerHTML = "View"
  button.classList.add("openModal")
  button.addEventListener('click', function () {
    var div = button.parentNode.parentNode
    var dialog = div.getElementsByTagName("dialog")[0]
    dialog.showModal()

  })
  preview.appendChild(button)

  //image
  const image = document.createElement('img')
  image.src = recipe.image
  image.alt = "image"
  image.loading = "lazy"
  preview.appendChild(image)

  //title
  const title = document.createElement('h2')
  title.innerHTML = recipe.name
  preview.appendChild(title)
  //subtitle
  const subtitle = document.createElement("p")
  subtitle.innerHTML = recipe.author
  preview.appendChild(subtitle)

  //x button
  const buttonClose = document.createElement("button")
  buttonClose.innerHTML = "X"
  buttonClose.classList.add("closeModal")
  buttonClose.addEventListener('click', function () {
    var div = buttonClose.parentNode
    div.close()
  })

  //ingredients
  const ingredientsHeader = document.createElement("h3")
  ingredientsHeader.innerHTML = "Ingredients"
  const ingredientsList = document.createElement("ul")
  ingredientsList.classList.add("ingredients")
  ingredientsList.appendChild(ingredientsHeader)
  var ingredientsListDB = Object.values(recipe.ingredients)
  for (const ingredient of recipe.ingredients) {
    const listEl = document.createElement("li");
    listEl.innerHTML = ingredient;
    ingredientsList.appendChild(listEl);
  }

  //instructions
  const instructionsHeader = document.createElement("h3")
  instructionsHeader.innerHTML = "Instructions"
  const instructionsList = document.createElement("ol")
  instructionsList.classList.add("instructions")
  instructionsList.appendChild(instructionsHeader)
  for (const instruction of recipe.instructions) {
    const listEl = document.createElement("li");
    listEl.innerHTML = instruction;
    instructionsList.appendChild(listEl);
  }


  // for (var i = 0; i < instructionsListDB.length; i++) {
  //   var listEl = document.createElement("li")
  //   listEl.innerHTML = recipe.instructions[i]
  //   instructionsList.appendChild(listEl)
  // }

  //append to dialog
  dialog.appendChild(title.cloneNode(true))
  dialog.appendChild(subtitle.cloneNode(true))
  dialog.appendChild(image.cloneNode(true))
  dialog.appendChild(ingredientsList)
  dialog.appendChild(instructionsList)
  dialog.appendChild(buttonClose)

  //append to card
  card.appendChild(preview)
  card.appendChild(dialog)

  //append card to container
  if(cardContainer && card){
    cardContainer.appendChild(card)

  }
}