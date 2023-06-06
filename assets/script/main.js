let navLinks = document.getElementById("nav_links");

function checkForblank() {

    let leftlink = document.getElementById("test");
    const error1 = document.getElementById("error");
    const error2 = document.getElementById("error2");
    const error3 = document.getElementById("error3");
    const error4 = document.getElementById("error4");
    let myname = document.getElementById("name");
    let mytextarea = document.getElementById("textarea");

   let form = document.getElementById("myForm");

  if (myname.value === "" && mytextarea.value === "") {
    error3.style.color = "red";
    error2.style.color = "red";
    error4.textContent = "You are missing some required input fields please try again.";
    error2.textContent = "You have forgotten to input your name!";
    error3.textContent = "You have forgotten to input your message!";
    error4.focus();
    return false;
  } else if (myname.value == "") {
    error4.textContent = "You are missing some required input fields please try again.";
    error2.textContent = "You have forgotten to input your name!";
    error2.style.color = "red";
    error4.focus();
    return false;
  } else if (mytextarea.value == "") {
    error4.textContent = "You are missing some required input fields please try again.";
    error3.style.textIndent = 0 + "px";
    error3.style.color = "red";
    error3.textContent = "You have forgotten to input your message!";
    error4.focus();
    return false;
  }
}

function validateForm() {
  let e = document.forms["myForm"]["quantity"].value;
  var x = document.forms["myForm"]["electric"].value;
  if (isNaN(e)) {
    alert("Quantity field must be a number");
    return false;
  }
  if (x != "true" && x != "false" && x != "") {
    alert("Electric field must be either true or false");
    return false;
  }      
}

function showMenu(){
    navLinks.style.right = "0" + "px";
}

function hideMenu(){
    navLinks.style.right = "-200" + "px"; 
}



// used in the different tool pages so the admin can delete the tool

const deleteTool = async (toolId) => {
  try {
    const response = await fetch(`http://localhost:3200/tools/delete/${toolId}`, {
      method: 'DELETE',
    });

    console.log("tool delete")
    if (!response.ok) {
      throw new Error('Failed to delete tool');
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};



  // function to display different messages based on the success/error when uploading a tool
    async function addTool(event) {
      event.preventDefault();
      const form = document.querySelector(".uploadTool");
      const formData = new FormData(form);
    
      try {
        const response = await fetch("/tools/upload", {
          method: "POST",
          body: formData,
        });
    
        if (response.status === 200) {
          document.getElementById("success").innerHTML = "Tool added!";
          document.getElementById("notsuccess").innerHTML = ""; // clear any previous error messages
        } else {
          const errorMessage = await response.text();
          document.getElementById("success").innerHTML = "";
          document.getElementById("notsuccess").innerHTML = "Please fill out the required form!";
        }
      } catch (err) {
        console.error(err);
      }
    }

    

  // function to display different message based on if booking was successfull / error
    async function submitBookingForm(event) {
      event.preventDefault();
      const email = document.getElementById("booking-email").value;
      const startBookingDate = document.getElementById("bookingStart").value;
      const endBookingDate = document.getElementById("bookingEnd").value;
      const toolNameElements = document.querySelectorAll(".toolName");
        let toolName = "";
        toolNameElements.forEach(element => {
          toolName += element.textContent + ", ";
        });
        toolName = toolName.slice(0, -2); // remove the last comma and space

      const toolIdElements = document.querySelectorAll(".toolID");
        let toolID = "";
        toolIdElements.forEach(element => {
          toolID += element.textContent + ", ";
        });
        toolID = toolID.slice(0, -2); // remove the last comma and space 
        

      
     
      try {
        

        const response = await fetch("/booking/uploadBooking", {
          method: "POST",
          body: JSON.stringify({ email, startBookingDate, endBookingDate, toolName, toolID}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          document.getElementById("booking-success").innerHTML = `Booking appointment sent!`;
          // Update the data of the tools in the database
          const toolIds = toolID.split(", ");
          for (const id of toolIds) {
          // Perform a database update operation for each tool
          // For example, if you are using SQL:
          // UPDATE tools SET status = 'booked' WHERE id = id;
          }
         // document.getElementById("booking-notsuccess").innerHTML = ""; // clear any previous error messages
        } else {
          const errorMessage = await response.text();
          document.getElementById("booking-success").innerHTML = "Booking not success!";
          //document.getElementById("booking-notsuccess").innerHTML = "Booking not success!";
        }
      } catch (err) {
        console.error(err);
      }
    };

   
  
  
  






