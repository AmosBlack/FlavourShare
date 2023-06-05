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

      // Get the modal element
      const modal = document.getElementsByClassName('myModal');
  
      // Get the button that opens the modal
      const btnOpenModal = document.getElementsByClassName('openModal');
    
      // Get the button that closes the modal
      const btnCloseModal = document.getElementsByClassName('closeModal');
      
      //button open listener
      Array.from(btnOpenModal).forEach((button,index)=>{
        button.addEventListener('click',function(){
          var div = button.parentNode.parentNode
          var dialog = div.getElementsByTagName("dialog")[0]
          dialog.showModal()
    
        })
      })
  
      //button close listener  
      Array.from(btnCloseModal).forEach((button,index)=>{
        button.addEventListener('click',function(){
          var div = button.parentNode
          console.log(div)
          div.close()
    
        })
      })