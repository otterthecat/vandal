var Vandal = require('../../lib/vandal');
var target = document.querySelector('.target');
var canvas = document.createElement('canvas');

canvas.width = 400;
canvas.height = 300;
target.appendChild(canvas);

var vandal = new Vandal();
vandal.use(canvas).animate(function(v, inc, step){
	v.draw('shape')('line')({x: 0, y: 150}, {x: inc, y: 150});
	return inc > v.canvas.width ? false : true;
});
