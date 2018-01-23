function drawPersistChart() {

// persist chart
var persistData = [
{"college": "iL and S Administered Programs","value": 42,"color": "#b5cf6b","axisName": "LS Programs"},
{"college": "iL and S Bio Sciences","value": 52,"color": "#6b6ecf","axisName": "Bio Sciences"},
{"college": "iL and S Undergraduate Division","value": 53,"color": "#e7ba52","axisName": "LS Undergrad"},
{"college": "iL and S Math and Physical Sciences","value": 55,"color": "#d6616b","axisName": "Math Phys Sci"},
{"college": "iCollege of Natural Resources","value": 60,"color": "#543005","axisName": "Nat Resources"},
{"college": "iL and S Arts and Humanities","value": 61,"color": "#7b4173","axisName": "Arts Humanities"},
{"college": "iL and S Social Sciences","value": 61,"color": "#637939","axisName": "Social Sciences"},
{"college": "iCollege of Chemistry","value": 62,"color": "#AD494A","axisName": "Chemistry"},
{"college": "iCollege of Environmental Design","value": 67,"color": "#003c30","axisName": "Env Design"},
{"college": "iCollege of Engineering","value": 84,"color": "#bd9e39","axisName": "Engineering"},
{"college": "iHaas School of Business","value": 91,"color": "#393B79","axisName": "Business"}
];

var margin = {top: 0, right: 0, bottom: 30, left: 100},
width = 200 - margin.left - margin.right,
height = 200 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
.rangeRoundBands([height,0], 0.15);

var x = d3.scale.linear()
.range([0, width]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.ticks(5, "%");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var persistChart = d3.select("#navChart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

y.domain(persistData.map(function(d) { return d.axisName; }));
x.domain([0, d3.max(persistData, function(d) { return d.value; })]);

persistChart.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll(".x.axis text")
.style("text-anchor", "middle");

persistChart.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("");

persistChart.selectAll(".bar")
.data(persistData)
.enter().append("rect")
.attr("class", "bar")
.style("opacity", 1e-6)
.style("fill", function(d) {return d.color;})
.attr("y", function(d) { return y(d.college); })
.attr("height", y.rangeBand())
.attr("x", 0)
.attr("width", function(d) { return x(d.value); })
.on("click", dispatchBar);



//tooltips 

	var barTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-8, 0])
    .html(function(d) { return d.axisName + " : <span style='color:#4682B4'>"  + d.value + "%</span>";});


	//set up the tool tips
	d3.selectAll(".bar").call(barTip);
	d3.selectAll(".bar").on('mouseover', barTip.show)
		.on('mouseout', barTip.hide);
	
	d3.selectAll(".bar")
		.transition().delay(1000).duration(2500)
		.style("opacity", 1);
}