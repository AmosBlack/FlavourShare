//initialize variables
let cardContainer = document.getElementById("recipe-cards")
let cardsCollection = document.getElementsByClassName("card")
let titlesCollection = document.getElementsByClassName("title")
let searchBar = document.getElementById("search-input")
let cardsCollectionTitles = []

searchBar.addEventListener("input",()=>{
    // console.log(cardsCollection[0].textContent)
    for(var i=0;i<titlesCollection.length;i++){
        cardsCollection[i].style.display = "block"
        if(!titlesCollection[i].textContent.toLowerCase().includes(searchBar.value.toLowerCase())){
            cardsCollection[i].style.display = "none"
            console.log(searchBar.value,cardsCollection[i],titlesCollection[i].textContent)
        }
    }


})