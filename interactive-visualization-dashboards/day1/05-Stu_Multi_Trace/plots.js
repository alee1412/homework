console.log(data);
// YOUR CODE HERE
const trace1 = {
    x: data.map(function(row) { return row.pair} ),
    y: data.map(row => row.greekSearchResults),
    text: data.map(row => row.greekName),
    name: "Greek",
    type: 'bar'
};




const trace2 = {
    x: data.map(function(row) { return row.pair} ),
    y: data.map(row => row.romanSearchResults),
    text: data.map(row => row.romanName),
    name: "Roman",
    type: 'bar'
}

data = [trace1, trace2]

var layout = {
    title: "Greek vs Roman Gods Search Results",
    xaxis: {
        title: "God Pair",
        autotick: true,
        ticks: 'outside',
        tickcolor: '#000',
        tickangle: 45
    },
    yaxis: {
        title: "Search Result",
        autotick: true,
        ticks: 'outside',
        tickcolor: 'red'
    },
    barmode: "stack" // 'group' stack overlay relative 
}

Plotly.newPlot('plot', data, layout)

