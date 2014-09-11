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
	.draw('shape')('rectangle')(10, 10, 100, 200)
	.draw('shape')('circle')(240, 240, 40)
	.draw('shape')('triangle')({x: 220, y: 75}, {x: 285, y: 75}, {x: 285, y: 200})
	.draw('shape')('text')('Hello!', 300, 20);
