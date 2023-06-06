const electricToolsContainer = document.getElementById('electric-tools-container');
const shoppingCart = [];

fetch('https://webprosjekt-heisann.onrender.com/tools/electric')
  .then(response => response.json())
  .then(data => {
    // modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        id: tool._id,
        name: tool.name,
        quantity: tool.quantity,
        electric: tool.electric,
        image: tool.image,
        functional: tool.functional
      };
    });
  
    
    // display the modified data on the webpage
    const container = document.getElementById('tool-card-container');
    
    
    modifiedData.forEach(tool => {

   
      if(tool.electric === true) {
        const toolElement = document.createElement('div');
        toolElement.classList.add('tool-card');
        const imageUrl = tool.image;
        toolElement.innerHTML = `
          <button class="broken-tool-button">Broken?</button>  
          <button class="book-tool-button" data-tool-id="${tool.id}">Add to Cart</button>  
 
          <h2><a href="/spesificTool.html?toolName=${tool.name}" id="tool-card-h2">${tool.name}</a></h2>
          <button class="delete-tool-button" style="display: none;" data-tool-id="${tool.id}">X</button>
          <img src="${tool.image}" id="tool-card-image">
          <p id="tool-card-quantity">quantity: ${tool.quantity}</p>
          <p id="tool-card-electric">${tool.electric}</p>
          <p> Tool is: ${tool.functional} </p>
        `;
        if (tool.functional === "broken") {
          toolElement.classList.add('broken');
        }
        container.appendChild(toolElement);
        console.log(tool.electric);

        // search bar

        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', () => {
         const searchText = searchBar.value.toLowerCase();
          filterTools(searchText);
        });
  
          function filterTools(searchText) {
            const toolCards = document.querySelectorAll('.tool-card');
            toolCards.forEach(toolCard => {
              const toolName = toolCard.querySelector('h2').textContent.toLowerCase();
              if (toolName.includes(searchText)) {
                toolCard.style.display = 'block';
              } else {
                toolCard.style.display = 'none';
              }
            });
          }
    
        // add click event listener to delete button
        const deleteButton = toolElement.querySelector('.delete-tool-button');
        deleteButton.addEventListener('click', async () => {
          toolElement.remove(); // remove tool from webpage
          const toolId = deleteButton.dataset.toolId;
          const deleted = await deleteTool(toolId); // delete tool from database
          if (!deleted) {
            console.log('Failed to delete tool');
          }
        });

        const bookButton = toolElement.querySelector('.book-tool-button');
        bookButton.addEventListener('click', () => {
        shoppingCart.push(tool); // add tool to shopping cart
        localStorage.setItem('selectedTools', JSON.stringify(shoppingCart)); // store selected tools in local storage
        console.log("cart" + shoppingCart); // display shopping cart for testing purposes
        updateCheckoutButton(); // update the checkout button

        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        cartIcon.classList.add('cart-active'); // change cart icon color
        cartCount.textContent = shoppingCart.length; // update cart count
        checkoutButton.classList.add('checkout-active'); // highlight "Checkout" button
        });

        const checkoutButton = document.getElementById('checkout-button');
        checkoutButton.addEventListener('click', () => {
          // get the selected tools from local storage
          const selectedTools = JSON.parse(localStorage.getItem('selectedTools'));

          // redirect the user to the booking form page with the selected tools in the query string
          window.location.href = `booking.html?tools=${JSON.stringify(selectedTools)}`;
});

        function updateCheckoutButton() {
          const checkoutButton = document.getElementById('checkout-button');
          if (shoppingCart.length > 0) {
            checkoutButton.classList.add('has-items');
          } else {
            checkoutButton.classList.remove('has-items');
          }
        }

        const brokenButton = toolElement.querySelector('.broken-tool-button');
        brokenButton.addEventListener('click', async () => {
        tool.functional = 'broken'; // update tool's state
        const response = await fetch(`https://webprosjekt-heisann.onrender.com/tools/electric/${tool.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ functional: 'broken' })
        });
        if (response.ok) {
          console.log('Tool state updated to broken');
          tool.functional = 'broken'; // update tool object to reflect the change
        } else {
          console.log('Failed to update tool state');
        }
      });
       
      }

    });
    
    
  
  })
  .catch(error => console.error(error));
 

