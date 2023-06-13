import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { auth } from "./posts.js";
import { DB } from "./posts.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


//initialize variables
const authButton = document.getElementById("login-button")
const unAuthButton = document.getElementById("logout-button")
const authContainer = document.getElementById("auth-container")


//signup func
const userSignUp = async (email, pwd, ign) => {
    //create acc
    createUserWithEmailAndPassword(auth, email, pwd,ign)
        .then((userCredential) => {
            var userID = userCredential.user.uid
            userSetup(userID,ign)

        })
        .catch((error) => {
            alert(error)
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
        userSignIn(inputEmail.value, inputPassword.value,inputUsername.value,false)
    })

    const inputSignup = document.createElement("button")
    inputSignup.classList.add("button")
    inputSignup.id = "signup-button"
    inputSignup.innerHTML = "Signup"
    inputSignup.addEventListener("click", () => {
        userSignUp(inputEmail.value, inputPassword.value,inputUsername.value,true)
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

function userSetup(uid, ign,signupBool) {
    //improve so it doesnt change username each time bruh
    var userLoc = ref(DB,`/users/${uid}/username`)
    set(userLoc,ign)

}
