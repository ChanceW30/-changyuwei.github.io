// Example Set the Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbmNlMzAiLCJhIjoiY201d2l2Y2F2MDh3djJrcjBqMDR1cWs1ciJ9.RumAdzElXER2otL-xEL4mQ';  

// Initialize map
const map = new mapboxgl.Map({
  container: 'map',  // Map container ID
  style: 'mapbox://styles/chance30/cm76ymaas00ks01qvapzc4j33',  
  center: [-4.2518, 55.8642],  // The central coordinates of Glasgow, Scotland
  zoom: 7  // Initial scale level
});

// Add map controls
map.addControl(new mapboxgl.NavigationControl());

map.on('click', 'scotlandsport', (e) => {  
  if (e.features.length > 0) {
    let popupContent = '<h3>Facilities at this location:</h3><ul>';
    e.features.forEach(feature => {
      popupContent += `
        <li>
          <strong>${feature.properties.site_name || 'Unnamed Facility'}</strong> - 
          ${feature.properties.facility_type || 'Unknown Type'}
        </li>`;
    });
    popupContent += '</ul>';

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  } else {
    console.error('Data point not found');
  }
});

// Change the mouse style to show interactivity
map.on('mouseenter', 'scotlandsport', () => {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'scotlandsport', () => {
  map.getCanvas().style.cursor = '';
});

// Screening function
document.getElementById('filter-controls').addEventListener('change', (e) => {
  const type = e.target.id;

  if (type === 'all') {
    map.setFilter('scotlandsport', null);  // Show all facilities
  } else {
    map.setFilter('scotlandsport', ['==', 'facility_type', type]);  // Filter a single facility type
  }
});

//Feedback form function
// Get element
const feedbackPanel = document.getElementById('feedback-panel');
const openFeedbackButton = document.getElementById('open-feedback-button');
const closeFeedbackButton = document.getElementById('close-feedback');
const feedbackText = document.getElementById('feedback-text');
const feedbackHistoryContainer = document.getElementById('feedback-history');

// Open feedback form
openFeedbackButton.addEventListener('click', () => {
  feedbackPanel.style.right = '0';  // Expand the form
  openFeedbackButton.style.display = 'none';  // Hide button
  loadFeedbackHistory();  // Ensure historical feedback loads in real time
});

// Close feedback form
closeFeedbackButton.addEventListener('click', () => {
  feedbackPanel.style.right = '-400px';  // Collapse form
  openFeedbackButton.style.display = 'block';  // Redisplay button
});

// Submit feedback function
document.getElementById('submit-feedback').addEventListener('click', () => {
  const feedback = feedbackText.value.trim();

  if (feedback === '') {
    alert('Please enter your feedback.');
    return;
  }

  // Get a list of existing feedback
  const feedbackList = JSON.parse(localStorage.getItem('feedbacks')) || [];

  // Add new feedback to the list with a time stamp
  feedbackList.push({
    feedback: feedback,
    date: new Date().toLocaleString()
  });

  // Store to LocalStorage
  localStorage.setItem('feedbacks', JSON.stringify(feedbackList));

  // Clear the input fields and close the form
  alert('Thank you for your feedback!');
  feedbackText.value = '';
  feedbackPanel.style.right = '-400px';  // Close form
  openFeedbackButton.style.display = 'block';  // Redisplay button

  // Refresh historical feedback in real time
  loadFeedbackHistory();
});

// Load history feedback to the page
function loadFeedbackHistory() {
  const feedbackList = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbackHistoryContainer.innerHTML = ''; // Clear existing content

  if (feedbackList.length === 0) {
    feedbackHistoryContainer.innerHTML = '<p>No feedback submitted yet.</p>';
  } else {
    feedbackList.forEach(feedback => {
      const feedbackItem = document.createElement('div');
      feedbackItem.classList.add('feedback-item');
      feedbackItem.innerHTML = `
        <p><strong>Date:</strong> ${feedback.date}</p>
        <p>${feedback.feedback}</p>
        <hr>
      `;
      feedbackHistoryContainer.appendChild(feedbackItem);
    });
  }
}

// OpenWeather API Key
const apiKey = "f603084c9dd8fb63605ae4a14fa418d5";  

// Get user location
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Call the function that gets the weather
    fetchWeather(lat, lon);

    // The weather is updated every 10 minutes
    setInterval(() => fetchWeather(lat, lon), 600000);
}

// Failure handling
function error() {
    console.error("Failed to get user location.");
    document.getElementById("weather-info").innerText = "Unable to retrieve weather data";
}

// A function to get weather data
function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("Weather data:", data);
            displayWeather(data);
        })
        .catch(error => console.error("Weather API request failed:", error));
}

// Show weather information
function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
}





  
