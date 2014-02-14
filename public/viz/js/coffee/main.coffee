console.warn 'hello'
# GLOBAL
global = {
	wI: window.innerWidth
	hI: window.innerHeight
	w: window.innerWidth
	h: window.innerHeight
	svgEl: null
	container: null
	svgInit: ->
		this.svgEl = d3
		.select('body')
		.append('svg')
		.attr
			width: global.w
			height: global.h
		.style 'background', '#e3e3e3'
		this.container = global.svgEl
		.append('g')
		.attr
			transform: 'translate(' + global.w/2 + ', ' + global.h/2 + ')'

	svgResize: ->
		this.svgEl = d3
		.select('svg')
		.attr
			# transform: 'scale(1.5)'
			width: global.w
			height: global.h
	resize: ->
		window.addEventListener 'resize', ->
			global.w = window.innerWidth
			global.h = window.innerHeight
			# resize SVG
			global.svgResize()

	demoArray: {
		x: 100
		y: 100
		w: 5
		h: 200
		c: '#f00'
	}
	demoArray2: {
		x: 100
		y: 100
		w: 20
		h: 200
		c: '#f00'
	}
}

# VISUALIZATION

viz = {
	# RECT (unused)
	rectCreate: (d) -> 
		global.container # center
		.append('rect')
		.attr
			class: 'bar'
			x: d.x
			y: d.y
			width: d.w
			height: d.h
			transform: 'rotate(0)'
		false
	# LINE
	lineCreate: (hour, minute, visitor) ->
		global.container
		.append('line')
		.attr
			class: 'bar'
			x1: ->
				50 * Math.cos(helper.degreeToRadian((hour*30 + minute*0.5)))
			x2: ->
				50 * Math.cos(helper.degreeToRadian((hour*30 + minute*0.5))) + visitor/2 * Math.cos(helper.degreeToRadian((hour*30 + minute*0.5)))
			y1: ->
				50 * Math.sin(helper.degreeToRadian((hour*30 + minute*0.5)))
			y2: ->
				50 * Math.sin(helper.degreeToRadian((hour*30 + minute*0.5))) + visitor/2 * Math.sin(helper.degreeToRadian((hour*30 + minute*0.5)))
	# PATH
	pathCreate: (data) ->
		global.svgEl
		.append('path')
		.attr
			d: viz.pathFn(data)
			stroke: data.c
			'stroke-width': data.w
			fill: data.f
	# PATH FUNCTION
	pathFn: (data) ->
		fn = d3.svg
		 .line()
		 .x((d) -> d.x)
		 .y((d) -> d.y)
		 .interpolate('linear')
}


# HELPER
helper = {
	timeToAngle: (d) ->
		console.log(d)
		false
	degreeToRadian: (degree) ->
		return (degree-90)*Math.PI/180
}

# INITIALIZE
global.svgInit()
global.resize()
viz.lineCreate(3, 30, 200)



###
This is how you comment I guess
###

# spaceCircles = [30,70,110]
# rectData = [
# 	{
# 		x:30
# 		y:30
# 		w: 30
# 		h:30
# 		color: 'blue'
# 	}
# 	{
# 		x: 60
# 		y: 60
# 		w: 60
# 		h: 60
# 		color: 'red'
# 	}
# ]

# svgEl = d3
# .select('#container')
# .append('svg')
# .attr
# 	width: 400
# 	height: 400
# .style 'border', '1px solid black'

# circles = svgEl
# .selectAll() # virtual selector
# .data(spaceCircles)
# .enter()
# .append('circle')

# # circleDraw = circles
# # .attr
# # 	cx: (d) -> d
# # 	cy: (d) -> d
# # 	r: 20
# # .style 'fill', (d) ->
# # 	rC
# # 	rC = 'green' if d == 30
# # 	rC = 'blue' if d == 70
# # 	rC = 'yellow' if d == 110
# # 	rC

# #draw rect
# rects = svgEl
# .selectAll()
# .data(rectData)
# .enter()
# .append('rect')

# # rectDraw = rects
# # .attr
# # 	x: (d) -> d.x
# # 	y: (d) -> d.y
# # 	width: (d) -> d.w
# # 	height: (d) -> d.h
# # .style 'fill', (d) -> d.color

# #draw stright line
# lineDraw = svgEl
# .append('line')
# .attr
# 	x1: 300
# 	x2: 150
# 	y1: 100
# 	y2: 300
# 	'stroke-width': 5
# 	stroke: 'black'

# # shape (cool)
# lineData = [
# 	{ 
# 		x: 100 
# 		y: 200
# 	},
# 	{ 
# 		x: 20 
# 		y: 20
# 	},
# 	{ 
# 		x:40 
# 		y:10
# 	},
# 	{ 
# 		x:60 
# 		y: 40
# 	}, 
# 	{ 
# 		x: 80 
# 		y: 5
# 	},
# 	{
# 		x: 350
# 		y: 300
# 	}
# ]

# lineFunction = d3.svg
#  .line()
#  .x((d) -> d.x)
#  .y((d) -> d.y)
#  .interpolate('linear')
#  # .interpolate('cardinal')

# lineGraph = svgEl
#  .append('path')
#  .attr({
#  		d: lineFunction(lineData)
#  		stroke: 'blue'
#  		'stroke-width': 2
#  		fill: 'none'
#  	})

