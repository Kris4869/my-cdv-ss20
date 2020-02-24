let data =[
    {
        "timestamp": "2020-02-22T08:10:28.100Z",
        "appearance": 3,
        "ambition": 3,
        "caring": 4,
        "responsibility": 5,
        "intelligence": 3,
        "eloquence": 3,
        "openmindedness": 3
    },
    {
        "timestamp": "2020-02-22T08:17:44.557Z",
        "appearance": 4,
        "ambition": 3,
        "caring": 4,
        "responsibility": 5,
        "intelligence": 4,
        "eloquence": 3,
        "openmindedness": 5
    },
    {
        "timestamp": "2020-02-22T14:31:07.621Z",
        "appearance": 5,
        "ambition": 4,
        "caring": 4,
        "responsibility": 4,
        "intelligence": 4,
        "eloquence": 3,
        "openmindedness": 4
    },
    {
        "timestamp": "2020-02-23T06:13:33.915Z",
        "appearance": 3,
        "ambition": 4,
        "caring": 4,
        "responsibility": 3,
        "intelligence": 4,
        "eloquence": 4,
        "openmindedness": 2
    },
    {
        "timestamp": "2020-02-23T14:54:58.326Z",
        "appearance": 3,
        "ambition": 4,
        "caring": 3,
        "responsibility": 3,
        "intelligence": 5,
        "eloquence": 4,
        "openmindedness": 5
    },
    {
        "timestamp": "2020-02-23T15:02:40.656Z",
        "appearance": 4,
        "ambition": 5,
        "caring": 4,
        "responsibility": 2,
        "intelligence": 3,
        "eloquence": 3,
        "openmindedness": 4
    },
    {
        "timestamp": "2020-02-24T01:28:36.404Z",
        "appearance": 4,
        "ambition": 4,
        "caring": 5,
        "responsibility": 4,
        "intelligence": 4,
        "eloquence": 4,
        "openmindedness": 5
    },
    {
        "timestamp": "2020-02-24T02:16:19.735Z",
        "appearance": 5,
        "ambition": 5,
        "caring": 4,
        "responsibility": 5,
        "intelligence": 5,
        "eloquence": 3,
        "openmindedness": 5
    },
    {
        "timestamp": "2020-02-24T02:53:11.130Z",
        "appearance": 4,
        "ambition": 3,
        "caring": 2,
        "responsibility": 4,
        "intelligence": 4,
        "eloquence": 2,
        "openmindedness": 4
    },
    {
        "timestamp": "2020-02-24T03:03:40.753Z",
        "appearance": 3,
        "ambition": 5,
        "caring": 5,
        "responsibility": 4,
        "intelligence": 4,
        "eloquence": 3,
        "openmindedness": 4
    }
]

function averageData(data){
  let newData = [];
  let keys = Object.keys(data[ data.length-1 ]);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      if(key in datum){
        sum += datum[key];
        num++;
      }
    }
    let avg = sum/num;
    if(!isNaN(avg)){
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      newData.push(newDataPoint);
    }
  }
  return newData;
}

let transformedData = averageData(data);

for(let i = 0; i < transformedData.length; i++){
  let datapoint = transformedData[i];
  let personality = datapoint.name;
  let average = datapoint.average;
  let bar = document.createElement("div");
  bar.className = "bar";
  bar.style.width = (average * 40) + "px";
  bar.style.borderStyle = "solid";
  bar.style.backgroundColor = "rgba(" + Math.random()*255 + "," + Math.random()*255 
+ "," + Math.random()*255 + ", 0.6)";
  let barname = document.createElement("p");
  barname.innerHTML = personality;
  bar.appendChild(barname);
  document.body.appendChild(bar);
}
