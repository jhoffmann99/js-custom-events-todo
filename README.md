# js-custom-events-todo

![](https://github.com/juntch/js-custom-events-todo/blob/master/assets/img/app_preview.png)

## How to run the application

Execute ``npm run start`` from a terminal.

## Features

- Add a Todo Task
- Finish a Todo Task
- Delete a Todo Task (Task must be finished first)
- Responsive Design

## Technical Details

### Business Logic
The overall business logic is inside the TodoClient object in client.js file.

The three core methods of the object are on(), trigger() and start().

````
on(event, handler) : registers a custom event on the todo_app DOM element. Executes a handler method (callback) when a custom events occurs.

trigger(event, details) : triggers a custom event. It's also possible to provide event details.

start() : starts and initializes the whole application.
````

The start method is called from an IIFE (Immediately Invoked Function Expression) when the DOM is ready.

### Markup and Styling

Markup (index.html) and styling (assets/css/app.css) are strictly separated.

When defining CSS selectors I tried to use the BEM methodology.

Likewise, selector prefixes such as l-, c-, u- and js- are also used to enrich the markup with context information

````
.l-<selector_name> : Layout class.  Reusable independently of components
.c-<selector_name> : Component class. Implementation of a concrete component. Could contain several component elements, component modifiers or other components
.u-<selector_name> : Utility/helper class. Very concrete utility class e.g. for horizontal centering of an element.
.js-<selector_name> : Informs that this class is used by JS code.
````
