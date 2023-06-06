

// fetch the product information from the server
const toolName = window.location.search.split('=')[1];

function fetchToolData(toolType, toolName) {
fetch(`https://webprosjekt-heisann.onrender.com/tools/${toolType}/${toolName}`)
  .then(response => response.json())
  .then(tool => {
    if (tool) {
    // update the HTML elements on the page with the product information
    document.getElementById('tool-image-container').innerHTML = `
    <img src="${tool.image}" id="tool-image">`;
    document.getElementById('tool-name').innerHTML = `<h1>${tool.name}</h1>`;
    document.getElementById('tool-description').innerHTML = `<p>${tool.description}</p>`;
    document.getElementById('tool-quantity').innerHTML = `<p>Quantity: ${tool.quantity}</p>`;
   

  } else {
    console.log(`No ${toolType} tool found with name ${toolName}`);
  }
 

   
  })
  .catch(error => console.error(error));
}


console.log(toolName);

fetchToolData('electric', toolName);

fetchToolData('normal', toolName);



