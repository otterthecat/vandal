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
	line: function () {
		'use strict';

		this.canvas.context.beginPath();
		this.canvas.context.moveTo(arguments[0].x, arguments[0].y);
		for(var i = 1; i < arguments.length; i += 1){
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
