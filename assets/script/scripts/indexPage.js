// for index.html page to display all the tools avaliable and to display the broken/functional tools
window.addEventListener('load', async () => {
    try {
      const response = await fetch('http://localhost:3200/tools/tools');
      const tools = await response.json();
  
      const totalTools = tools.length;
      const workingTools = tools.filter(tool => tool.functional === 'working').length;
      const brokenTools = tools.filter(tool => tool.functional === 'broken').length;
  
      const statsList = document.querySelector('.important-booking-list');
      statsList.innerHTML = `
        <li>Total tools: ${totalTools}</li>
        <li>Available tools: ${workingTools}</li>
        <li>Broken tools: ${brokenTools}</li>
      `;
    } catch (error) {
      console.log(error.message);
    }
  });


// for index page
// checks all the tools for any broken tool and then displays the name of the tool that is flagged as broken
window.addEventListener('load', async () => {
    const response = await fetch('http://localhost:3200/tools/tools', {
      method: "GET"
    });
      const tools = await response.json();
      const brokenTools = tools.filter(tool => tool.functional === "broken");
      const brokenToolNames = brokenTools.map(tool => `${tool.name} is broken`);
      const liElements = brokenToolNames.map(name => {
        const li = document.createElement("li");
        li.innerHTML = name;
        return li;
      });
      const ul = document.querySelector(".important-info-list");
      liElements.forEach(li => ul.appendChild(li));
    });
  