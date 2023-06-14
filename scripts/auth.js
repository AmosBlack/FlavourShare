import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { auth } from "./posts.js";
import { DB } from "./posts.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


//initialize variables
const authButton = document.getElementById("login-button")
const unAuthButton = document.getElementById("logout-button")
const authContainer = document.getElementById("auth-container")


//signup func
const userSignUp = async (email, pwd, dialog) => {
    //create acc
    createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            dialog.close()
        })
        .catch((error) => {
            alert(error)
        })
}

//signin func
const userSignIn = async (email, pwd,dialog) => {

    //signin
    signInWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            dialog.close()
        })
        .catch((error) => {
            alert(error)
            // handleAuthError(error) <- implement function from grocerypad
        })


}


//signout func
const userSignOut = async () => {
    await signOut(auth)
    // emptyAuthForm()
}






//login event
authButton.addEventListener("click", () => {
    createDialog(authContainer).showModal()

})
//logout event
unAuthButton.addEventListener("click",() => {
    userSignOut()
})


let inputUsername,inputEmail, inputPassword
function createDialog(parent) {
    //create modal element
    const dialog = document.createElement("dialog")
    dialog.id = "auth-form"
    const title = document.createElement('h1')
    title.innerHTML = "Authentication"
    //input setup
    
    inputEmail = document.createElement("input")
    inputEmail.type = "email"
    inputEmail.placeholder = "Email"
    inputPassword = document.createElement("input")
    inputPassword.type = "password"
    inputPassword.placeholder = "Password"
    //signin/signup button
    const inputSignin = document.createElement("button")
    inputSignin.classList.add("button")
    inputSignin.id = "signin-button"
    inputSignin.innerHTML = "Signin"
    inputSignin.addEventListener("click", () => {
        userSignIn(inputEmail.value, inputPassword.value,dialog)
    })

    const inputSignup = document.createElement("button")
    inputSignup.classList.add("button")
    inputSignup.id = "signup-button"
    inputSignup.innerHTML = "Signup"
    inputSignup.addEventListener("click", () => {
        userSignUp(inputEmail.value, inputPassword.value,dialog)
    })
    //add modal to parent div
    dialog.appendChild(title)
    dialog.appendChild(inputEmail)
    dialog.appendChild(inputPassword)
    dialog.appendChild(inputSignin)
    dialog.append(inputSignup)
    parent.appendChild(dialog)
    return dialog
}
