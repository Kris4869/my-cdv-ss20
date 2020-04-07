let w = 800;
let h = 500;
let padding = 50;

// put the svg onto the page:
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
;


let allNames = data.map(function(d){return d.key});
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w-padding])
    .paddingInner(0.1)
;
let xAxis = d3.axisBottom(xScale);
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
let xAxisGroup = viz.append("g").classed("xAxis", true);
xAxisGroup.call(xAxis);
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
xAxisGroup.selectAll("line").remove();
xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")")


let yMax = d3.max(data, function(d){return d.value});
yDomain = [0, yMax];
let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2]);


let graphGroup = viz.append("g").classed("graphGroup", true);


let elementsForPage = graphGroup.selectAll(".datapoint").data(data, (d)=>d.key);
let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();


let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);
enteringDataGroups.attr("transform", function(d, i){
  return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
});
enteringDataGroups
  .append("rect")
    .attr("width", function(){
      return xScale.bandwidth();
    })
    .attr("height", function(d, i){
      return yScale(d.value);
    })
    .attr("y", function(d,i){
      return -yScale(d.value);
    })
    .attr("fill", "black")
;


function updateadd(){
	
	elementsForPage = graphGroup.selectAll(".datapoint").data(data, (d)=>d.key);
	enteringElements = elementsForPage.enter();
	exitingElements = elementsForPage.exit();
	
	allNames = data.map(function(d){return d.key});
	xScale.domain(allNames);
	xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
	xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data

	yMax = d3.max(data, function(d){return d.value});
	yDomain = [0, yMax+yMax*0.1];
	yScale.domain(yDomain);
	xAxisGroup.transition().duration(1000).call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page

	
	elementsForPage.transition().duration(1000).attr("transform", function(d, i){
  	return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"});
	elementsForPage.select("rect")
	 .transition()
	 .delay(800)
	 .duration(800)
	 .attr("width", function(){
		return xScale.bandwidth();
	 })
	 .attr("y", function(d,i){
	   return -yScale(d.value);
	 })
	 .attr("height", function(d, i){
	   return yScale(d.value);
	 });
	
	let incomingDataGroups = enteringElements
  	.append("g")
    .classed("datapoint", true)
	incomingDataGroups.attr("transform", function(d, i){
  	return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"});
	
	
	
	incomingDataGroups
	.append("rect")
    .attr("y", function(d,i){
      return 0;
    })
    .attr("height", function(d, i){
      return 0;
    })
    .attr("width", function(){
      return xScale.bandwidth();
    })
    .attr("fill", "#F27294")
    .transition()
    .duration(2000).delay(1200)
	.attr("fill", "#000000")
    .attr("y", function(d,i){
      return -yScale(d.value);
    })
    .attr("height", function(d, i){
      return yScale(d.value);
    })
 	;
	

}


function updateexit(){
	elementsForPage = graphGroup.selectAll(".datapoint").data(data, (d)=>d.key);
	enteringElements = elementsForPage.enter();
	exitingElements = elementsForPage.exit();
	
	exitingElements.select("rect")
    .transition()
    .duration(1000)
	.attr("fill", "#04ADBF")
    .attr("y", 0)
	.attr("height", 0);
		
	
	allNames = data.map(function(d){return d.key});
	xScale.domain(allNames);
	xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
	xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data

	yMax = d3.max(data, function(d){return d.value});
	yDomain = [0, yMax+yMax*0.1];
	yScale.domain(yDomain);
	xAxisGroup.transition().duration(1000).delay(1000).call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page
	elementsForPage.transition().duration(1000).delay(1000).attr("transform", function(d, i){
  		return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"});
	elementsForPage.select("rect")
	 .transition()
	 .delay(1000)
	 .duration(1000)
	 .attr("width", function(){
		return xScale.bandwidth();
	 })
	 .attr("y", function(d,i){
	   return -yScale(d.value);
	 })
	 .attr("height", function(d, i){
	   return yScale(d.value);
	 });
	
	exitingElements.transition().delay(2000).remove();
}



function update(){
	
	elementsForPage = graphGroup.selectAll(".datapoint").data(data, (d)=>d.key);
	enteringElements = elementsForPage.enter();
	exitingElements = elementsForPage.exit();
	
	allNames = data.map(function(d){return d.key});
	xScale.domain(allNames);
	xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
	xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data

	yMax = d3.max(data, function(d){return d.value});
	yDomain = [0, yMax+yMax*0.1];
	yScale.domain(yDomain);
	xAxisGroup.transition().duration(1000).call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page

	
	elementsForPage.transition().duration(1000).attr("transform", function(d, i){
  	return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"});
	elementsForPage.select("rect")
	 .transition()
	 .delay(800)
	 .duration(800)
	 .attr("width", function(){
		return xScale.bandwidth();
	 })
	 .attr("y", function(d,i){
	   return -yScale(d.value);
	 })
	 .attr("height", function(d, i){
	   return yScale(d.value);
	 });

}





function add(){
  	addDatapoints(1);
	updateadd();
}
document.getElementById("buttonA").addEventListener("click", add);

function remove(){
  	removeDatapoints(1);
	updateexit();
}
document.getElementById("buttonB").addEventListener("click", remove);

function removeAndAdd(){
	for (i = 0; i < 1; i++){
		remove();
		add();
	}
}
document.getElementById("buttonC").addEventListener("click", removeAndAdd);

function sortData(){
  sortDatapoints();
  update();
}
document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData(){
  shuffleDatapoints();
  update();
}
document.getElementById("buttonE").addEventListener("click", shuffleData);


ball = document.getElementById("buttonF");



ball.onmousedown = function(event) {
		data = [];
		updateexit();
	};



