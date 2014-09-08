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

	describe('#draw()', function () {

	});

	describe('#clear()', function () {

	});
});
