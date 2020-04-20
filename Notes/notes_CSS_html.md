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
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: 250px 600px;
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

## Flex and Grid together