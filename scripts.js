//dark-mode function





// Load recipe data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Generate recipe cards
    const cardContainer = document.getElementById('recipe-cards');
    data.forEach(recipe => {
      const card = createRecipeCard(recipe);
      cardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.log('An error occurred while loading the recipe data:', error);
  });

// Function to create a recipe card
function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (recipe.image) {
    const image = document.createElement('img');
    image.src = recipe.image;
    card.appendChild(image);
  }

  const title = document.createElement('h2');
  const author = document.createElement('h3')
  author.textContent = `by ${recipe.author}`
  title.textContent = recipe.name;
  card.appendChild(title);
  card.appendChild(author)

  const extraCard = document.createElement("div")
  extraCard.classList.add("additional-content")
  card.appendChild(extraCard)

  const cardIngredients = document.createElement("div")
  extraCard.appendChild(cardIngredients)

  const ingredientsList = document.createElement('ul');
  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    ingredientsList.appendChild(listItem);
  });
  cardIngredients.appendChild(ingredientsList)


  const cardInstructions = document.createElement("div")
  extraCard.appendChild(cardInstructions)
  const instructions = document.createElement('p');
  instructions.textContent = 'Instructions:';
  cardInstructions.appendChild(instructions);

  const instructionsList = document.createElement('ol');
  recipe.instructions.forEach(instruction => {
    const listItem = document.createElement('li');
    listItem.textContent = instruction;
    instructionsList.appendChild(listItem);
  });
  extraCard.appendChild(instructionsList);

  return card;
}


  var recipeData = [
      {
        "name": "Recipe Name 1",
        "author": "Lori Johnson",
        "image": "recipe-image1.jpg",
        "instructions": "Recipe instructions go here...",
        "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"]
      },
      {
        "name": "Recipe Name 2",
        "author": "Author 2",
        "image": "recipe-image2.jpg",
        "instructions": "Recipe instructions go here...",
        "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"]
      }
      // Add more recipe objects as needed
    ];

    var recipeContainer = document.getElementById("recipeContainer");
    var modal = document.querySelector(".modal");
    var modalClose = document.querySelector(".modal-close");
    var modalTitle = document.querySelector(".modal-title");
    var modalAuthor = document.querySelector(".modal-author");
    var modalImage = document.querySelector(".modal-image");
    var modalInstructions = document.querySelector(".modal-instructions");
    var modalIngredients = document.querySelector(".modal-ingredients");

    // Dynamically generate recipe cards
    recipeData.forEach(function(recipe) {
      var card = document.createElement("div");
      card.className = "recipe-card";

      var name = document.createElement("p");
      name.textContent = recipe.name;
      card.appendChild(name);

      var author = document.createElement("p");
      author.textContent = recipe.author;
      card.appendChild(author);

      var image = document.createElement("img");
      image.src = recipe.image;
      image.alt = "Recipe Image";
      card.appendChild(image);

      var button = document.createElement("button");
      button.textContent = "View Details";
      button.addEventListener("click", function() {
        openModal(recipe);
      });
      card.appendChild(button);

      recipeContainer.appendChild(card);
    });

    modalClose.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);

    function openModal(recipe) {
      modalTitle.textContent = recipe.name;
      modalAuthor.textContent = recipe.author;
      modalImage.src = recipe.image;
      modalInstructions.textContent = recipe.instructions;
      modalIngredients.innerHTML = recipe.ingredients.map(function(ingredient) {
        return "<li>" + ingredient + "</li>";
      }).join("");

      modal.style.display = "block";
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function outsideClick(event) {
      if (event.target == modal) {
        closeModal();
      }
    }