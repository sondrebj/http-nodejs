// footer component
class FooterComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <footer>
      <img src="/assets/images/logo_ntnu_tag_norsk.svg" alt="picture of NTNU logo" class="footer-img">
      <div class="footer-container">  
          <div class="footer-top">      
              <p class="footer-top-info">Contact Info</p>
                  <ul>
                      <li><a href="https://www.ntnu.no/" class="footer-list">NTNU Homepage</a></li>
                      <li><a href="email@test.no" class="footer-list">NTNU mail</a></li>
                      <li><a href="https://www.ntnu.no/ansatte/ida.parelius" class="footer-list">Person responsible for the workshop</a></li>
                      <li><a href="email@test.no" class="footer-list">Idas mail</a></li>
                      <li><a href="73595000" class="footer-list">Telephone switchboard: 73 59 50 00</a></li>
                  </ul>
          </div>
  
          <div class="footer-top">
              <p class="footer-top-info">Other medias</p>
                  <ul>
                      <li><a href="https://www.instagram.com/" class="fa fa-instagram"></a></li>
                      <li><a href="https://www.facebook.com/" class="fa fa-facebook"></a></li>
                  </ul>
          </div>
      </div>
      </footer>
      `;
  
      // create a new map element
      const mapElement = document.createElement('div');
      mapElement.setAttribute('id', 'map');
      mapElement.style.height = '200px'; // set the height of the map
      mapElement.style.padding = "relative"
      mapElement.style.margin = "40px"
  
      // append the map element to the footer container
      const footerContainer = this.querySelector('.footer-container');
      footerContainer.appendChild(mapElement);
  
      // initialize the map
      const map = new google.maps.Map(mapElement, {
        center: { lat: 60.789619024489895, lng: 10.675773229350039}, // set the initial center of the map
        zoom: 14, // set the initial zoom level
      });
  
      const location = new google.maps.LatLng(60.78962992090764, 10.675766849946319);
  
      // create a marker at the specified location
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'Verkstedet' // you can set a title to display when hovering over the marker
        });
  
    }
  }
  
  customElements.define('footer-component', FooterComponent);