/* jshint expr: true */
// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// stubs
// /////////////////////////////////////////////////////////



// modules to test
// /////////////////////////////////////////////////////////
var Sketch = require('../../lib/sketch');

describe('Sketch', function () {
	'use strict';

	it('should be a constructor function', function () {
		Sketch.should.be.a('function');
	});

	describe('new sketch instance', function () {
		var sketch = new Sketch();

		it('should have canvas property', function () {
			var isNull = sketch.canvas === null;
			isNull.should.be.true;
		});

		it('should have default pallete object', function () {
			sketch.pallete.fillStyle.should.equal('#ff0033');
			sketch.pallete.font.should.equal('12px sans-serif');
			sketch.pallete.textBaseline.should.equal('top');
			sketch.pallete.textAlign.should.equal('center');
		});
	});

	describe('shapes', function () {
		describe('#rectangle', function () {
			var sketch = new Sketch();
			sketch.use({
				element : {
					width : 50,
					height : 75
				},
				context : {
					fillRect : function () {}
				}
			});

			var fillRectSpy = sinon.spy(sketch.canvas.context, 'fillRect');
			var returnValue = sketch.draw('shape')('rectangle')(0, 0, 50, 75);

			it('should call canvas context\'s #fillRect', function () {
				fillRectSpy.should.have.been.called;
			});

			it('should return sketch object for chaining', function () {
				returnValue.should.equal(sketch);
			});
		});
	});

	describe('#use()', function () {
		var sketch = new Sketch();
		var fakeCanvas = {element : 'foo', context : 'bar'};
		var returnedValue = sketch.use(fakeCanvas);

		it('should set .canvas property', function () {
			sketch.canvas.should.be.ok;
		});

		it('should return sketch object for chaining', function () {
			returnedValue.should.equal(sketch);
		});
	});

	describe('#clear()', function () {
		var sketch = new Sketch();
		sketch.use({
			element : {
				width : 10,
				height : 20
			},
			context : {
				clearRect : function () {}
			}
		});
		var clearSpy = sinon.spy(sketch.canvas.context, 'clearRect');
		var returnValue = sketch.clear();
		it('should clear canvas for redraw', function () {
			clearSpy.should.have.been.called;
		});

		it('should return itself for chaining', function () {
			returnValue.should.equal(sketch);
		});
	});
});
