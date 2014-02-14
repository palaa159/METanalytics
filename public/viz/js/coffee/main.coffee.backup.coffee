

###
This is how you comment I guess
###

spaceCircles = [30,70,110]
rectData = [
	{
		x:30
		y:30
		w: 30
		h:30
		color: 'blue'
	}
	{
		x: 60
		y: 60
		w: 60
		h: 60
		color: 'red'
	}
]

svgEl = d3
.select('#container')
.append('svg')
.attr
	width: 400
	height: 400
.style 'border', '1px solid black'

circles = svgEl
.selectAll() # virtual selector
.data(spaceCircles)
.enter()
.append('circle')

# circleDraw = circles
# .attr
# 	cx: (d) -> d
# 	cy: (d) -> d
# 	r: 20
# .style 'fill', (d) ->
# 	rC
# 	rC = 'green' if d == 30
# 	rC = 'blue' if d == 70
# 	rC = 'yellow' if d == 110
# 	rC

#draw rect
rects = svgEl
.selectAll()
.data(rectData)
.enter()
.append('rect')

# rectDraw = rects
# .attr
# 	x: (d) -> d.x
# 	y: (d) -> d.y
# 	width: (d) -> d.w
# 	height: (d) -> d.h
# .style 'fill', (d) -> d.color

#draw stright line
lineDraw = svgEl
.append('line')
.attr
	x1: 300
	x2: 150
	y1: 100
	y2: 300
	'stroke-width': 5
	stroke: 'black'

# shape (cool)
lineData = [
	{ 
		x: 100 
		y: 200
	},
	{ 
		x: 20 
		y: 20
	},
	{ 
		x:40 
		y:10
	},
	{ 
		x:60 
		y: 40
	}, 
	{ 
		x: 80 
		y: 5
	},
	{
		x: 350
		y: 300
	}
]

lineFunction = d3.svg
 .line()
 .x((d) -> d.x)
 .y((d) -> d.y)
 .interpolate('linear')
 # .interpolate('cardinal')

lineGraph = svgEl
 .append('path')
 .attr({
 		d: lineFunction(lineData)
 		stroke: 'blue'
 		'stroke-width': 2
 		fill: 'none'
 	})

