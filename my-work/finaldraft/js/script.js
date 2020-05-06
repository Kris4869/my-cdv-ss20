var w = 350;
var h = 350;
var padding = 5;
var xPadding = 50;
var yPadding = 50;

//var untrustIndex = [0, 3, 4, 29, 0, 41, 0, 14, 64, 27, 78, 22, 116, 61, 126, 153, 48, 0, 90, 84, 0, 67, 116, 57, 80, 250, 182, 45, 288, 109, 238, 99, 192, 231, 238, 233, 180, 354, 168, 273, 160, 164, 302, 86, 312, 238, 92, 211, 480, 490, 172, 429, 184, 245, 108, 381, 216, 150, 78, 337, 120, 607, 594, 325, 0, 325, 0, 134, 748, 414, 560, 383, 288, 730, 708, 442, 212, 920, 328, 695, 624, 554, 0, 490, 520, 599, 172, 427, 624, 634]
//var panicIndex = [0, 10, 12, 6, 4, 30, 30, 9, 56, 90, 38, 117, 76, 91, 90, 119, 96, 68, 72, 84, 156, 130, 234, 107, 192, 86, 122, 45, 36, 148, 170, 66, 320, 99, 68, 202, 252, 312, 304, 374, 40, 123, 260, 215, 364, 463, 92, 181, 240, 309, 328, 153, 92, 632, 354, 381, 392, 627, 296, 430, 612, 71, 132, 585, 64, 0, 660, 197, 0, 414, 94, 201, 536, 0, 444, 150, 212, 340, 210, 418, 160, 661, 564, 313, 336, 1016, 938, 174, 232, 178]
var untrustIndex = [1,2,3,4,5]
var panicIndex = [1,2,3,4,5]
var datemap = ['0115','0116','0117','0118','0119','0120','0121','0122','0123','0124','0125','0126','0127','0128','0129','0130','0131','0201','0202','0203','0204','0205','0206','0207','0208','0209','0210','0211','0212','0213','0214','0215','0216','0217','0218','0219','0220','0221','0222','0223','0224','0225','0226','0227','0228','0229','0301','0302','0303','0304','0305','0306','0307','0308','0309','0310','0311','0312','0313','0314','0315','0316','0317','0318','0319','0320','0321','0322','0323','0324','0325','0326','0327','0328','0329','0330','0331','0401','0402','0403','0404','0405','0406','0407','0408','0409','0410','0411','0412','0413','0414','0415','0416','0417','0418','0419'];
var date = 5;

var vizm = d3.select("#map")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

var vizg = d3.select("#graph")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

var vizp= d3.select("#panic")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

var vizu = d3.select("#untrust")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

function objDate(datex){
	let month = Number(datex.slice(0, 2))-1
	let date = Number(datex.slice(2, 4))
	let i = new Date(2022, month, date)
	return i
}

function getDates(){
	let p = []
	for(i = 0; i < date; i++){
		p.push(objDate(datemap[i]))
	}
	return p
}

function reformData(l1, l2){
	let len = l1.length
	let p = []
	for(i = 0; i < len; i++){
		p.push([Number(l1[i]), Number(l2[i])])
	}
	return p
}

function buildXAndYAxis(xScale, yScale, viz){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale)
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+w/2+", 40)")
    .append("text")
    .attr("fill", "black")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-33, "+h/2+") rotate(-90)")
    .append("text")
    .attr("fill", "black")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
  ;
}

function drawP(){
	let dates = getDates() 
	//console.log(d3.extent(dates))
	//console.log(d3.extent(panicIndex))
	let xScale = d3.scaleTime()
					.domain(d3.extent(dates))
					.range([xPadding, w-xPadding])
	let yScale = d3.scaleLinear()
					.domain([0, d3.max(untrustIndex)])
					.range([yPadding, w-yPadding])
	buildXAndYAxis(xScale, yScale, vizp)
	let lineMaker = d3.line()
		.x(d=>xScale(d[0]))
		.y(d=>yScale(d[1]))
	;
	let data = reformData(dates, panicIndex)
	//let data = [dates, panicIndex]
	//console.log(data)
	vizp.selectAll(".panicpoint").data([data]).enter()
		.append("path")
		.attr("class", "panicpoint")
		.attr("d", lineMaker)
		.attr("stroke-width", 2)
		.attr("fill", "none")
		.attr("stroke", ()=>"red")
	}




function drawData(){
	d3.csv("dataverse_files/Prov_Confirmed_0115_0419.csv").then(incomingData => {
		let dates = getDates() 
		let data = incomingData.find(d=>d.ProvEN == "SUM")
		data = d3.values(data).slice(1, date+1)
		data = data.map(d=>Number(d))
		console.log(data)
		var xScale = d3.scaleTime()
					.domain(d3.extent(dates))
					.range([xPadding, w-xPadding])
		console.log(d3.extent(data))
		var yScale = d3.scaleLinear()
					.domain([0, d3.max(data)])
					.range([yPadding, w-yPadding])
		buildXAndYAxis(xScale, yScale, vizg)
		let lineMaker = d3.line()
			.x(d=>xScale(d[0]))
			.y(d=>yScale(d[1]))
		;
		data = reformData(dates, data)
		//data = [dates, data]
		//console.log(data)
		vizg.selectAll(".datapointc").data([data]).enter()
			.append("path")
			.attr("class", "datapointc")
			.attr("d", lineMaker)
			.attr("stroke-width", 2)
			.attr("fill", "none")
			.attr("stroke", ()=>"red")
		
			d3.csv("dataverse_files/Prov_Death_0115_0419.csv").then(incomingData => {
				let dates = getDates() 
				let data = incomingData.find(d=>d.ProvEN == "SUM")
				data = d3.values(data).slice(1, date+1)
				data = data.map(d=>Number(d))
				let lineMaker = d3.line()
					.x(d=>xScale(d[0]))
					.y(d=>yScale(d[1]))
				;
				data = reformData(dates, data)
				vizg.selectAll(".datapointd").data([data]).enter()
					.append("path")
					.attr("class", "datapointd")
					.attr("d", lineMaker)
					.attr("stroke-width", 2)
					.attr("fill", "none")
					.attr("stroke", ()=>"black")
			});
	});
	
}

function drawMap(){
	d3.json("dataverse_files/mainland.geojson").then(geoData => {
		d3.csv("dataverse_files/Prov_Confirmed_0115_0419.csv").then(incomingData => {
			let dateformat = "T_C_" + datemap[date]  
			let projection = d3.geoEqualEarth()
				.translate(w/2,h/2)
				.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
			let pathMaker = d3.geoPath(projection)
			
			incomingData = incomingData.map(d => {
				d.dateformat = Number(d.dateformat)
				return d
			})

			let minpop = d3.min(incomingData, d => d.dateformat)
			let maxpop = d3.max(incomingData, d => d.dateformat)
			let colorScale = d3.scaleLinear().domain([minpop, maxpop]).range(["white", "red"])
		

		
			vizm.selectAll(".mapgroup").data(geoData.features).enter()
				.append("path")
					.attr("class", "province")
					.attr("d", pathMaker)
					.attr("stroke", "red")
					.attr("fill", d => {
				
				
					let corres = incomingData.find(datapoint => datapoint.ProvEN == d.properties.name)
					if(corres != undefined){
						return colorScale(corres.dateformat)
					} else {
						console.log(d.properties.name)
						return "blue";
					}
				
			})
			vizm.selectAll(".maptext")
					.text("Infection Basemap")
					.attr("class", "maptext")
					.attr("y", -10)
					.attr("size", 100)
		})
	});
}


function drawUntrust(){
	let dates = getDates() 
	let xScale = d3.scaleTime()
					.domain(d3.extent(dates))
					.range([xPadding, w-xPadding])
	let yScale = d3.scaleLinear()
					.domain([0, d3.max(untrustIndex)])
					.range([yPadding, w-yPadding])
	buildXAndYAxis(xScale, yScale, vizu)
	let lineMaker = d3.line()
		.x(d=>xScale(d[0]))
		.y(d=>yScale(d[1]))
	;
	let data = reformData(dates, untrustIndex)
	vizu.selectAll(".untrustpoint").data([data]).enter()
		.append("path")
		.attr("class", "untrustpoint")
		.attr("d", lineMaker)
		.attr("stroke-width", 2)
		.attr("fill", "none")
		.attr("stroke", ()=>"red")
}

drawP()
drawData()
drawMap()
drawUntrust()