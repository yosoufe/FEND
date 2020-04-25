# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Brief](#brief)
* [Resources](#Resources)

## Instructions

2nd Project for Front End Developer Nanodegree. This project is about to practice HTML, CSS and most importantly about
DOC and Javascript.

The main purpose is to avoid repetitive coding. The js code is querying the html file and looking for `section` tags to 
find all the sections and fill the navigation bar automatically.

The starter project has some HTML and CSS styling to display a static version of the Landing Page project which can be grabbed 
from [here](https://github.com/udacity/fend/tree/refresh-2019/projects/landing-page).

## Brief

I added bunch of CSS Styling to create the hamburger toggle navigation icon for thin screens. By clicking 
the hamburger option, the navigation bar is hiding and showing. That would involved quite a lot of changes 
in CSS.

The `app.js` code is searching for all the sections and save them as a list into a global variable. The same for navigation bar that list of sections should be added to. Then at the startup adds those lists to the navigation bar.

The next task was to activate a section based on the distance of the section to the top of the window which adds a specific background to the section. A handler is added to the `scroll` event to trigger calculation of distances of sections to the top and activate or deactivate the sections

## Resources:
* https://youtu.be/8QKOaTYvYUA