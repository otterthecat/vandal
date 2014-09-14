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
var Vandal = require('../../lib/vandal');

describe('Vandal', function () {
	'use strict';

	it('should be a constructor function', function () {
		Vandal.should.be.a('function');
	});

	describe('new vandal instance', function () {
		var vandal = new Vandal();

		it('should have canvas property', function () {
			var isNull = vandal.canvas === null;
			isNull.should.be.true;
		});

		it('should have default pallete object', function () {
			vandal.pallete.fillStyle.should.equal('#ff0033');
			vandal.pallete.font.should.equal('12px sans-serif');
			vandal.pallete.textBaseline.should.equal('top');
			vandal.pallete.textAlign.should.equal('center');
		});
	});

	describe('shapes', function () {
		describe('#rectangle', function () {
			var vandal = new Vandal();
			vandal.use({
				element : {
					width : 50,
					height : 75
				},
				context : {
					fillRect : function () {}
				}
			});

			var fillRectSpy = sinon.spy(vandal.canvas.context, 'fillRect');
			var returnValue = vandal.draw('shape')('rectangle')(0, 0, 50, 75);

			it('should call canvas context\'s #fillRect', function () {
				fillRectSpy.withArgs(0, 0, 50, 75).should.have.been.calledOnce;
			});

			it('should return vandal object for chaining', function () {
				returnValue.should.equal(vandal);
			});
		});

		describe('#circle', function () {
			var vandal = new Vandal();
			vandal.use({
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

			var beginPathSpy = sinon.spy(vandal.canvas.context, 'beginPath');
			var arcSpy = sinon.spy(vandal.canvas.context, 'arc');
			var fillSpy = sinon.spy(vandal.canvas.context, 'fill');
			var returnValue = vandal.draw('shape')('circle')(20, 30, 10);

			it('should use context\'s api to draw a circle', function () {
				beginPathSpy.should.have.been.calledOnce;
				arcSpy.should.have.been.calledWith(20, 30, 10);
				fillSpy.should.have.been.calledOnce;
			});

			it('should return vandal object for chaining', function () {
				returnValue.should.equal(vandal);
			});
		});

		describe('#triangle', function () {
			var vandal = new Vandal();
			vandal.use({
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
			var beginPathSpy = sinon.spy(vandal.canvas.context, 'beginPath');
			var moveToSpy = sinon.spy(vandal.canvas.context, 'moveTo');
			var lineToSpy = sinon.spy(vandal.canvas.context, 'lineTo');
			var fillSpy = sinon.spy(vandal.canvas.context, 'fill');
			var returnValue = vandal.draw('shape')('triangle')({
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
				beginPathSpy.should.have.been.calledOnce;
				moveToSpy.withArgs(10, 15).should.have.been.calledOnce;
				lineToSpy.should.have.been.calledTwice;
				lineToSpy.firstCall.calledWith(20, 15).should.be.true;
				lineToSpy.lastCall.calledWith(10, 35).should.be.true;
				fillSpy.should.have.been.calledOnce;
			});

			it('should return vandal object for chaining', function () {
				returnValue.should.equal(vandal);
			});
		});

		describe('#line', function () {
			var vandal = new Vandal();
			vandal.use({
				element : {},
				context : {
					beginPath : function () {},
					moveTo : function () {},
					lineTo : function () {},
					stroke : function () {}
				}
			});
			var beginPathSpy = sinon.spy(vandal.canvas.context, 'beginPath');
			var moveToSpy = sinon.spy(vandal.canvas.context, 'moveTo');
			var lineToSpy = sinon.spy(vandal.canvas.context, 'lineTo');
			var strokeSpy = sinon.spy(vandal.canvas.context, 'stroke');
			var returnValue = vandal.draw('shape')('line')(
					{x : 10, y : 15},
					{x : 20, y : 25},
					{x : 30, y : 35}
				);

			it('should use context\'s api to draw line(s)', function () {
				beginPathSpy.should.have.been.calledOnce;
				moveToSpy.withArgs(10, 15).should.have.been.calledOnce;
				lineToSpy.firstCall.calledWith(20, 25).should.be.true;
				lineToSpy.lastCall.calledWith(30, 35).should.be.true;
				strokeSpy.should.have.been.calledOnce;
			});

			it('should return vandal object for chaining', function () {
				returnValue.should.equal(vandal);
			});
		});

		describe('#text', function () {
			var vandal = new Vandal();
			vandal.use({
				element : {},
				context : {
					fillText : function () {}
				}
			});
			var fillTextSpy = sinon.spy(vandal.canvas.context, 'fillText');
			var returnValue = vandal.draw('shape')('text')('testing 123', 0, 1);

			it('should use context\'s api to render text', function () {
				fillTextSpy.withArgs('testing 123', 0, 1).should.have.been.calledOnce;
			});

			it('should return vandal object for chaining', function () {
				returnValue.should.equal(vandal);
			});
		});
	});

	describe('methods', function () {
		describe('#shape', function () {
			var vandal = new Vandal();
			vandal.use({
				element : {},
				context : {
					beginPath : function () {},
					arc : function () {},
					fill : function () {}
				}
			});
			var circleSpy = sinon.spy(vandal.shapes, 'circle');
			var returnValue = vandal.methods.shape.call(vandal, 'circle');
			returnValue(100, 200, 300);
			it('should return function from shapes object', function () {
				returnValue.should.be.a('function');
				circleSpy.should.have.been.calledWith(100, 200, 300);
			});
		});

		describe('#pallete()', function () {
			var vandal = new Vandal();
			vandal.use({
				element : {},
				context : {
					fillStyle : ''
				}
			});

			vandal.methods.pallete.call(vandal, {
				fillStyle : '#cccccc'
			});
			it('should set pallete object with defined properties', function () {
				var color = vandal.canvas.context.fillStyle;
				color.should.equal('#cccccc');
			});

			describe('when passed obj with no matching properties', function () {
				var vandal = new Vandal();
				vandal.use({
					element : {},
					context : {
						fillStyle : ''
					}
				});
				vandal.methods.pallete.call(vandal, {foo : 'bar'});

				it('should not create new propeties to pallete', function () {
					var isUndefined = vandal.canvas.context.foo ===  undefined;
					isUndefined.should.be.true;
				});
			});
		});
	});

	describe('#use()', function () {
		var vandal = new Vandal();
		var fakeCanvas = {element : 'foo', context : 'bar'};
		var returnedValue = vandal.use(fakeCanvas);

		it('should set .canvas property', function () {
			vandal.canvas.element.should.equal('foo');
			vandal.canvas.context.should.equal('bar');
		});

		it('should return vandal object for chaining', function () {
			returnedValue.should.equal(vandal);
		});
	});

	describe('#clear()', function () {
		var vandal = new Vandal();
		vandal.use({
			element : {
				width : 10,
				height : 20
			},
			context : {
				clearRect : function () {}
			}
		});
		var clearSpy = sinon.spy(vandal.canvas.context, 'clearRect');
		var returnValue = vandal.clear();
		it('should clear canvas for redraw', function () {
			var w = vandal.canvas.element.width;
			var h = vandal.canvas.element.height;
			clearSpy.withArgs(0, 0, w, h).should.have.been.calledOnce;
		});

		it('should return itself for chaining', function () {
			returnValue.should.equal(vandal);
		});
	});
});
