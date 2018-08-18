var apiKey = "iyDCBp6py6tA1hGFsnPD";

/* global Plotly */
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} data
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}

/**
 * Fetch data and build the timeseries plot
 */
function buildPlot() {
  // @TODO: YOUR CODE HERE
  // Promise 
  const promise = d3.json(url)
  console.log(promise);
  // 
  d3.json(url).then(function(data) {
    console.log(data)
    //let { name } = data.dataset; 
    // 
    let name = data.dataset.name;
    let stock = data.dataset.dataset_code;
    let startDate = data.dataset.start_date;
    let endDate = data.dataset.end_date;
    let dates = unpack(data.dataset.data, 0);
    console.log(dates)
    let closingPrices = unpack(data.dataset.data,1);
    console.log(closingPrices)



    let trace1 = {
      type: 'scatter',
      mode: 'lines',
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    }
    data = [trace1];
    console.log(data);
    
    let layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: 'date'
      },
      yaxis: {
        autorange: true,
        type: "linear",
      }
    }
    Plotly.newPlot('plot', data, layout);
  })
}

buildPlot();
