import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { auth } from "./posts.js";
import { DB } from "./posts.js";
import { getDatabase, ref, push, onValue, remove, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

//initialize db
const userNodeInDB = ref(DB, "/users/")


//initialize variables
const authButton = document.getElementById("login-button")
const authContainer = document.getElementById("auth-container")

//login event
authButton.addEventListener("click", () => {
    createDialog(authContainer).showModal()

})


//signup func
const userSignUp = async (email, pwd, ign) => {
    //create acc
    createUserWithEmailAndPassword(auth, email, pwd,ign)
        .then((userCredential) => {
            var userID = userCredential.user.uid
            userSetup(userID,ign)

        })
        .catch((error) => {
            console.log(error)
        })
}

//signin func
const userSignIn = async (email, pwd, ign) => {

    //signin
    signInWithEmailAndPassword(auth, email, pwd,ign)
        .then((userCredential) => {
            var userID = userCredential.user.uid
            userSetup(userID,ign)

        })
        .catch((error) => {
            console.log(error)
            // handleAuthError(error) <- implement function from grocerypad
        })


}

//update ui with login status
const checkAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {//update to work with new app
            // //if logged in show shopping list
            // divAuthentication.style.display = "none"
            // divShopping.style.display = "flex"
            // userNameView(user.email)
            // userKey = user.uid
            // shoppingListInDB = ref(database, `users/${userKey}`)
            // updateList(shoppingListInDB,userKey)

        }
        else {
            // //if logged out show auth page
            // divAuthentication.style.display = "flex "
            // divShopping.style.display = "none"
        }
    })
}

//signout func
const userSignOut = async () => {
    await signOut(auth)
    // emptyAuthForm()
}

function createDialog(parent) {
    //create modal element
    const dialog = document.createElement("dialog")
    const title = document.createElement('h1')
    title.innerHTML = "Authentication"
    //input setup
    const inputUsername = document.createElement("input")
    inputUsername.type = "text"
    inputUsername.placeholder = "Username"
    const inputEmail = document.createElement("input")
    inputEmail.type = "email"
    inputEmail.placeholder = "Email"
    const inputPassword = document.createElement("input")
    inputPassword.type = "password"
    inputPassword.placeholder = "Password"
    //signin/signup button
    const inputSignin = document.createElement("button")
    inputSignin.classList.add("button")
    inputSignin.id = "signin-button"
    inputSignin.innerHTML = "Signin"
    inputSignin.addEventListener("click", () => {
        userSignIn(inputEmail.value, inputPassword.value,inputUsername.value)
    })

    const inputSignup = document.createElement("button")
    inputSignup.classList.add("button")
    inputSignup.id = "signup-button"
    inputSignup.innerHTML = "Signup"
    inputSignup.addEventListener("click", () => {
        userSignUp(inputEmail.value, inputPassword.value,inputUsername.value)
    })
    //add modal to parent div
    dialog.appendChild(title)
    dialog.appendChild(inputUsername)
    dialog.appendChild(inputEmail)
    dialog.appendChild(inputPassword)
    dialog.appendChild(inputSignin)
    dialog.append(inputSignup)
    parent.appendChild(dialog)
    return dialog
}

function userSetup(uid, ign) {
    //improve so it doesnt change username each time bruh
    var userLoc = ref(DB,`/users/${uid}`)

    var userData = {
        "username":ign
    }
    userLoc.set(userData)
    
}