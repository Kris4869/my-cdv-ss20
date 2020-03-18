var w = 2400;
var h = 800;

let viz = d3.select("#container")
    .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#fff")
    .style("background-image", "linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),linear-gradient(#eee .1em, transparent .1em)")
    .style("background-size", "100% 1.2em")
    .style("background-repeat", "repeat")
;

d3.json("data.json").then(incomingdata => {

    let catgroup = viz.selectAll(".catgroup").data(incomingdata).enter()
        .append('g')
        .attr('class', 'catgroup')
        .attr('transform', data => 'translate(' + (150 + ((data['num']-1)%8)*285) + ',' + (80+(Math.floor((data['num']-1)/8)*130)) +')')
    ;


    let cat = catgroup
        .append('g')
        .attr('class', 'shapegroup')
        .attr('transform', 'scale(0.5)')
    ;

    cat.append('g').html(data => language[data["language"]]);
    cat.append('g').html(data => emotion[data["emotion"]]);
    cat.append('g').html(data => genre[data["genre"]]);
    cat.append('g').html(data => fav[data["fav"]]);

});
