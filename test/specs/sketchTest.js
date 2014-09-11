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

		describe('#circle', function () {
			var sketch = new Sketch();
			sketch.use({
				element : {
					width : 50,
					height : 75
				},
				context : {
					beginPath : function () {},
					arc : function () {},
					fill : function () {}
				}
			});

			var beginPathSpy = sinon.spy(sketch.canvas.context, 'beginPath');
			var arcSpy = sinon.spy(sketch.canvas.context, 'arc');
			var fillSpy = sinon.spy(sketch.canvas.context, 'fill');
			var returnValue = sketch.draw('shape')('circle')(20, 30, 10);

			it('should use context\'s api to draw a circle', function () {
				beginPathSpy.should.have.been.called;
				arcSpy.should.have.been.called;
				fillSpy.should.have.been.called;
			});

			it('should return sketch object for chaining', function () {
				returnValue.should.equal(sketch);
			});
		});

		describe('#triangle', function () {
			var sketch = new Sketch();
			sketch.use({
				element : {
					width : 50,
					height : 75
				},
				context : {
					beginPath : function () {},
					moveTo : function () {},
					lineTo : function () {},
					fill : function () {}
				}
			});
			var beginPathSpy = sinon.spy(sketch.canvas.context, 'beginPath');
			var moveToSpy = sinon.spy(sketch.canvas.context, 'moveTo');
			var lineToSpy = sinon.spy(sketch.canvas.context, 'lineTo');
			var fillSpy = sinon.spy(sketch.canvas.context, 'fill');
			var returnValue = sketch.draw('shape')('triangle')({
					x : 10,
					y : 15
				},
				{
					x : 20,
					y : 15
				},
				{
					x : 10,
					y : 35
				});

			it('should use context\'s api to draw triangle', function () {
				beginPathSpy.should.have.been.called;
				moveToSpy.should.have.been.called;
				lineToSpy.should.have.been.calledTwice;
				fillSpy.should.have.been.called;
			});

			it('should return sketch object for chaining', function () {
				returnValue.should.equal(sketch);
			});
		});

		describe('#text', function () {
			var sketch = new Sketch();
			sketch.use({
				element : {},
				context : {
					fillText : function () {}
				}
			});
			var fillTextSpy = sinon.spy(sketch.canvas.context, 'fillText');
			var returnValue = sketch.draw('shape')('text')('testing 123');

			it('should use context\'s api to render text', function () {
				fillTextSpy.should.have.been.called;
			});

			it('should return sketch object for chaining', function () {
				returnValue.should.equal(sketch);
			});
		});
	});

	describe('methods', function () {
		describe('#shape', function () {
			var sketch = new Sketch();
			sketch.use({
				element : {},
				context : {
					beginPath : function () {},
					arc : function () {},
					fill : function () {}
				}
			});
			var circleSpy = sinon.spy(sketch.shapes, 'circle');
			var returnValue = sketch.methods.shape.call(sketch, 'circle');
			returnValue(100, 200, 300);
			it('should return function from shapes object', function () {
				returnValue.should.be.a('function');
				circleSpy.should.have.been.calledWith(100, 200, 300);
			});
		});

		describe('#pallete()', function () {
			var sketch = new Sketch();
			var returnPalleteValue = sketch.methods.pallete.call(sketch, {
				fillStyle : '#cccccc'
			});
			it('should set pallete object with defined properties', function () {
				sketch.pallete.fillStyle.should.equal('#cccccc');
			});

			it('should return #draw() function for chaining', function () {
				returnPalleteValue.should.equal(sketch.draw);
			});

			describe('when passed obj with no matching properties', function () {
				var sketch = new Sketch();
				var returnValue = sketch.methods.pallete.call(sketch, {foo : 'bar'});

				it('should not create new propeties to pallete', function () {
					var isUndefined = sketch.pallete.foo ===  undefined;
					isUndefined.should.be.true;
				});

				it('should return #draw() function for chaining', function () {
					returnValue.should.equal(sketch.draw);
				});
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
