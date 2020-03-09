console.log("Hi");
let l2c = {"Japanese": "blue", "Chinese": "red", "English": "yellow", "Non-vocal": "green","non-vocal": "green" }
let g2c = {"pop": "purple", "classic": "olive", "folk": "navy", "rock": "antiquewhite","country": "aliceblue" };
let e2c = {"sad": "forestgreen", "happy": "darkslategray", "peaceful": "darkviolet" };
let r2c = {"gentle": "blue", "cheerful": "red", "solumn": "yellow" };

let viz = d3.select("#viz-container")
    .append("svg")
        .attr("width", 1920)
        .attr("height", 1080)
;

d3.json('data.json').then(incomingdata => {
    console.log(incomingdata);

    let dataG = viz.selectAll(".dataG").data(incomingdata).enter()
        .append('g')
            .attr('class', 'dataG')
            .attr('transform', data => 'translate('+ ((data["num"] * 50)%400 + 450) + ',' + (200 + ((data["num"]*10)/1.5))  +')')
    ;

    dataG
        .append("circle")
            .attr('class', 'lang')
            .attr('fill', data => l2c[data["language"]])
            .attr('r', 7)
            .attr('cx', -5)
            .attr('cy', -1)
        ;
    dataG
        .append("rect")
        .attr('class', 'genr')
        .attr('fill', data => g2c[data["genre"]])
        .attr('width', 10)
        .attr('height', 10)
    ;

    dataG
        .append("circle")
            .attr('class', 'emos')
            .attr('fill', data => e2c[data["emotion"]])
            .attr('r', 7)
            .attr('cx', +3)
            .attr('cy', -6)
    ;
})






