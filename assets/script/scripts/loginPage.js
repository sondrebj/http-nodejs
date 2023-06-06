// log in/ register js code for the login.html page below.
    // this is for the functionality of the visual parts of the login/register form
    // where if you press login, it "slides" to the login part, and if you press "register" it "slides" to register
    document.getElementById("signup").addEventListener("click", function() {
        var message = document.querySelector(".message");
        message.style.transform = "translateX(100%)";
        if (message.classList.contains("login")) {
          message.classList.remove("login");
        }
        message.classList.add("signup");
      });
  
      document.getElementById("login").addEventListener("click", function() {
        var message = document.querySelector(".message");
        message.style.transform = "translateX(0)";
        if (message.classList.contains("login")) {
          message.classList.remove("signup");
        }
        message.classList.add("login");
      });



//  functions below are for displaying error msg or success msg when filling out the login/register form in the login.html

// submitForm for register part
async function submitRegisterForm(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        document.getElementById("status").innerHTML = "User created successfully!";
        document.getElementById("error-message").innerHTML = ""; // clear any previous error messages
      } else {
        const errorMessage = await response.text();
        document.getElementById("status").innerHTML = "";
        document.getElementById("error-message").innerHTML = errorMessage;
      }
    } catch (err) {
      console.error(err);
    }
  } 


// submitLoginForm for login part
async function submitLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        // send a message to the parent window with the user's email and login state
        // not sure if we use this anymore...
        window.parent.postMessage({
          loggedIn: true,
          email: email,
        }, "*");
     //   window.alert("You logged in!")
        document.getElementById("status-msg-login").innerHTML = `You logged in!`;
        window.location.href = "index.html"; // redirects the user to the home page
      } else {
        document.getElementById("status-msg-login").innerHTML = "Wrong email or password!";
      }
    } catch (err) {
      console.error(err);
    }
  };