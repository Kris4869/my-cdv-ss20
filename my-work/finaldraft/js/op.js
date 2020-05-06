//TODO VIZ GAME EVENT TIMER UI&HOVER PROMPT  

//Biased Collection: local -d -p %l+u （2） ++2
//P0 recalculation: -p （2） ++2
//Weighted Average: -p -d （2） ++1
//Redesign Standards: -p -d %m+u (4) ++3
//Regression: -p -d （2） *2
//Interpolation: -p -d （2） *2
//
//Public Attention Redirection -d %m+u (1) ++2
//Online Propagation -d %h+u (1) ++1 
//Authorities -d %m+u (1) ++2
//
//Speech Regulation %-d +u ++1
//Arrest %-d +u local ++1
//Internet Shutdown local %-d +u ++1
cost = [2, 2, 2, 4, 2, 2, 1, 1, 1, 1, 1, 1]
op = [0,0,0,0,0,0,0,0,0,0,0,0]
spc = [0,0,0,0,0,0,0,0,0,0,0,0]
spcr = [0,0,0,0,0,0,0,0,0,0,0,0]

function onmap(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opsmap[i](x, op[i])
		}
	}
	return x
}

function ondatac(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opsmap[i](x, op[i])
		}
	}
	return x
}


function onuntrust(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opsuntrust[i](x, op[i])
		}
	}
	return x
}

function onpanic(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opspanic[i](x, op[i])
		}
	}
	return x
}


opsmap = {
	0: (data, i) => data - (- i * i * Math.floor(Math.random() * 1) + 10*i + 2),
	1: (data, i) => data - Math.floor(0.3 * i * data), 
	2: (data, i) => data - Math.floor(Math.random() * 1),
	3: (data, i) => data - Math.floor(Math.random() * i * 2 + 1) * 10 * pow(i, 0.3),
	4: (data, i) => data - i*i, 
	5: (data, i) => data - i*i*0.8 + i,
	6: (data, i) => data,
	
	7: (data, i) => data,
	8: (data, i) => data,
	9: (data, i) => data,
	
	10: (data, i) => data,
	11: (data, i) => data,
	12: (data, i) => data
}

opspanic = {
	0: (data, i) => data,
	1: (data, i) => data * 2 / (Math.floor(Math.random() * 3.3)*i+1),
	2: (data, i) => data - Math.floor(Math.random() * 2 * Math.random() * 1 * i + 1),
	3: (data, i) => data - Math.floor(Math.random() * i * 2 + 1) * 3 * pow(i, 0.3),
	4: (data, i) => data - i,
	5: (data, i) => data - 0.5 * i,
	6: (data, i) => data - 10 * Math.floor(Math.random() * i + 1 - i) * pow(i, 0.5),
	
	7: (data, i) => data - 10*i*i/data,
	8: (data, i) => data - Math.floor(30/data/i + 1),
	9: (data, i) => data,
	
	10: (data, i) => {if ( Math.floor(Math.random())*Math.floor(Math.random()) ) { return data - 10*i}
						else{return data + i}
					},
	11: (data, i) => data, // event specific
	12: (data, i) => {if ( Math.floor(Math.random())*Math.floor(Math.random()) ) { return data/10}
						else{return data*2}
					}
}

opsuntrust = {
	0: (data, i) => {data + Math.floor(Math.random() * (1 + pow(i, data/10)))},
	1: (data, i) => {data + 0.1 * Math.floor(Math.random() * 1) * Math.floor(Math.random() * (1 + pow(i, data/10)))},
	2: (data, i) => {data + 1},
	3: (data, i) => data + Math.floor(Math.random() * i + i) * pow(i, 1.3),
	4: (data, i) => data + Math.floor(Math.random() * i),
	5: (data, i) => data,
	6: (data, i) => data + i*Math.floor(Math.random()*i)*Math.floor(Math.random()*i)*Math.floor(Math.random()*i),
	
	7: (data, i) => data + data * 0.1 * i * Math.floor(Math.random() + 1),
	8: (data, i) => data + Math.floor(data*i + Math.floor(Math.random() * i) - data - 3),
	9: (data, i) => data,
	
	10: (data, i) => {if ( Math.floor(Math.random()))  { return data + 4*i}
						else{return data + i}
					},
	11: (data, i) => data, // Event
	12: (data, i) => {if ( Math.floor(Math.random())*Math.floor(Math.random()) ) { return data*3}
		else{return data*1.5}
	}
}





									   





