var w = 800;
var h = 500;
var padding = 50;

// put the svg onto the page:
var viz = d3.select("#container")
	.append("svg")
    .style("width", w)
    .style("height", h)
;

d3.csv("data.csv").then(incomingData=>{
	viz.selectAll(".rect").data(incomingData).enter();
});



