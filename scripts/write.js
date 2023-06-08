import {DB, postsInDB} from "./posts.js"
import {push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

//elements
const title = document.getElementById("r-title")
const author = document.getElementById("r-author")
const submitButton = document.getElementById('r-submit')
const image = document.getElementById("r-img")

const ingredientsArrEl = document.getElementById("ingredients-list")
const instructionsArrEl = document.getElementById("instructions-list")
const ingredientsButton = document.getElementById("ingred-click")
const instructionsButton = document.getElementById("instru-click")
const ingredientsInput = document.getElementById("r-ingredient")
const instructionsInput = document.getElementById("r-instruction")


//mutable lists
let ingredientsArr = []
let instructionsArr = []

//push to firebase
submitButton.addEventListener("click",()=>{
    console.log("wow")
    recipe = {
        "author":author.value,
        "image":image.value,
        "ingredients":ingredientsArr,
        "instructions":instructionsArr,
        "name":title.value
    }
    push(postsInDB,recipe,()=>{
        console.log(recipe)
    })
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

