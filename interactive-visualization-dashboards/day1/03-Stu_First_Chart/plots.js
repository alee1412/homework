var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
  "Brown", "Brown", "Brown", "Green", "Green",
  "Green", "Green", "Green", "Blue", "Blue",
  "Blue", "Blue", "Blue", "Blue"];
var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
  25.7, 24.5, 26.4, 24.2, 28, 26.9,
  29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

// @TODO: Complete the Following Steps
// plotly does not plot them all. 
// It does not even aggregate them. Instead plots only last value 
// listed for each eye color
// For example for "Brown" the final flicker value 
// listed in the CSV is 24.5 
// A more meaniful approach to plotting may be to take 
// the average of each eye color

const eyeColor1 = ['Brown', 'Green', 'Blue']
let brownEye  = eyeFlicker.slice(0,8);
brownEye = brownEye.reduce((a,b) => a + b)/brownEye.length;

let greenEye = eyeFlicker.slice(8,12);
greenEye = greenEye.reduce((a,b) => a + b)/greenEye.length;

let blueEye = eyeFlicker.slice(12,18);
blueEye = blueEye.reduce((a,b)=> a+b)/blueEye.length;
const eyeFlicker1 = [brownEye, greenEye, blueEye]

// Create the Trace
const trace1 = {
  x: eyeColor1,
  y: eyeFlicker1,
  type: 'bar'
}
// Create the data array for our plot
const data = [trace1]
// Define our plot layout
const layout = {
  title: "Eye color vs. Flicker",
  xaxis: { title: 'Eye Color'},
  yaxis: { title: 'Flicker Frequency' }
}
// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot('bar-plot', data, layout);