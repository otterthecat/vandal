# Vandal
A wrapper to draw primitive shapes with canvas

## API
Vandal's API allows the user to chain multiple calls -typically off the `.draw()` function - to create the desired behavior.
For instance you can make repeated calls from `.draw()` with each passing an argument stating what to do or which options to take:

```javascript
var vandal = new Vandal();
var canvas = document.querySelector('canvas');

vandal.use(canvas).draw('pallete')({fillStyle : '#ff0033'})('shape')('rectangle')(10, 10, 100, 200);
```

### #use(canvasObj)
`canvasObj` being a canvas element.
This will be used throughout the use of the vandal instance.

### #draw(string/obj)
The first call of this function should tell the vandal instance which object you want to start using,
`pallete` or `shape'.

 * *pallete*

	Calling `.draw()` with this argment will return a function to set canvas style properties.
	Simply pass an object with the name/values of the properties you wish to use.

	Passing a style object will return `.draw()` again, to either set/reset new styles or create a shape.

 * *shape*

	Calling `.draw()` with the "shape" argument will return a function that allows the user to choose a shape
	to render on the canvas. Current options are "rectangle", "circle", "triangle", "line", and "text".

	After passing a shape, a new function is returned that, depending on shape chosen, will require arguments
	for positioning and dimensions in order to finally draw upon the canvas.

	* rectangle(Xpos, Ypos, Width, Height)

	* circle(Xpos, Ypos, Radius)

	* triangle(Obj{x,y}, Obj{x,y}, Obj{x,y})

	* line(Obj{x,y} Obj{x,y})

		minimum 2 Objects with x & y properties, no hard maximum.

	* text(String, Xpos, Ypos)

After passing the plot argument(s), the vandal instance is returned, and the cycle can continue.
The examples folder shows each shape being created.

### #clear()
Clears the canvas, typically to prepare for redraw.
