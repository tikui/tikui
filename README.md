# Tikui

[![CircleCI](https://circleci.com/gh/tikui/tikui/tree/master.svg?style=svg)](https://circleci.com/gh/tikui/tikui/tree/master)

Tikui is a MIT-licensed free software project allowing you to create a web pattern library.

## Prerequisites

* [Node.js](https://nodejs.org)

## Development

### Serve

In development, you can run the application locally on [localhost:3000](http://localhost:3000/)

```bash
npm run serve
```

### Tutorial

#### Create a component

The source folder `src` follows the [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/) methodology.

To make your first component, we will take an atom example: a button.

Inside `src/atom/atom.pug`, you have to describe your button by adding an inclusion:

```pug
include:componentDoc(height=55) button/button.md
```

Now, you have to create your atom by adding the button folder and the button documentation as a markdown file:

```bash
mkdir src/atom/button
touch src/atom/button/button.md
```

In `button.md` file we can add:

```markdown
## Button

A simple button.
```

Now, you can open [button](http://localhost:3000/atom.html#button) atom inside your browser (serve is needed).

You can see a title `Button`, a content `A simple button` and two files to create:

```bash
touch src/atom/button/button.render.pug
touch src/atom/button/button.template.pug
```

> The file `button.render.pug` represents the render of your component and `button.template.pug` represents its code.

Inside `button.render.pug`, you can add:

```pug
extends /layout

block body
    include button.template.pug
```

And inside `button.template.pug`:

```pug
button.tikui-button Button
```

Then you can see a button on the browser. Now, you have to change the appearance of this button on `_atom.scss` and `_button.scss` files:

```bash
touch src/atom/_atom.scss
touch src/atom/button/_button.scss
```

Inside `tikui.scss`:

```scss
@import 'atom/atom';
```

Inside `_atom.scss`:

```scss
@import 'button/button';
```

Inside `_button.scss`:

```scss
.tikui-button {
    border: 1px solid #47a;
    border-radius: 3px;
    background-color: #47a;
    padding: 5px;
    line-height: 1.5rem;
    font-size: 1rem;
    color: #fff;
}
```

As you can see in the browser, there is a documented blue button with an example of code.
