# JavaScript and DOM

## Syntax

### `let` and `const` (and `var`)
`var` is "hoisted" but let and const are not and they are scoped to block rather than function.
`let` can be reassigned but not redeclared in the same scope.
Variables declared with `const` must be assigned an initial value, but can’t be redeclared in the same scope, and can’t be reassigned.

Is there any reason to use `var` anymore? Not really.

### Template Literal
Given 
```js
const student = {
  name: 'Richard Kalehoff',
  guardian: 'Mr. Kalehoff'
};

const teacher = {
  name: 'Mrs. Wilson',
  room: 'N231'
}
```
```js
let message = student.name + ' please see ' + teacher.name + ' in ' + teacher.room + ' to pick up your report card.';
```

will become
```js
let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;
```

and about multiline examples:
```js
let message = `${student.name} 
  
  please see ${teacher.name} in ${teacher.room} 
  to pick up your report card.`;
```

Example of how useful it is:
```js
/*
 * Programming Quiz: Build an HTML Fragment (1-2)
 */

const cheetah = {
    name: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    lifespan: '10-12 years',
    speed: '68-75 mph',
    diet: 'carnivore',
    summary: 'Fastest mammal on land, the cheetah can reach speeds of 60 or perhaps even 70 miles (97 or 113 kilometers) an hour over short distances. It usually chases its prey at only about half that speed, however. After a chase, a cheetah needs half an hour to catch its breath before it can eat.',
    fact: 'Cheetahs have “tear marks” that run from the inside corners of their eyes down to the outside edges of their mouth.'
};

// creates an animal trading card
function createAnimalTradingCardHTML(animal) {
    const cardHTML = `<div class="card">
        <h3 class="name">' ${animal.name} </h3>
        <img src="${animal.name}.jpg" alt="${animal.name}" class="picture">
        <div class="description">
            <p class="fact"> ${animal.fact} </p>
            <ul class="details">
                <li><span class="bold">Scientific Name</span>: ${animal.scientificName} </li>
                <li><span class="bold">Average Lifespan</span>: ${animal.lifespan}</li>'
                <li><span class="bold">Average Speed</span>: ${animal.speed}</li>
                <li><span class="bold">Diet</span>: ${animal.diet}</li>
            </ul>
            <p class="brief">${animal.summary}</p>
        </div>
    </div>`;

    return cardHTML;
}
```

### Destructing
In ES6, you can extract data from arrays and objects into distinct variables using destructuring
```js
const point = [10, 25, -34];

const x = point[0];
const y = point[1];
const z = point[2];

console.log(x, y, z);
```
```js
const gemstone = {
  type: 'quartz',
  color: 'rose',
  carat: 21.29
};

const type = gemstone.type;
const color = gemstone.color;
const carat = gemstone.carat;

console.log(type, color, carat);
```

**Destructuring** borrows inspiration from languages like Perl and Python by allowing you to specify the elements you want to extract from an array or object on the left side of an assignment. 
```js
// Array Destructuring
const point = [10, 25, -34];

const [x, y, z] = point;

console.log(x, y, z);
// Prints: 10 25 -34
```
In this example, the brackets `[ ]` represent the array being destructured

```js
// Object Destructuring
const gemstone = {
  type: 'quartz',
  color: 'rose',
  carat: 21.29
};

const {type, color, carat} = gemstone;

console.log(type, color, carat);
// Prints: quartz rose 21.29
```
In this example, the curly braces `{ }` represent the object being destructured 

and to ignore some elements in between
```js
const things = ['red', 'basketball', 'paperclip', 'green', 'computer', 'earth', 'udacity', 'blue', 'dogs'];
const [one, , , two, , , , three] = things;
```

### Object literal shorthand
```js
// old style of copy
{
  let type = 'quartz';
  let color = 'rose';
  let carat = 21.29;
  const gemstone = {
    type: type,
    color: color,
    carat: carat
  };
  console.log(gemstone);
}

// new style: of object copy
{
  let type = 'quartz';
  let color = 'rose';
  let carat = 21.29;

  const gemstone = {type, color, carat};
  console.log(gemstone);
}
```

shorthand way to add methods to objects
```js
// old style:
{
  let type = 'quartz';
  let color = 'rose';
  let carat = 21.29;

  const gemstone = {
    type,
    color,
    carat,
    calculateWorth: function() {
      // will calculate worth of gemstone based on type, color, and carat
    }
  };
}

//new style
{
  let gemstone = {
    type,
    color,
    carat,
    calculateWorth() { ... }
  };
}
```

### Family of For Loops
The `for...of` loop is the most recent addition to the family of for loops in JavaScript.

#### The for loop
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
```

#### The for...in loop
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```
Also, the `for...in` loop can get you into big trouble when you need to add an extra method to an array (or another object). Because for...in loops loop over all enumerable properties, this means if you add any additional properties to the array's prototype, then those properties will also appear in the loop.
```js
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```
```
 Prints:
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
 function() {
  for (let i = 0; i < this.length; i++) {
   this[i] = this[i].toFixed(2);
  }
 }
```

#### For...of loop
The **for...of loop** is used to loop over any type of data that is *iterable*.
```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
```

But wait, there’s more! The for...of loop also has some additional benefits that fix the weaknesses of the for and for...in loops.

You can stop or break a for...of loop at anytime.

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
```

And you don’t have to worry about adding new properties to objects. The for...of loop will only loop over the values in the object.

Exercise:
```js
/*
 * Programming Quiz: Writing a For...of Loop (1-4)
 */

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// your code goes here
for (const day of days){
    var upperDay = day.charAt(0).toUpperCase() + day.slice(1);
    console.log(upperDay);
}
```

### Spread... operator
The spread operator, written with three consecutive dots (`...`), is new in ES6 and gives you the ability to expand, or spread, iterable objects into multiple elements.

```js
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
// Prints: Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
// Prints: 2 3 5 7 11 13 17 19 23 29
```

Combining arrays with concat

```js
// old style
{
  const fruits = ["apples", "bananas", "pears"];
  const vegetables = ["corn", "potatoes", "carrots"];
  const produce = fruits.concat(vegetables);
  console.log(produce);
  // Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]
}

// new style
{
  const produce = [fruits, vegetables];
  console.log(produce);
  // Prints: [Array[3], Array[3]]
  // did not work
}

// correct new style
{
  const produce = [...fruits, ...vegetables];
  console.log(produce);
  // Prints: [ 'apples', 'bananas', 'pears', 'corn', 'potatoes', 'carrots' ]
}
```

### ...Rest parameter
If you can use the spread operator to spread an array into multiple elements, then certainly there should be a way to bundle multiple elements back into an array, right?
```js
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
// Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]
```

#### Variadic functions
Another use case for the rest parameter is when you’re working with variadic functions. Variadic functions are functions that take an indefinite number of arguments.

#### Using the arguments object
In previous versions of JavaScript, this type of function would be handled using the arguments object. The arguments object is an array-like object that is available as a local variable inside all functions. It contains a value for each argument being passed to the function starting at 0 for the first argument, 1 for the second argument, and so on.

```js
function sum() {
  let total = 0;  
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}
```
Now this works fine, but it does have its issues:

1. If you look at the definition for the sum() function, it doesn’t have any parameters.
   * This is misleading because we know the sum() function can handle an indefinite amount of arguments.
2. It can be hard to understand.
   * If you’ve never used the arguments object before, then you would most likely look at this code and wonder where the arguments object is even coming from. Did it appear out of thin air? It certainly looks that way.

#### Using the rest parameter
```js
function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}
```

example:
```js
/*
 * Programming Quiz: Using the Rest Parameter (1-5)
 */
function average(...nums) {
    let sum = 0;
    for (let num of nums)
    {
        sum = sum + num;
    }
    n = nums.length;
    if (n===0){
        return 0;
    }
    return sum / n;
    
}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
```

## Functions
## Built-ins
## Developer-Fu

What happened to aboves. They are again skipped???

## The Document Object Model (DOM)
The words "the DOM" are used all over developer documentation sites and tutorials on writing interactive JavaScript code.
> a tree structure that captures the content and properties of the HTML and all the relationships between the nodes

> the DOM is the full, parsed representation of the HTML

> Remember that a JavaScript object is a tree-like structure that has properties and values. So the DOM can be accessed using a special object provided by the browser: `document`

The DOM is standardized by the W3C. There are a number of specifications that make up the DOM, here are few:
* Core Specification
* Events Specification
* Style Specification
* Validation Specification
* Load and Save Specification
To see the full list of DOM specs, check out the standard at: https://www.w3.org/standards/techs/dom#w3c_all

Recap:
The DOM is not part of the JavaScript language.

The DOM is constructed from the browser is globally accessible by JavaScript code using the document object.

Extra Resources: 
* https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
* https://www.w3.org/TR/html5/syntax.html#parsing
* https://www.w3.org/standards/techs/dom#w3c_all
* https://www.ecma-international.org/ecma-262/#sec-global-object


### Select An Element By ID
```js
document.getElementById();

// for example
document.getElementById('footer');
```

docs: 
* https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById


### Selecting Multiple Elements At Once

```
document.getElementsByClassName('brand-color');
document.getElementsByTagName('p');
```

docs:
* https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
* https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName

**What is Returened?**
returns an array-like data structure of elements. HTML Collections.

### Node Interface
docs: https://developer.mozilla.org/en-US/docs/Web/API/Node

### Element Interface
docs: https://developer.mozilla.org/en-US/docs/Web/API/Element

One really important thing about the Element Interface is that it is a descendent of the Node Interface. The Element Interface inherits all of the Node Interface's properties and methods. 

More Docs for Web API: https://developer.mozilla.org/en-US/docs/Web/API

## jQuery library
Thankfully, all browsers have pretty much aligned to support the official standard.

However, back in the day, that wasn't the case. You had to write different code to perform the same action in different browsers. Then you had to write code to check which browser you were in to run the correct code for that browser. Let me tell you, it was a bit of a nightmare.

Several JavaScript libraries came along to help mitigate these issues. Let's take a brief look at the jQuery library.

https://jquery.com/

New DOM has been created by jQuery.

### The querySelector Method
Returns single element.
```js
// find and return the element with an ID of "header"
document.querySelector('#header');

// find and return the first element with the class "header"
document.querySelector('.header');

// find and return the first <header> element
document.querySelector('header');
```

docs: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

### The querySelectorAll Method
returns all elements in form of node lists.
```js
// find and return a list of elements with the class "header"
document.querySelectorAll('.header');

// find and return a list of <header> elements
document.querySelectorAll('header');
```

To iterate
```js
const allHeaders = document.querySelectorAll('header');

for(let i = 0; i < allHeaders.length; i++){
    console.dir(allHeaders[i]);
}
```

docs: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

## Creating Content with JavaScript

### An Element's Inner HTML
`.innerHTML`  property, as it's rightly named, represents the markup of the element's content. We can use this property to:

* get an element's (and all of its descendants!) HTML content
* set an element's HTML content

It returns a string

`.outerHTML` represents the HTML element itself, as well as its children.

### An Element's Text Content
So `.innerHTML` will get/set an element's HTML content. If we just want the text content, we can use the fantastically named `.textContent` property!

The `.textContent` property will:
* set the text content of an element and all its descendants
* return the text content of an element and all its descendants

* `.textContent` reflects the html
* `.innerText` reflects the visualization and also css styling

As you saw, `.innerText` will get the visible text of the element. This is an important distinction! If CSS is used to hide any text inside that element, `.innerText` will not return that text, while `.textContent` will return it. And it's not just the hiding/showing nature of CSS that `.innerText` adheres to, `.innerText` will also honor changes to things like capitalization.

Docs:
* https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
* https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
* https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText

Extra Resources:
* http://perfectionkills.com/the-poor-misunderstood-innerText/
* https://kellegous.com/j/2013/02/27/innertext-vs-textcontent/

### createElement:
docs: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

```js
// creates and returns a <span> element
document.createElement('span');
// creates and returns an <h3> element
document.createElement('h3');
```

### **Adding Content To The Page**
```js
// create a brand new <span> element
const newSpan = document.createElement('span');
newSpan.textContent=" Hello there"

// select the first (main) heading of the page
const mainHeading = document.querySelector('h1');

// add the <span> element as the last child element of the main heading
mainHeading.appendChild(newSpan);
```

`.appendChild` docs: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild


#### Creating Text Nodes
create new text nodes using the `.createTextNode()` method. Take a look at the following code that:

* creates a paragraph element
* creates a text node
* appends the text node to the paragraph
* appends the paragraph to the tag

```js
const myPara = document.createElement('p');
const textOfParagraph = document.createTextNode('I am the text for the paragraph!');

myPara.appendChild(textOfParagraph);
document.body.appendChild(myPara);
```

**Inserting HTML In Other Locations**
Enter the `.insertAdjacentHTML()` method! The `.insertAdjacentHTML()` method has to be called with two arguments:

* the location of the HTML
* the HTML text that is going to be inserted

The first argument to this method will let us insert the new HTML in one of four different locations

* beforebegin – inserts the HTML text as a previous sibling
* afterbegin – inserts the HTML text as the first child
* beforeend – inserts the HTML text as the last child
* afterend – inserts the HTML text as a following sibling

```html
<!-- beforebegin -->
<p>
    <!-- afterbegin -->
    Existing text/HTML content
    <!-- beforeend -->
</p>
<!-- afterend -->
```

```js
const mainHeading = document.querySelector('#main-heading');
const htmlTextToAdd = '<h2>Skydiving is fun!</h2>';

mainHeading.insertAdjacentHTML('afterend', htmlTextToAdd);
```
docs: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

### Removing Elements

* `.removeChild()` https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
* `.remove()` 
```js
<parent-element>.removeChild(<child-to-remove>);
```

To get child elements:
* `.firstElementChild` To get the first element and ignore texts.
* `.firstChild` To get the first child even text.

`removeChild` like `appendChild` needs access to parent element. There
is a better solution: 
* `.parentElement`

```js
const mainHeading = document.querySelector('h1');
mainHeading.parentElement.removeChild(mainHeading);
```

```js
const mainHeading = document.querySelector('h1');
mainHeading.remove();
```
* `.remove()` https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove

### Style Page Content
we can access an element's `style` attribute using the `.style` property!
```js
const mainHeading = document.querySelector('h1');

mainHeading.style.color = 'red';
```
`style` docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style

#### Adding Multiple Styles At Once
```js
const mainHeading = document.querySelector('h1');
mainHeading.style.cssText = 'color: blue; background-color: orange; font-size: 3.5em';
```

#### Setting An Element's Attributes
```js
const mainHeading = document.querySelector('h1');
mainHeading.setAttribute('style', 'color: blue; background-color: orange; font-size: 3.5em;');
```

```js
const mainHeading = document.querySelector('h1');

// add an ID to the heading's sibling element
mainHeading.nextElementSibling.setAttribute('id', 'heading-sibling');

// use the newly added ID to access that element
document.querySelector('#heading-sibling').style.backgroundColor = 'red';
```

#### Accessing an Element's Classes
```js
const mainHeading = document.querySelector('#main-heading');

// store the list of classes in a variable
const listOfClasses = mainHeading.className;

// to convert list of strings to array of strings
const arrayOfClasses = listOfClasses.split(' ');

// logs out the string "ank-student jpk-modal"
console.log(listOfClasses);
```

The `.classList` Property, returns a `DOMTokenLists`. 
Docs: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
```js
const mainHeading = document.querySelector('#main-heading');

// store the list of classes in a variable
const listOfClasses = mainHeading.classList;

// logs out ["ank-student", "jpk-modal"]
console.log(listOfClasses);
```
`.classList`'s properties:
* `.add()` - to add a class to the list
* `.remove()` - to remove a class from the list
* `.toggle()` - to add the class if it doesn't exists or remove it from the list if it does already exist
* `.contains()` - returns a boolean based on if the class exists in the list or not

## Include js file into html
before closing the `body` tag?
```html
<script src="app.js"></script>
```

## Working with Browser Events

### Seeing An Event
On Chrome: https://developers.google.com/web/tools/chrome-devtools/console/events#monitor_events.
For development purpose only.
```js
// start displaying all events on the document object
monitorEvents(document);

// turn off the displaying of all events on the document object.
unmonitorEvents(document);
```

### EventTarget Interface
EventTarget is an interface implemented by objects that can receive events and may have listeners for them. and
Element, document, and window are the most common event targets, but other objects can be event targets too…

Docs: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

### Adding An Event Listener
```js
<event-target>.addEventListener(<event-to-listen-for>, <function-to-run-when-an-event-happens>);
```
```js
const mainHeading = document.querySelector('h1');

mainHeading.addEventListener('click', function () {
  console.log('The heading was clicked!');
});
```
docs: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

list of events: https://developer.mozilla.org/en-US/docs/Web/Events


### Remove An Event Listener
```js
<event-target>.removeEventListener(<event-to-listen-for>, <function-to-remove>);
```

```js
function myEventListeningFunction() {
    console.log('howdy');
}

// adds a listener for clicks, to run the `myEventListeningFunction` function
document.addEventListener('click', myEventListeningFunction);

// immediately removes the click listener that should run the `myEventListeningFunction` function
document.removeEventListener('click', myEventListeningFunction);
```

### Event Phases
* the **capturing** phase
* the **at target** phase
* and the **bubbling** phase

### The Event Object
When an event occurs, the browser includes an event object. This is just a regular JavaScript object that includes a ton of information about the event itself.  the `.addEventListener()'s` listener function receives a notification (an object that implements the `Event interface`) when an event of the specified type occurs


```js
document.addEventListener('click', function(event){
  console.log(event)
})
```

### The Default Action
```js
const links = document.querySelectorAll('a');
const thirdLink = links[2];

thirdLink.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Look, ma! We didn't navigate to a new page!");
});
```

### Event Delegation
The event object has a `.target` property.
```js
const myCustomDiv = document.createElement('div');

function respondToTheClick(evt) {
    console.log('A paragraph was clicked: ' + evt.target.textContent);
}

for (let i = 1; i <= 200; i++) {
    const newElement = document.createElement('p');
    newElement.textContent = 'This is paragraph number ' + i;

    myCustomDiv.appendChild(newElement);
}

document.body.appendChild(myCustomDiv);

myCustomDiv.addEventListener('click', respondToTheClick);
```

#### Checking the Node Type in Event Delegation
```js
document.querySelector('#content').addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'SPAN') {  // ← verifies target is desired element
        console.log('A span was clicked with text ' + evt.target.textContent);
    }
});
```

### The Content Is Loaded Event
```js
document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready to be interacted with!');
});
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/css/styles.css" />
    <script>
      document.addEventListener('DOMContentLoaded', function () {
          document.querySelector('footer').style.backgroundColor = 'purple';
      });
    </script>
```

It would be better to move the code to the bottom of the HTML file just before the closing`</body>` tag.

docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

## Performance
```js
const myCustomDiv = document.createElement('div');

for (let i = 1; i <= 200; i++) {
  const newElement = document.createElement('p');
  newElement.innerText = 'This is paragraph number ' + i;

  myCustomDiv.appendChild(newElement);
}

document.body.appendChild(myCustomDiv);
```
### Testing Code Performance
`performance.now()` returns a timestamp that is measured in milliseconds.

docs: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now


### Using a Document Fragment

DocumentFragment represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document.

The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.

```js
const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>

for (let i = 0; i < 200; i++) {
    const newElement = document.createElement('p');
    newElement.innerText = 'This is paragraph number ' + i;

    fragment.appendChild(newElement);
}

document.body.appendChild(fragment); // reflow and repaint here -- once!
```

### Reflow and Repaint
`Reflow` is the process of the browser laying out the page. It happens when you first display the DOM (generally after the DOM and CSS have been loaded), and happens again every time something could change the layout. This is a fairly expensive (slow) process.

`Repaint` happens after reflow as the browser draws the new layout to the screen. This is fairly quick, but you still want to limit how often it happens.

In general, if you have to make a group of changes, hide/change all/show is a great pattern to use if the changes are relatively contained.

#### Virtual DOM
By the way, this is why React and other "virtual DOM" libraries are so popular. You don't make changes to the DOM, but make changes to another structure (a "virtual DOM") and the library calculates the best way to update the screen to match.

### Single Threading
JavaScript is **single-threaded**.

### Code Synchronicity
However, there is some code that is not synchronous - meaning that the code is written just like any other code, but it is executed at some later point in time.
```js
const links = document.querySelectorAll('input');
const thirdField = links[2];

thirdField.addEventListener('keypress', function handleKeyPresses(event) {
    console.log('a key was pressed');
});
```

The key things to remember here are 1) current synchronous code runs to completion, and 2) events are processed when the browser isn't busy. Asynchronous code (such as loading an image) runs outside of this loop and sends an event when it is done.

### setTimeout
```js
setTimeout(function sayHi() {
    console.log('Howdy');
}, 1000); // number of milliseconds
```