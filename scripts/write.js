import { auth } from "./posts.js";
import {DB, postsInDB} from "./posts.js"
import {push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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
submitButton.addEventListener("click",()=>{
    var recipe = {
        "author":author.value,
        "image":image.value,
        "ingredients":ingredientsArr,
        "instructions":instructionsArr,
        "name":title.value
    }
    push(postsInDB,recipe)
    clearForm()
})

//add item to list
ingredientsButton.addEventListener("click",() => {
    ingredientsArr.push(ingredientsInput.value)
    ingredientsInput.value = ""
    appendItemToHTMLArray(ingredientsArr,ingredientsArrEl)
})

instructionsButton.addEventListener("click",() => {
    instructionsArr.push(instructionsInput.value)
    instructionsInput.value = ""
    appendItemToHTMLArray(instructionsArr,instructionsArrEl)
})


// function add element in ingredient input to list

function appendItemToHTMLArray(arr,ul){
    ul.innerHTML = ""
    for(var i=0;i<arr.length;i++){
        var li = document.createElement("li")
        li.innerHTML = arr[i]
        ul.appendChild(li)
    }
}

function clearForm(){
    title.value = ""
    author.value = ""
    image.value = ""
    ingredientsArrEl.innerHTML = ""
    instructionsArrEl.innerHTML = ""
    ingredientsInput.value = ""
    instructionsInput.value = ""
}