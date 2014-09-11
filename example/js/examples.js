var Sketch = require('../../lib/sketch');

var target = document.querySelector('.target');

var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;

target.appendChild(canvas);

var sketch = new Sketch();
sketch.use({
		element: canvas,
		context: canvas.getContext('2d')
	})
	.draw('pallete')({fillStyle : '#ff0033'})('shape')('rectangle')(10, 10, 100, 200)
	.draw('pallete')({fillStyle : '#2225e3'})('shape')('circle')(240, 240, 40)
	.draw('shape')('triangle')({x: 220, y: 75}, {x: 285, y: 75}, {x: 285, y: 200})
	.draw('pallete')({fillStyle : '#000', font : '16px sans-serif'})('shape')('text')('Hello!', 300, 20);
