// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiY2hhbmNlMzAiLCJhIjoiY201d2l2Y2F2MDh3djJrcjBqMDR1cWs1ciJ9.RumAdzElXER2otL-xEL4mQ";

const style_2022 = "mapbox://styles/chance30/cm6gkcirj00am01qrhv038lb1";
const style_2024 = "mapbox://styles/chance30/cm6gkha2y004u01s92hcza39z";

const map = new mapboxgl.Map({
 container: "map", // container ID
 style: style_2022,
 center: [-0.089932, 51.514441],
 zoom: 14
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");
//On click the radio button, toggle the style of the map.
for (const input of inputs) {
 input.onclick = (layer) => {
 if (layer.target.id == "style_2022") {
 map.setStyle(style_2022);
 }
 if (layer.target.id == "style_2024") {
 map.setStyle(style_2024);
 }
 };
}