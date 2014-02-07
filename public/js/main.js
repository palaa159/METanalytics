var data = [1, 2, 3, 'y'];

var p = d3.select('#container')
	.selectAll('p')
	.data(data)
	.enter()
	.append('p')
	.text(function(d) {
		return d; // return to DOM
	});

// console.log(p);

var circleArray = [40, 20, 10];

var container = d3
	.select('#container')
	.append('svg')
	.attr({
		width: 200,
		height: 200
	});

var circles = container
	.selectAll() // selectAll, virtual selection
	.data(circleArray)
	.enter()
	.append('circle')
	.attr({
		cx: 50,
		cy: 50,
		r: function(d) { return d; },
	})
	.style('fill', function(d) {
		var returnColor;
		if(d == 40) {
			returnColor = 'rgba(255,0,0,0.5)';
		} else if(d == 20) {
			returnColor = 'rgba(0,255,0,0.5)';
		} else if(d == 10) {
			returnColor = 'rgba(0,0,255,0.5)';
		}
		return returnColor;
	});