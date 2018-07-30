// from data.js
var tableData = data;

var table = d3.select("table");

renderTable(tableData);
function renderTable(dataRender){
    table = d3.select("#table-area");
    var tbody = table.select("tbody");
    d3.select('tbody').html('')
    console.log(dataRender);
    console.log(dataRender.length);
    for(var i=0; i<dataRender.length; i++){
        tr = tbody.append("tr");
        tr.append("td").text(dataRender[i].datetime);
        tr.append("td").text(dataRender[i].city);
        tr.append("td").text(dataRender[i].state);
        tr.append("td").text(dataRender[i].country);
        tr.append("td").text(dataRender[i].shape);
        tr.append("td").text(dataRender[i].durationMinutes);
        tr.append("td").text(dataRender[i].comments);
    }

}

var filter = d3.select("#filter-btn");
filter.on("click", function() {
    d3.event.preventDefault();
    var datePicked = d3.select("#datetime").node().value;
    var finalData = [];
    if(datePicked){
        finalData =  dateChosen(datePicked);
    }
    renderTable(finalData);
});

function dateChosen(datePicked){
    console.log(datePicked);
    return tableData.filter(element => element.datetime === datePicked);
}
