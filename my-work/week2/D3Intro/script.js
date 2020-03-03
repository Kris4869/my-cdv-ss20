console.log("Hi");
let l2c = {"Japanese": "blue", "Chinese": "red", "English": "yellow", "Non-vocal": "green","non-vocal": "green" }
let g2c = {"pop": "blue", "classic": "red", "folk": "yellow", "rock": "green","country": "grey" };
let e2c = {"sad": "blue", "happy": "red", "peaceful": "yellow" };
let r2c = {"gentle": "blue", "cheerful": "red", "solumn": "yellow" };

let viz = d3.select("#viz-container")
    .append("svg")
        .attr("id", "viz")
        .attr("class", "svgs")
        .attr("width", 1920)
        .attr("height", 1080)
;

d3.json('data.json').then(incomingdata => {
    console.log(incomingdata);

    // languages
    viz.selectAll(".languageRect").data(incomingdata).enter()
        .append("rect")
            .attr('fill', data => l2c[data["language"]])
            .attr('x', data => data["num"]*20 + 200)
            .attr('y', 50)
            .attr('height', 20)
            .attr('width', 20)
            .attr('class', 'languageRect')
    ;

    // languages
    viz.selectAll(".languageText").data(incomingdata).enter()
        .append("text")
            .attr('x', 150)
            .attr('y', 65)
            .attr('font-size', 15)
            .text("language")   
            .attr('class', 'languageText')
        
    ;

    // music genre
    viz.selectAll(".genreRect").data(incomingdata).enter()
    .append("rect")
        .attr('fill', data => g2c[data["genre"]])
        .attr('x', data => data["num"]*20 + 200)
        .attr('y',70)
        .attr('height', 20)
        .attr('width', 20)
        .attr('class', 'genreRect')
;

    // genreText
    viz.selectAll(".genreText").data(incomingdata).enter()
        .append("text")
            .attr('x', 150)
            .attr('y', 85)
            .attr('font-size', 15)
            .text("genre")   
            .attr('class', 'languageText')
        
    ;



    // emotion
    viz.selectAll(".emoRect").data(incomingdata).enter()
    .append("rect")
        .attr('fill', data => e2c[data["emotion"]])
        .attr('x', data => data["num"]*20 + 200)
        .attr('y',90)
        .attr('height', 20)
        .attr('width', 20)
        .attr('class', 'emoRect')
;

    // emoText
    viz.selectAll(".emoText").data(incomingdata).enter()
        .append("text")
            .attr('x', 150)
            .attr('y', 105)
            .attr('font-size', 15)
            .text("emotion")   
            .attr('class', 'emoText')
        
    ;


        // rythem
        viz.selectAll(".rytRect").data(incomingdata).enter()
        .append("rect")
            .attr('fill', data => r2c[data["rythem"]])
            .attr('x', data => data["num"]*20 + 200)
            .attr('y',110)
            .attr('height', 20)
            .attr('width', 20)
            .attr('class', 'rytRect')
    ;
    
        // rytText
        viz.selectAll(".rytText").data(incomingdata).enter()
            .append("text")
                .attr('x', 150)
                .attr('y', 125)
                .attr('font-size', 15)
                .text("rhytem")   
                .attr('class', 'rytText')
            
        ;
    


})






