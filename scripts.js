// Load recipe data from JSON file
let card,preview,dialog,image,title,subtitle

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Generate recipe cards
    const cardContainer = document.getElementById('recipe-cards');
    data.forEach(recipe => {
   
      //initialize cardisions
      card = document.createElement("div")
      card.classList.add("card")
      
      preview = document.createElement("div")
      preview.classList.add("preview")
      
      dialog = document.createElement("dialog")
      dialog.classList.add("myModal")
      card.appendChild(dialog)

      const button = document.createElement("button")
      button.innerHTML = "View"
      button.classList.add("openModal")
      button.addEventListener('click',function(){
        var div = button.parentNode.parentNode
        var dialog = div.getElementsByTagName("dialog")[0]
        dialog.showModal()
  
      })
      preview.appendChild(button)

      const image = document.createElement('img')
      image.src = recipe.image
      image.alt = "image"
      preview.appendChild(image)

      title = document.createElement('h2')
      title.innerHTML = recipe.name
      preview.appendChild(title)

      subtitle = document.createElement("p")
      subtitle.innerHTML = recipe.author
      preview.appendChild(subtitle)

      const buttonClose = document.createElement("button")
      buttonClose.innerHTML = "X"
      buttonClose.classList.add("closeModal")
      buttonClose.addEventListener('click',function(){
        var div = buttonClose.parentNode
        div.close()  
      })

      const ingredientsHeader = document.createElement("h3")
      ingredientsHeader.innerHTML = "Ingredients"
      const ingredientsList = document.createElement("ul")
      ingredientsList.classList.add("ingredients")
      ingredientsList.appendChild(ingredientsHeader)
      for(var i=0;i<recipe.ingredients.length;i++){
        var listEl = document.createElement("li")
        listEl.innerHTML = recipe.ingredients[i]
        ingredientsList.appendChild(listEl)
      }
      const instructionsHeader = document.createElement("h3")
      instructionsHeader.innerHTML = "Instructions"
      const instructionsList = document.createElement("ol")
      instructionsList.classList.add("instructions")
      instructionsList.appendChild(instructionsHeader)
      for(var i=0;i<recipe.ingredients.length;i++){
        var listEl = document.createElement("li")
        listEl.innerHTML = recipe.instructions[i]
        instructionsList.appendChild(listEl)
      }

      dialog.appendChild(title.cloneNode(true))
      dialog.appendChild(subtitle.cloneNode(true))
      dialog.appendChild(image.cloneNode(true))
      dialog.appendChild(ingredientsList)
      dialog.appendChild(instructionsList)
      dialog.appendChild(buttonClose)

      card.appendChild(preview)
      card.appendChild(dialog)
      cardContainer.appendChild(card)
   
    });
  })
  .catch(error => {
    console.log('An error occurred while loading the recipe data:', error);
  });
