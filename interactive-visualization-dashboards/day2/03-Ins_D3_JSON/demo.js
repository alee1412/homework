const url = "https://api.spacexdata.com/v2/launchpads";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log("Data from json");
  console.log(data[0]);
});

// Promise Pending
console.log("Promises");
const dataPromise = d3.json(url);
dataPromise.then((data) => {
  console.log(data)
})
console.log("Data Promise: ", dataPromise);
