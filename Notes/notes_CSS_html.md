# Useful Code Snippets

## Link CSS and HTML:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Exercise 1</title>
    <meta
      content="width=device-width, initial-scale=1, maximum-scale=1"
      name="viewport"
    />
    <!-- link external style sheet -->
    <link rel="stylesheet" href="css/exercise-1.css" />

  <!-- style tag -->
  <style>
    #test{
      text-transform: uppercase;
    }
  </style> 
  </head>

  <body>
    <div class="container">
      <a href="https://google.com" target="_blank">This is a link</a>
    </div>
    
    <!-- Inline CSS -->
    <div id="test" style="font-size: 54px;"> inline style</div>
  </body>
</html>
```

## Color
```css
#p1 {
  background-color: #ff0000;
}
#p2 {
  background-color: rgb(0, 255, 0);
}
#p2 {
  background-color: yellow;
}
```

## Box Model:
```css
.box{
  width: 300px;
  height: 500px;
  border: 2px solid #444;
  margin: 25px;
  padding: 50px;
  box-shadow: aqua;
  /* display: none;
  display: inline;
  display: block;
  display: inline-block; */
  z-index: -1;
  border-radius: 25px;
}
```

## Units
### Absolute
* `px`
* `in`
* `mm`
* `cm`
### Relative
* `%`
* `em` - A unit equivalent to the current font size - if 12px font, 2em would be 24px
* `vw` - units of viewport width (essentially the browser’s rendering space). Each unit is 1/100th of width
* `vh` - the same as above but for viewport height

## Typography
```css
#typography{
  text-align: center;
  color: yellow;
  width: 64%;
  margin: auto;
  font-size: 1.1em;
  line-height: 1.3em;
}
```

## Flex
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Exercise 1</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport" />

  <style>
    .container {
      display: flex;
      flex-direction: column;
      /* alt solution */
      flex-direction: column-reverse;
      border: 2px solid yellow;
      justify-content: center;
      align-items: center;
    }

    .box {
      width: 250px;
      height: 150px;
      border: 1px solid red;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="box"> Box 1</div>
    <div class="box"> Box 2</div>
    <div class="box"> Box 3</div>
    <!-- alternative solution -->
    <!-- <div class="box"> Box 3</div> -->
    <!-- <div class="box"> Box 2</div> -->
    <!-- <div class="box"> Box 1</div> -->
  </div>
</body>
```

## Grid

```css
.container{
  /* Step 1: Set display to grid */
  display:grid;
  /* Step 2: setup rows amd columns */
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: repeat(3, 350px);
  grid-template-rows: 250px 600px;
  /* grid-auto-rows: minmax(100px, auto); */
  grid-template-areas: 
  "hd hd hd hd hd hd hd hd"
  "sd sd main main main main main main"
  "ft ft ft ft ft ft ft ft";
  border: 2px solid yellow;
}
.box{
  /* width: 250px;
  height: 150px; */
  border: 1px solid red;
  background: #F8FA9D;
}

.header{
  /* row start/column start/ row end/ column end */
  grid-area:hd;
}

.footer{
  grid-area: ft;  
}
.sidebar{
  grid-area: sd;
}
.content{
  grid-area: main;
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Exercise 1</title>
    <meta
      content="width=device-width, initial-scale=1, maximum-scale=1"
      name="viewport"
    />
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
  <div class = "container">
    <div class="header box">Header</div>
    <div class="sidebar box">
      <h1>Blog Posts</h1>
      <!-- Add Link To Blog Here -->
      <a href="blog-post.html">Click here for blog post</a>
    </div>
    <div class="content box">Content</div>
    <div class="footer box">Footer</div>
  </div>
  </body>
</html>
```

## Responsive Layouts
Media Query
```css
@media(min-width: 900px) and (max-width: 900px){
  .container{

  }
}
```

#### Example
```css
.container {
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: 250px 600px;
  /* grid-template-columns: repeat(3, 1fr); */
  /* Initially each element has its own row for small screens */
  grid-template-areas:
    "hd"
    "sd"
    "main"
    "ft";
  border: 2px solid yellow;
}

/* add css for nested grid here */
.nestedGrid {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}

.nestedGrid>* {
  border: 2px solid aquamarine;
}

.box {
  border: 1px solid red;
  background: #F8FA9D;
}

.header {
  /* row start/column start/ row end/ column end */
  grid-area: hd;
}

.footer {
  grid-area: ft;
}

.sidebar {
  grid-area: sd;
}

.content {
  grid-area: main;
}

/* If Screen Is Wide Enough */
@media(min-width:900px) {
  .container {
    display: grid;
    grid-template-columns: 300px 300px 300px;
    grid-template-rows: 250px 600px;
    grid-template-areas:
      "hd hd hd hd hd hd hd hd"
      "sd sd main main main main main main"
      "ft ft ft ft ft ft ft ft";
    border: 2px solid red;
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Exercise 1</title>
    <meta
      content="width=device-width, initial-scale=1, maximum-scale=1"
      name="viewport"
    />
    <link rel="stylesheet" href="css/style-solution.css">
  </head>

  <body>
  <div class = "container">
    <div class="header box">Header</div>
    <div class="sidebar box"><h1>Blog Posts</h1><a href="post.html">Most Recent Post</a></div>
    <div class="content box">
      <!-- nest grid here -->
      <div class="nestedGrid">
        <div><h1>Thursday</h1></div>
        <div><h1>Fall</h1></div>
        <div><h1>Fritz</h1></div>
        <div><h1>Dairy Free</h1></div>
      </div>
    </div>
    <div class="footer box">Footer</div>
  </div>
  </body>
</html>
```