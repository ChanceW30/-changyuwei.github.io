// 设置 Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbmNlMzAiLCJhIjoiY201d2l2Y2F2MDh3djJrcjBqMDR1cWs1ciJ9.RumAdzElXER2otL-xEL4mQ';  // 替换为你的真实 Mapbox 访问令牌

// 初始化地图
const map = new mapboxgl.Map({
  container: 'map',  // 地图容器 ID
  style: 'mapbox://styles/chance30/cm76ymaas00ks01qvapzc4j33',  // 替换为你的样式 URL
  center: [-4.2518, 55.8642],  // 苏格兰（格拉斯哥）的中心坐标
  zoom: 7  // 初始缩放级别（适合苏格兰全景）
});

// 添加地图控件（缩放和旋转）
map.addControl(new mapboxgl.NavigationControl());

map.on('click', 'scotlandsport', (e) => {  // 替换为你的 Mapbox Studio 图层名称
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

// 更改鼠标样式以显示交互性
map.on('mouseenter', 'scotlandsport', () => {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'scotlandsport', () => {
  map.getCanvas().style.cursor = '';
});

// 筛选功能
document.getElementById('filter-controls').addEventListener('change', (e) => {
  const type = e.target.id;

  if (type === 'all') {
    map.setFilter('scotlandsport', null);  // 显示所有设施
  } else {
    map.setFilter('scotlandsport', ['==', 'facility_type', type]);  // 筛选单一设施类型
  }
});

// ------------------ 反馈表单功能 ------------------

// 获取元素
const feedbackPanel = document.getElementById('feedback-panel');
const openFeedbackButton = document.getElementById('open-feedback-button');
const closeFeedbackButton = document.getElementById('close-feedback');
const feedbackText = document.getElementById('feedback-text');
const feedbackHistoryContainer = document.getElementById('feedback-history');

// 打开反馈表单
openFeedbackButton.addEventListener('click', () => {
  feedbackPanel.style.right = '0';  // 展开表单
  openFeedbackButton.style.display = 'none';  // 隐藏按钮
  loadFeedbackHistory();  // 确保历史反馈实时加载
});

// 关闭反馈表单
closeFeedbackButton.addEventListener('click', () => {
  feedbackPanel.style.right = '-400px';  // 收起表单
  openFeedbackButton.style.display = 'block';  // 重新显示按钮
});

// 提交反馈功能
document.getElementById('submit-feedback').addEventListener('click', () => {
  const feedback = feedbackText.value.trim();

  if (feedback === '') {
    alert('Please enter your feedback.');
    return;
  }

  // 获取现有反馈列表
  const feedbackList = JSON.parse(localStorage.getItem('feedbacks')) || [];

  // 添加新反馈到列表，带上时间戳
  feedbackList.push({
    feedback: feedback,
    date: new Date().toLocaleString()
  });

  // 存储到 LocalStorage
  localStorage.setItem('feedbacks', JSON.stringify(feedbackList));

  // 清空输入框并关闭表单
  alert('Thank you for your feedback!');
  feedbackText.value = '';
  feedbackPanel.style.right = '-400px';  // 关闭表单
  openFeedbackButton.style.display = 'block';  // 重新显示按钮

  // 实时刷新历史反馈
  loadFeedbackHistory();
});

// 加载历史反馈到页面
function loadFeedbackHistory() {
  const feedbackList = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbackHistoryContainer.innerHTML = ''; // 清空现有内容

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
const apiKey = "f603084c9dd8fb63605ae4a14fa418d5";  // 替换为你的 OpenWeather API Key

// 获取用户位置
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 调用获取天气的函数
    fetchWeather(lat, lon);

    // **每 10 分钟（600000 毫秒）更新一次天气**
    setInterval(() => fetchWeather(lat, lon), 600000);
}

// 失败处理
function error() {
    console.error("Failed to get user location.");
    document.getElementById("weather-info").innerText = "Unable to retrieve weather data";
}

// **获取天气数据的函数**
function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("Weather data:", data);
            displayWeather(data);
        })
        .catch(error => console.error("Weather API request failed:", error));
}

// **显示天气信息**
function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
}





  
