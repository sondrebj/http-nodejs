const toolNameDiv = document.getElementById("tool-name");
const toolDescriptionDiv = document.getElementById("tool-description");
const toolQuantityDiv = document.getElementById("tool-quantity");
const editButton = document.getElementById("editButton");

// add an event listener to the edit button to handle editing
editButton.addEventListener("click", () => {

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
        window.location.href = `/spesificTool.html?toolName=${newToolName}`;
        // replace the input elements with the updated tool info divs
        toolNameDiv.innerHTML = data.name;

        toolDescriptionDiv.innerHTML = data.description;
        toolQuantityDiv.innerHTML = data.quantity;
        buttonContainer.parentNode.removeChild(buttonContainer);
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
    toolNameDiv.innerHTML = currentName;
    toolDescriptionDiv.innerHTML = currentDescription;
    toolQuantityDiv.innerHTML = currentQuantity;
    buttonContainer.parentNode.removeChild(buttonContainer);
  });

  // add the save and cancel buttons to the page
  const buttonContainer = document.createElement("div");
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);
  toolQuantityDiv.parentNode.appendChild(buttonContainer);
});