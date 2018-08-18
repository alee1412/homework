/* data route */
var url = "/data";

function buildPlot() {
    // YOUR CODE HERE
    // fetch the data from your api
    // plot the results
    d3.json("/data").then((response) => {
        console.log(response);
        let trace1 = {
            type: "scatter",
            mode: 'lines',
            name: 'Bigfoot Sightings',
            x: response.map(data => data.year),
            y: response.map(data => data.sightings),
            line: {
                color: "#17BECF"
            }
        }

        let data = [trace1]

        let layout = {
            title: "Bigfoot Sightings Per Year",
            xaxis: {
                type: 'data'
            },
            yaxis: {
                autorange: true,
                type: 'linear'
            }
        }

        Plotly.newPlot('plot', data, layout);
    });
}

buildPlot();
