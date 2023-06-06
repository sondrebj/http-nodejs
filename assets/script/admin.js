// check if the user is an admin before accessing the page!
// Check if the user is an admin before accessing the page!
fetch('http://localhost:3200/decode')
  .then(response => response.json())
  .then(data => {
    if (data.role === "admin") {
      // If the user is an admin, show the page
      console.log("User is an admin!");
    } else {
      // If the user is not an admin, redirect to index.html
      console.log("User is not an admin!");
      window.location.href = "index.html";
    }
  })
  .catch(error => {
    // If there's an error fetching the user data, redirect to index.html
    console.log(error.message);
    window.location.href = "index.html";
  });


fetch('http://localhost:3200/tools/tools')
  .then(response => response.json())
  .then(data => {
    // Modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        id: tool._id,
        name: tool.name,
        description: tool.description, 
        quantity: tool.quantity,
        electric: tool.electric,
        functional: tool.functional
      };
    });
  
    
    // Display the modified data on the webpage
    const container = document.querySelector('.tool-list');
   
    
    modifiedData.forEach(tool => {
      
      const tName = tool.name; 

      if(tool) {
        const toolElement = document.createElement('tr');
        toolElement.innerHTML = `

            <td class="td-name"><a href="/spesificTool.html?toolName=${tName}" class="tool-link">${tName}</a></td>
            <td class="td-description">${tool.description}</td>
            <td class="td-quantity">${tool.quantity}</td>
            <td class="td-electric">${tool.electric}</td>
            <td class="td-functional">${tool.functional}</td>
            <td class="td-buttons"><button class="edit-tool-button" data-tool-id="${tool.id}">Edit</button>
            </td>
            <td><button class="delete-tool-button" data-tool-id="${tool.id}">Delete</button></td>
            <td><button class="admin-markTool-button">Mark tool as working</button></td>
          

        `;
        container.appendChild(toolElement);
        console.log(tool.electric);
        

    
        // add click event listener to delete button
        const deleteButton = toolElement.querySelector('.delete-tool-button');
        deleteButton.addEventListener('click', async () => {
          const confirmMessage = window.confirm("Are you sure you want to delete this?")
          if(confirmMessage) {
            toolElement.remove(); // remove tool from webpage
            const toolId = deleteButton.dataset.toolId;
            const deleted = await deleteTool(toolId); // delete tool from database
            if (!deleted) {
              console.log('Failed to delete tool');
            }
          }
        });

        const toolNameDiv = toolElement.querySelector('.td-name');
        const toolDescriptionDiv = toolElement.querySelector('.td-description');
        const toolQuantityDiv = toolElement.querySelector('.td-quantity');
        const editButton = toolElement.querySelector('.edit-tool-button');


        // add event listener to the "mark tool as working" button
        const markButton = toolElement.querySelector('.admin-markTool-button');
        markButton.addEventListener('click', async () => {
          tool.functional = 'working'; // change the content from "broken" to "working"
          const response = await fetch(`http://localhost:3200/tools/working/${tool.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ functional: 'working' })
          });
          console.log('response:', response);
          if (response.ok) {
            console.log('Tool state updated to working');
            console.log('tool.functional:', tool.functional);
            tool.functional = 'working'; // updates the tool from "broken" to "working"
          } else {
            console.log('Failed to update tool state');
          }
       
      
    });
  
 


// add an event listener to the edit button to handle editing
editButton.addEventListener("click", () => {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
    const currentName = toolNameDiv.textContent;
    const currentDescription = toolDescriptionDiv.textContent;
    const currentQuantity = toolQuantityDiv.textContent;
  // create input elements to replace the divs that display the tool info
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = toolNameDiv.textContent;
  const descriptionInput = document.createElement("textarea");
  descriptionInput.value = toolDescriptionDiv.textContent;
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = toolQuantityDiv.textContent;

  // replace the tool info divs with the input elements
  toolNameDiv.innerHTML = "";
  toolNameDiv.appendChild(nameInput);
  toolDescriptionDiv.innerHTML = "";
  toolDescriptionDiv.appendChild(descriptionInput);
  toolQuantityDiv.innerHTML = "";
  toolQuantityDiv.appendChild(quantityInput);

  // create a save button to save the changes
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    // get the new tool information from the input elements
    const newToolName = nameInput.value;
    const newToolDescription = descriptionInput.value;
    const newToolQuantity = quantityInput.value;

    // send a PUT request to update the tool info in the database
    fetch(`http://localhost:3200/tools/configure/${currentName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newToolName,
        description: newToolDescription,
        quantity: newToolQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = `/admin.html`;
        // replace the input elements with the updated tool info divs
        toolNameDiv.innerHTML = data.name;
        toolDescriptionDiv.innerHTML = data.description;
        toolQuantityDiv.innerHTML = data.quantity;
        buttonContainer.parentNode.removeChild(buttonContainer);
        editButton.style.display = "block";
        deleteButton.style.display = "block";
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // create a cancel button to cancel editing
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    // replace the input elements with the tool info divs
    editButton.style.display = "block";
    deleteButton.style.display = "block";
    toolNameDiv.innerHTML = currentName;
    toolDescriptionDiv.innerHTML = currentDescription;
    toolQuantityDiv.innerHTML = currentQuantity;
    buttonContainer.parentNode.removeChild(buttonContainer);
  });

  // add the save and cancel buttons to the page
  const buttonContainer = document.createElement("div");
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);
  editButton.parentNode.appendChild(buttonContainer);
});

        
      }
    });
    
    
  
  })
  .catch(error => console.error(error));

 
