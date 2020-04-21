let w = 1200;
let h = 800;
let padding = 90
let i = 0;
// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.csv("china-pop-2018.csv").then(incomingData => {
	
	d3.json("mainland.geojson").then(geoData => {
	

		let projection1 = d3.geoEqualEarth()
			.translate(w/2,h/2)
			.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
		let projection2 =  d3.geoAiry()
			.translate(w/2,h/2)
			.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
		let projection3 =  d3.geoAlbers()
			.translate(w/2,h/2)
			.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
		let projection4 = d3.geoAugust()
			.translate(w/2,h/2)
			.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
		let projection5 = d3.geoEquirectangular()
				.translate(w/2,h/2)
			.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
		let projection = [projection1, projection2, projection3, projection4, projection5]
		let name = ["geoEqualEarth","geoAiry","geoAlbers","geoAugust","geoEquirectangular"]
		let pathMaker = d3.geoPath(projection[i])

		incomingData = incomingData.map(d => {
			d.population = Number(d.population)
			return d
		})

		let minpop = d3.min(incomingData, d => d.population)
		let maxpop = d3.max(incomingData, d => d.population)
		let colorScale = d3.scaleLinear().domain([minpop, maxpop]).range(["white", "blue"])

		viz.selectAll(".province").data(geoData.features).enter()
			.append("path")
				.attr("class", "province")
				.attr("d", pathMaker)
				.attr("stroke", "red")
				.attr("fill", d => {
					
					let corres = incomingData.find(datapoint => datapoint.province == d.properties.name)
					if(corres != undefined){
						return colorScale(corres.population)
					} else {
						return "red";
					}

				});
		document.getElementById("btn").addEventListener("click", ()=>{
			i = (i+1)%projection.length
			let pathMaker = d3.geoPath(projection[i])
			viz.selectAll(".province").data(geoData.features).attr("d", pathMaker)
			document.querySelector("#pp").innerHTML = name[i]
		})
	
	});
	
})
