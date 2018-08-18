//defining width
var width = parseInt(d3.select('#scatter').style('width'));

//defining height
var height = width - width/3.9;

//margin for spacing of graph
var margin = 20;

//spacing for placing words
var labelArea = 110;

//padding for the text at the bottom and left area
var paddingBot = 40;
var paddingLeft = 40;

//Create the canvas for the graph
var svg = d3
    .select('#scatter')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chart');

//Define circle radius
var circRadius; 
function crGet() {
    if (width <= 530) {
        circRadius = 5;
    }
    else {
        circRadius = 10;
    }
}
crGet();

//Create labels for axis

//Bottom Axis
svg.append('g').attr('class', 'xText');

//Referencing xText
var xText = d3.select('.xText');

//Give xText a transform property (shifting location of axis)
function xTextRefresh() {
    xText.attr('transform', 'translate(' + 
    ((width - labelArea) / 2 + labelArea) +
     ', ' + (height - margin - paddingBot) + 
     ')');
}

xTextRefresh();

//Use xText to append 3 text names for the axis

//1) Poverty
xText
    .append('text')
    .attr('y', -26)
    .attr('data-name', 'poverty')
    .attr('data-axis', 'x')
    .attr('class', 'aText active x')
    .text('In Povery (%)');

//2) Age
xText
    .append('text')
    .attr('y', 0)
    .attr('data-name', 'age')
    .attr('data-axis', 'x')
    .attr('class', 'aText inactive x')
    .text('Age (Median)');

//3) Income
xText
    .append('text')
    .attr('y', 26)
    .attr('data-name', 'income')
    .attr('data-axis', 'x')
    .attr('class', 'aText inactive x')
    .text('Household Income (Median)');

//Left Axis
var leftTextX = margin + paddingLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

//Second Lable Group
svg.append('g').attr('class', 'yText')

//Refer to yText
var yText = d3.select('.yText');

//Similar to xTextRefresh
function yTextRefresh() {
    yText.attr(
        'transform', 
        'translate(' + leftTextX + ', ' + leftTextY + ')rotate(-90)'
    );
}

yTextRefresh();

//1) Obesity
yText
    .append('text')
    .attr('y', -26)
    .attr('data-name', 'obesity')
    .attr('data-axis', 'y')
    .attr('class', 'aText active y')
    .text('Obese (%)');

//2) Smokes
yText
    .append('text')
    .attr('y', 0)
    .attr('data-name', 'smokes')
    .attr('data-axis', 'y')
    .attr('class', 'aText inactive y')
    .text('Smokes (%)');

//3) Lacks Healthcare
yText
    .append('text')
    .attr('y', 26)
    .attr('data-name', 'healthcare')
    .attr('data-axis', 'y')
    .attr('class', 'aText inactive y')
    .text('Lacks Healthcare (%)');

//Reading CSV 
d3.csv('assets/data/data.csv').then(function(data) {
    visualize(data);
});

//Create visualization function
//Purpose of function is to manipulate all the visual elements
function visualize(theData) {
    var curX = 'poverty';
    var curY = 'obesity';

    //variables to store the max and min values
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    //Create tool tip functionality
    var toolTip = d3
        .tip()
        .attr('class', 'd3-tip')
        .offset([40, -60])
        .html(function(d) {
            var theX;
            //Grab the state name
            var theState = '<div>' + d.state + '</div>';
            //Grab the y value's key and value
            var theY = '<div>' + curY + ': ' + d[curY] + '%</div>';
            //If x key is poverty
            if (curX === 'poverty') {
                //Grab the x key and value
                theX = '<div>' + curX + ': ' + d[curX] + '%</div>'
            }
            else {
                theX = '<div>' + curX + ': ' + parseFloat(d[curX]).toLocaleString('eng') + '</div>';
            }
            //Display what we capture
            return theState + theX + theY 
        });

    svg.call(toolTip);

    //create function to find max and min value of the column
    function xMinMax() {
        xMin = d3.min(theData, function(d) {
            return parseFloat(d[curX]) * 0.90
            });

        xMax = d3.max(theData, function(d) {
            return parseFloat(d[curX]) * 1.10;
            });
        }

    function yMinMax() {
        yMin = d3.min(theData, function(d) {
            return parseFloat(d[curY]) * 0.90
            });
    
        yMax = d3.max(theData, function(d) {
            return parseFloat(d[curY]) * 1.10;
            });    
        }

    //Change classes and appearance when a different label text is clicked
    function labelChange(axis, clickText) {
        //switch the current active to inactive
        d3
            .selectAll('.aText')
            .filter('.' + axis)
            .filter('.active')
            .classed('active', false)
            .classed('inactive', true);

        //switch the text just clicked to active
        clickedText.classed('inactive', false).classed('active', true);
    }

    //Scatter Plot
    xMinMax();
    yMinMax();
    
    //Now that min and max values for x and y are defined
    //Build the scales
    var xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin]);
    
    var yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin - labelArea, margin]);
    
    //Pass scales into the axis methods to create axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    //Determine the x and y tick counts
    function tickCount() {
        if (width <= 500) {
            xAxis.ticks(5);
            yAxis.ticks(5);
        }
        else {
            xAxis.ticks(10);
            yAxis.ticks(10);
        }
    }

    tickCount();

    //Append axis to the svg as group elements
    svg
        .append('g')
        .call(xAxis)
        .attr('class', 'xAxis')
        .attr('transform', 'translate(0, ' + (height - margin - labelArea) + ')');

    svg
        .append('g')
        .call('yAxis')
        .attr('class', 'yAxis')
        .attr('transform', 'translate(' + (margin + labelArea) + ', 0)');

    //Append the circles for each row of data
    var theCircles = svg.selectAll('g theCircles').data(theData).enter();

    theCircles
        .append('circle')
        .attr('cx', function(d) {
            return xScale(d[curX])
        })
        .attr('cy', function(d) {
            return yScale(d[curY]);
        })
        .attr('r', circRadius)
        .attr('class', function(d) {
            return 'stateCircle ' + d.abbr;
        })
        .on('mouseover', function(d) {
            //Show tooltip when mouse is on the circle
            toolTip.show(d, this);
            //Highlighting the state circle's border
            d3.select(this).style('stroke', '#323232')
        })
        .on('mouseout', function(d) {
            //remove the tooltip
            toolTip.hide(d);
            //remove the highlight
            d3.select(this).style('stroke', '#e3e3e3')
        });

        theCircles
            .append('text')
            .text(function(d) {
                return d.abbr;
            })
            .attr('dx', function(d) {
                return xScale(d[curX]);
            })
            .attr('dy', function(d) {
                //When size of the text is the radius
                //Add a third of the radius to the height
                //Pushes it to the middle of the screen
                return yScale(d[curY]) + circRadius / 2.5;
            })
            .attr('font-size', circRadius)
            .attr('class', 'stateText')
            .on('mouseover', function(d) {
                toolTip.show(d);

                d3.select('.' + d.abbr).style('stroke', '#323232');
            })
            
            .on('mouseout', function(d) {
                toolTip.hide(d);

                d3.select('.' + d.abbr).style('stroke', '#e3e3e3');
            });

            //Make the graph dynamic
            d3.selectAll('.aText').on('click', function() {
                var self = d3.select(this)

                //Selecting inactive labels
                if (self.classed('inactive')) {
                    //Grab the name and axis saved in the label
                    var axis = self.attr('data-axis')
                    var name = self.attr('data-name')

                    if (axis === 'x') {
                        curX = name;

                        //Change the min and max
                        xMinMax();
                        //Update the domain of x
                        xScale.domain([xMin, xMax]);

                        svg.select('.xAxis').transition().duration(200).call(xAxis)

                        //Axis change, change location of circles
                        d3.selectAll('circle').each(function() {
                            d3
                                .select(this)
                                .transition()
                                .attr('cx', function(d) {
                                    return xScale(d[curX]);
                                })
                                .duration(200);
                        });
                        //Change classes to active and the clicked label
                        labelChange(axis, self);
                    }
                    else {
                        //When y is clicked do this
                        curY = name; 
                        //Change the min and max of y axis
                        yMinMax();
                        //Update the y axis
                        svg.select('.yAxis').transition(200).call(yAxis);
                        //With the axis changed, change location of circles
                        d3.selectAll('circle').each(function() {
                            d3
                                .select(this)
                                .transition()
                                .attr('cx', function(d) {
                                    return yScale(d[curX]);
                                })
                                .duration(200);
                        });
                        //Change classes to active and the clicked label
                        labelChange(axis, self);
                    }
                }
            })
}