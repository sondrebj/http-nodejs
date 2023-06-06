// nav component and the script that makes the navbar change based on the login state
class NavComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="header">
        <nav tabindex="0">
           <div class="nav_links" id="nav_links">
                
              <ul role="navigation">
                  <div id="logo">
                  <a href="index.html"><img src="/assets/images/logo_ntnu.svg"></a>
                  </div>
                  <div id="mylinks">
                  <li id="leftlink"><a href="index.html" id="test">Home</a></li>
                  <li><a href="tools.html">Tools</a></li>
                  
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="feedback.html">Feedback</a></li>
                  <li id="admin-link" style="display: none;"><a href="/admin.html">Admin</a></li>
                  <li id="login-link"><a href="login.html">Log In</a></li>
                  <li id="logout-link"><a>Log out</a></li>  
                  <li id="user-email"><a></a></li>
                  </div>
              </ul>
          </div>  
        </nav>
        </header>
      `;

      const logoutLink = document.getElementById("logout-link");
        if (logoutLink) {
          logoutLink.addEventListener("click", async () => {
            const response = await fetch('http://localhost:3200/logout', {
              method: 'GET',
              credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            localStorage.clear();
            // redirect the user to the login page
            window.location.href = "login.html";
          });
        }

    }
  }

  customElements.define('nav-component', NavComponent);

  // named function to update nav bar based on login state
function updateNavBar(email) {
    document.getElementById("login-link").style.display = "none";
    document.getElementById("logout-link").style.display = "inline-block";
    document.getElementById("user-email").style.display = "inline-block";
    document.getElementById("user-email").getElementsByTagName("a")[0].innerHTML = email;
  }
  
  // add event listener to update nav bar based on login state
  window.addEventListener("message", (event) => {
    if (event.data.loggedIn) {
      updateNavBar(event.data.email);
    } else {
      document.getElementById("login-link").style.display = "inline-block";
      document.getElementById("logout-link").style.display = "none";
      document.getElementById("user-email").style.display = "none";
      document.getElementById("user-email").getElementsByTagName("a")[0].innerHTML = "";
    }
  });
  
  // add event listener to update nav bar when the page loads
  window.addEventListener("load", async () => {
    const response = await fetch('http://localhost:3200/decode', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (data.email) {
      updateNavBar(data.email);
      if (data.role === 'admin') {
        document.getElementById("admin-link").style.display = "inline-block";
        document.getElementById("editButton").style.display = "inline-block";
        const deleteButtons = document.getElementsByClassName("delete-tool-button");
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "inline-block";
      }
      }
    } else {
      document.getElementById("login-link").style.display = "inline-block";
      document.getElementById("logout-link").style.display = "none";
      document.getElementById("user-email").style.display = "none";
      document.getElementById("user-email").getElementsByTagName("a")[0].innerHTML = "";

      if (!document.cookie) {
        // Cookie is not present, hide the buttons
        document.getElementById("checkout-button").style.display = "none";
        const brokenToolButtons = document.querySelectorAll(".broken-tool-button");
        const bookToolButtons = document.querySelectorAll(".book-tool-button");
      
        for (let i = 0; i < brokenToolButtons.length; i++) {
          brokenToolButtons[i].style.display = "none";
        }
        for (let i = 0; i < bookToolButtons.length; i++) {
          bookToolButtons[i].style.display = "none";
        }
      }
    }
    
  });

