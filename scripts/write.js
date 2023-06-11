import { auth } from "./posts.js";
import { DB, postsInDB } from "./posts.js";
import { push } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

//elements
let title = document.getElementById("r-title")
let author = document.getElementById("r-author")
let submitButton = document.getElementById('r-submit')
let image = document.getElementById("r-img")

let ingredientsArrEl = document.getElementById("ingredients-list")
let instructionsArrEl = document.getElementById("instructions-list")
let ingredientsButton = document.getElementById("ingred-click")
let instructionsButton = document.getElementById("instru-click")
let ingredientsInput = document.getElementById("r-ingredient")
let instructionsInput = document.getElementById("r-instruction")


//mutable lists
let ingredientsArr = []
let instructionsArr = []

//push to firebase
submitButton.addEventListener("click", () => {
    var recipe = {
        "author": author.value,
        "image": image.value,
        "ingredients": ingredientsArr,
        "instructions": instructionsArr,
        "name": title.value
    }
    if(checkFormSubmittable()){
    push(postsInDB, recipe)
    clearForm()
    }
    else{
        alert("Form isnt filled properly")
    }
})

//add item to list
ingredientsButton.addEventListener("click", () => {
    ingredientsArr.push(ingredientsInput.value)
    ingredientsInput.value = ""
    appendItemToHTMLArray(ingredientsArr, ingredientsArrEl)
})

instructionsButton.addEventListener("click", () => {
    instructionsArr.push(instructionsInput.value)
    instructionsInput.value = ""
    appendItemToHTMLArray(instructionsArr, instructionsArrEl)
})


// function add element in ingredient input to list

function appendItemToHTMLArray(arr, ul) {
    ul.innerHTML = ""
    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement("li")
        li.innerHTML = arr[i]
        ul.appendChild(li)
    }
}

function clearForm() {
    title.value = ""
    author.value = ""
    image.value = ""
    ingredientsArrEl.innerHTML = ""
    instructionsArrEl.innerHTML = ""
    ingredientsInput.value = ""
    instructionsInput.value = ""
}

// check title, check author, if imgURL empty->default timing, better ingredients,instruction list view, editable ingredients list, editable instructions list

function checkFormSubmittable(){
    if(title.value!="" && author.value!="" && ingredientsArr.length != 0 && instructionsArr.length != 0){
        if(image.value == ""){
            image.value = "https://images.unsplash.com/photo-1614548539924-5c1f205b3747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
        return true
    }
    else{
        return false
    }


}