var Vandal = require('../../lib/vandal');

var target = document.querySelector('.target');

var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;

target.appendChild(canvas);

var vandal = new Vandal();
vandal.use(canvas)
	.draw('pallete')({fillStyle : '#ff0033'})('shape')('rectangle')(10, 10, 100, 200)
	.draw('pallete')({fillStyle : '#2225e3'})('shape')('circle')(240, 240, 40)
	.draw('shape')('triangle')({x: 220, y: 75}, {x: 285, y: 75}, {x: 285, y: 200})
	.draw('shape')('line')({x: 0, y: 290}, {x: 200, y: 150}, {x: 400, y: 290})
	.draw('pallete')({fillStyle : '#000', font : '16px sans-serif'})('shape')('text')('Hello!', 300, 20);

var pos = 1;

vandal.animate(function(v){
	var n  = pos += 2;
	v.draw('shape')('line')({x: 0, y: 150}, {x: n, y: 150});
});
