(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../../lib/sketch":2}],2:[function(require,module,exports){
var Sketch = function () {
	'use strict';

	this.canvas = null;
	this.pallete = {
		fillStyle :  '#ff0033',
		font : '12px sans-serif',
		textBaseline : 'top',
		textAlign : 'center'
	};
};

var shapes = {
	rectangle : function (x, y, w, h) {
		'use strict';

		this.canvas.context.fillRect(x, y, w, h);
		return this;
	},
	circle : function (centerX, centerY, radius) {
		'use strict';

		this.canvas.context.beginPath();
		this.canvas.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		this.canvas.context.fill();
		return this;
	},
	triangle : function (start, middle, end) {
		'use strict';

		this.canvas.context.beginPath();
		this.canvas.context.moveTo(start.x, start.y);
		this.canvas.context.lineTo(middle.x, middle.y);
		this.canvas.context.lineTo(end.x, end.y);
		this.canvas.context.fill();
		return this;
	},
	text : function (txt, x, y) {
		'use strict';

		this.canvas.context.fillText(txt, x, y);
		return this;
	}
};

var methods = {
	shape : function (type) {
		'use strict';
		return this.shapes[type].bind(this);
	},
	pallete : function (obj) {
		'use strict';

		for(var item in obj) {
			if(this.pallete.hasOwnProperty(item)) {
				this.pallete[item] = obj[item];
			}
		}

		return this.draw;
	}
};

Sketch.prototype = {
	shapes : shapes,

	methods : methods,

	use : function (canvas) {
		'use strict';

		this.canvas = canvas;
		return this;
	},

	draw : function (type) {
		'use strict';

		return this.methods[type].bind(this);
	},

	clear : function () {
		'use strict';

		this.canvas.context
			.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
		return this;
	}
};

module.exports = Sketch;

},{}]},{},[1]);
