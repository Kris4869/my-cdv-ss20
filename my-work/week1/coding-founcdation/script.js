document.getElementById('btn').addEventListener('click', reveal);

function reveal(){
    n = document.getElementById('txt').value;
    console.log(n)
    for (i = 0; i < n; i++) {
        newDiv = document.createElement("div"); 
        newDiv.setAttribute('class', 'square');
        document.getElementById('hi2').appendChild(newDiv)
    }
}

