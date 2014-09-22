(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../../lib/vandal":2}],2:[function(require,module,exports){
var Vandal = function () {
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
	triangle : function () {
		'use strict';

		this.canvas.context.beginPath();
		this.canvas.context.moveTo(arguments[0].x, arguments[0].y);
		this.canvas.context.lineTo(arguments[1].x, arguments[1].y);
		this.canvas.context.lineTo(arguments[2].x, arguments[2].y);
		this.canvas.context.fill();
		return this;
	},
	line : function () {
		'use strict';

		this.canvas.context.beginPath();
		this.canvas.context.moveTo(arguments[0].x, arguments[0].y);
		for(var i = 1; i < arguments.length; i += 1) {
			this.canvas.context.lineTo(arguments[i].x, arguments[i].y);
		}
		this.canvas.context.stroke();
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
				this.canvas.context[item] = obj[item];
			}
		}

		return this.draw.bind(this);
	}
};

Vandal.prototype = {
	shapes : shapes,

	methods : methods,

	use : function (canvas) {
		'use strict';

		this.canvas = {
			width : canvas.width,
			height : canvas.height,
			context : canvas.getContext('2d'),
			element : canvas
		};
		return this;
	},

	draw : function (type) {
		'use strict';
		return this.methods[type].bind(this);
	},

	clear : function () {
		'use strict';

		this.canvas.context
			.clearRect(0, 0, this.canvas.width, this.canvas.height);
		return this;
	},

	animate : function (callback) {
		'use strict';
		var self = this;
		var increment = 0;
		var iterator = function (step) {
			self.clear();
			var proceed = callback(self, increment += 1, step);
			if (proceed) requestAnimationFrame(iterator);
		};
		requestAnimationFrame(iterator);
	}
};

module.exports = Vandal;

},{}]},{},[1]);
