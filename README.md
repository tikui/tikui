# Tikui

![Tikui logo](./logo.svg)

Tikui is a MIT-licensed free software project allowing you to create a web pattern library.

## Prerequisites

* [Node.js](https://nodejs.org) LTS version

## Development

### Install dependencies

After cloning the repository, please go to the root Tikui directory and run this command:

```bash
npm install
```

### Serve

In development, you can run the application locally on [localhost:3000](http://localhost:3000/)

```bash
npm run serve
```

### Tutorial

To generate the global structure of the component below, you can also use [Tikui CLI](https://github.com/tikui/tikui-cli) command (install `tikuicli` using `npm i -g @tikui/cli`), and then from the root of your project, run:

```bash
tikuicli create -p tikui button src/atom
```

> You can read the help from `tikuicli` and each commands using:
> 
> * `tikuicli help` to see the global help
> * `tikuicli help create` to see a command help, here `create`

#### Create a component

The source folder `src` follows the [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/) methodology.

To make your first component, we will take an atom example: a button.

Inside `src/atom/atom.pug`, you have to describe your button by adding an inclusion at the end of the file:

```pug
include:componentDoc(height=55) button/button.md
```

> You can also use `include:templateDoc button/button.md` if you don't want to see the component render, it's useful on bigger components like templates.

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

Now, you can open the [button](http://localhost:3000/atom/atom.html#button) from the atom menu, inside your browser (serve is needed).

### Components Parts

You can see a title `Button`, a content `A simple button` and two files to create:

```bash
touch src/atom/button/button.render.pug
touch src/atom/button/button.code.pug
```

> The file `button.render.pug` represents the render of your component and `button.code.pug` represents its code.

Inside `button.render.pug`, you can add:

```pug
extends /layout

block body
    include button.code.pug
```

And inside `button.code.pug`:

```pug
button.tikui-button Button
```

### Style 

Then you can see a button on the browser. Now, you have to change the appearance of this button on `_atom.scss` and `_button.scss` files:

```bash
touch src/atom/_atom.scss
touch src/atom/button/_button.scss
```

Before going into these two new files, edit the default scss file:

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
    color: #fff;
    font-size: 1rem;
}
```

As you can see in the browser, there is a documented blue button with an example of code.
