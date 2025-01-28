// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiY2hhbmNlMzAiLCJhIjoiY201d2l2Y2F2MDh3djJrcjBqMDR1cWs1ciJ9.RumAdzElXER2otL-xEL4mQ";

//Before map
const beforeMap = new mapboxgl.Map({
 container: "before",
 style: "mapbox://styles/chance30/cm6gkcirj00am01qrhv038lb1",
 center: [-0.089932, 51.514441],
 zoom: 14
});
//After map
const afterMap = new mapboxgl.Map({
 container: "after",
 style: "mapbox://styles/chance30/cm6gkha2y004u01s92hcza39z",
 center: [-0.089932, 51.514441],
 zoom: 14
});

const container = "#comparison-container";
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {});