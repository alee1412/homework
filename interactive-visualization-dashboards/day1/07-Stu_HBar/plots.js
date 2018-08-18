// @TODO: Complete the following sections


// Practice
let list = ['Delta', 'alpha', 'Charlie', 'bravo']
list.sort((a,b) => {
    console.log(a + " vs. " + b);
    if(a > b){
        return 1;
    }
    if(a < b){
        return -1;
    }
    return 0;
})

console.log(data);
// Sort the data array using the greekSearchResults value
data.sort((a, b) => parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults))
// Slice the first 10 objects for plotting
data = data.slice(0,10);
// Trace1 for the Greek Data
data = data.reverse();
console.log(data);
// set up the data variable
let trace1 = {
    x:data.map(row => row.greekSearchResults),
    y:data.map(row => row.greekName),
    text: data.map(row => row.greekName),
    name: "Greek",
    type: 'bar',
    orientation: 'h'
};

data = [trace1]
// set up the layout variable
let layout = {
    title: 'Greek gods search results',
    margin: {
        l: 100,
        r: 100, 
        t: 100, 
        b: 100
    }
}
// Render the plot to the div tag with id "plot"
Plotly.newPlot('plot', data, layout)