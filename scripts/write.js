import { DB, postsInDB, auth } from "./posts.js";
import { push,ref } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
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

//recipe form element
const recipeForm = document.getElementById("recipe-container")

//mutable lists
let ingredientsArr = []
let instructionsArr = []


const checkAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            recipeForm.style.display = "block"

        }
        else {
            recipeForm.innerHTML = "Login to Write Recipes"
        }
    })
}
checkAuthState()


//push to firebase
submitButton.addEventListener("click", () => {
    let authorID
    onAuthStateChanged(auth, user => {
        if (user) {
            authorID = user.uid

            var recipe = {
                "name": title.value,
                "author": author.value,
                "image": image.value,
                "ingredients": ingredientsArr,
                "instructions": instructionsArr,
                "authorID": authorID,
            }
            if (checkFormSubmittable(recipe)) {
                var recipeData = push(postsInDB, recipe)
                var recipeKey = recipeData.key
                var userRecipeLoc = ref(DB,`/users/${authorID}/recipes/`)
                var userRecipeIDStorage = push(userRecipeLoc,recipeKey)
                clearForm()
            }
            else {
                alert("Form isnt filled properly")
            }
        }
    })
})

//add item to list
ingredientsButton.addEventListener("click", () => {
    //check if input empty
    if (!ifEmpty(ingredientsInput)) {
        ingredientsArr.push(ingredientsInput.value)
        ingredientsInput.value = ""
        appendItemToHTMLArray(ingredientsArr, ingredientsArrEl, ingredientsInput)
    }
    else {
        //replace alert with side modal
        alert("false")
    }

})

instructionsButton.addEventListener("click", () => {
    //check if input empty
    if (!ifEmpty(instructionsInput)) {
        instructionsArr.push(instructionsInput.value)
        instructionsInput.value = ""
        appendItemToHTMLArray(instructionsArr, instructionsArrEl, instructionsInput)
    }
})

let arr_li_item, editing
function appendItemToHTMLArray(arr, ul, input) {
    ul.innerHTML = "";

    for (var i = 0; i < arr.length; i++) {
        (function (index) {
            var arr_li_item = arr[index];

            var li = document.createElement("li");
            li.innerHTML = arr_li_item;

            var dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");

            var delEl = document.createElement("button");
            delEl.innerHTML = "DEL";
            delEl.addEventListener("click", function () {
                li.remove();
                arr.splice(index, 1);
            });

            var editEl = document.createElement("button");
            editEl.innerHTML = "EDIT";
            editEl.addEventListener("click", function () {
                input.value = arr_li_item;
                editing = true;
            });

            dropdown.appendChild(delEl);
            dropdown.appendChild(editEl);
            li.appendChild(dropdown);

            ul.appendChild(li);
        })(i);
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

function checkFormSubmittable(recipe) {
    if (title.value != "" && author.value != "" && ingredientsArr.length != 0 && instructionsArr.length != 0) {
        if (image.value == "") {
            recipe.image = "https://images.unsplash.com/photo-1614548539924-5c1f205b3747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
        return true
    }
    else {
        return false
    }

}

function ifEmpty(input) {
    if (input.value == "") {
        return true
    }
    else {
        return false
    }
}