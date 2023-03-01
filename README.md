# 🚀 Astro.js - workflow for static pages

It's my workflow for creating static pages for customers of stronkadlaciebie.pl

:point_right: Predefined default styles for headings, paragraphs, buttons, etc...  
:point_right: Automatic font downloads (locally hosted for faster loading)  
:point_right: Simple responsive images with lazy loading and blurred image placeholders  
:point_right: Inline SVG icons using one-line component  
:point_right: Predefined JavaScript components (such as collapse, etc.)  
:point_right: Division of HTML into components (e.g., header and footer in separate files)

## Astro basics

Astro looks for `.astro` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `src/assets/` directory.

Docs: https://docs.astro.build/en/getting-started/

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## Before you start

#### 1. Set the Tailwind configuration

The tailwind.config.cjs file contains the configuration for Tailwind. Customize colors and fonts for your project.

#### 2. Import the necessary fonts

We use [fontsource](https://fontsource.org/docs/getting-started). It's allows us to host fonts locally and it happens automatically.

All you need to do is:

1. ##### Install appropriate font (e.g. manrope)
   `npm install @fontsource/manrope`
1. ##### Import it in `src/layouts/Layout.astro`
   `import "@fontsource/manrope";`

#### 3. Set default styles in `src/assets/styles/base.css`

The `src/assets/styles/base.css` file has default styles for headings, paragraphs, buttons, and other frequently used elements. Adapt it to the project.

#### 4. Check out `src/pages/demo.astro` to see how things work.

## Responsive images

Używamy [Astro ImageTools](https://astro-imagetools-docs.vercel.app/en/introduction), which gives us automatic image optimization and placeholder images.

### [\<Picture\/\>](https://astro-imagetools-docs.vercel.app/en/components/Picture) component

Use it like a regular img tag:

```astro
---
import { Picture } from "astro-imagetools/components";
---

<Picture src="/src/assets/images/demo-img.jpg" alt="" />
```

It gives us responsive picture tag with lazy loading, placeholder etc...:

```html
<picture
  class="astro-imagetools-picture astro-imagetools-picture-45CE807D"
  style="position: relative; display: inline-block; max-width: 100%; height: auto; --z-index:1; --opacity:0;">
  <source
    srcset="
      /_astro/demo-img@320w.222a388c.avif   320w,
      /_astro/demo-img@777w.7cbed0c8.avif   777w,
      /_astro/demo-img@1158w.01132b65.avif 1158w,
      /_astro/demo-img@1463w.d4ad37e2.avif 1463w,
      /_astro/demo-img@1691w.8cbddbf4.avif 1691w,
      /_astro/demo-img@1844w.2c9b263b.avif 1844w,
      /_astro/demo-img@1920w.2b1a3e76.avif 1920w
    "
    sizes="(min-width: 1920px) 1920px, 100vw"
    width="1920"
    height="1280"
    type="image/avif" />
  <source
    srcset="
      /_astro/demo-img@320w.72d6173d.webp   320w,
      /_astro/demo-img@777w.83251d19.webp   777w,
      /_astro/demo-img@1158w.5297c8dd.webp 1158w,
      /_astro/demo-img@1463w.6aef2a54.webp 1463w,
      /_astro/demo-img@1691w.0cb7ce78.webp 1691w,
      /_astro/demo-img@1844w.19d2544f.webp 1844w,
      /_astro/demo-img@1920w.560d016e.webp 1920w
    "
    sizes="(min-width: 1920px) 1920px, 100vw"
    width="1920"
    height="1280"
    type="image/webp" />
  <img
    src="/_astro/demo-img@1920w.fe1c0458.jpeg"
    alt=""
    srcset="
      /_astro/demo-img@320w.517076a3.jpeg   320w,
      /_astro/demo-img@777w.56030065.jpeg   777w,
      /_astro/demo-img@1158w.ea0a56ff.jpeg 1158w,
      /_astro/demo-img@1463w.a30c470e.jpeg 1463w,
      /_astro/demo-img@1691w.b65b51ae.jpeg 1691w,
      /_astro/demo-img@1844w.b348dde7.jpeg 1844w,
      /_astro/demo-img@1920w.fe1c0458.jpeg 1920w
    "
    sizes="(min-width: 1920px) 1920px, 100vw"
    width="1920"
    height="1280"
    loading="lazy"
    decoding="async"
    class="astro-imagetools-img"
    style="display: inline-block; overflow: hidden; vertical-align: middle; ; max-width: 100%; height: auto;"
    onload="parentElement.style.setProperty('--z-index', 1); parentElement.style.setProperty('--opacity', 0);" />
</picture>
```

### [\<BackgroundPicture\/\>](https://astro-imagetools-docs.vercel.app/en/components/BackgroundPicture) component

Use it like a div:

```astro
---
import { BackgroundPicture } from "astro-imagetools/components";
---

<BackgroundPicture src="/src/assets/images/bg-img.jpg">
    <div class="container py-10">
      CONTENT HERE
    </div>
</BackgroundPicture>
```

## Icons

We use [Astro Icon](https://github.com/natemoo-re/astro-icon) and we can use all icons from [Iconify](https://iconify.design/).

```astro
---
import { Icon } from 'astro-icon'
---

<Icon name="mdi:facebook" />
```

## My own components library

> **Note**\
> You can easily edit every component in `src/components/{COMPONENT NAME HERE}.astro`.

> **Note**\
> You can check out `src/pages/demo.astro` to see how components work.

### Collapse

#### Single collapse

```astro
---
import { Collapse } from '@components/Collapse.astro'
---

<Collapse title="Lorem ipsum dolor sit amet">
  content here
</Collapse>
```

#### Grouped collapse (accordion)

Just add `group="{GROUP NAME HERE}"` attribute. For example:

```astro
---
import { Collapse } from '@components/Collapse.astro'
---

<Collapse title="Accordion item 1" group="accordion-1">
  content here
</Collapse>

<Collapse title="Accordion item 2" group="accordion-1">
  content here
</Collapse>
```

### Modal

... Not ready yet ...

### Slider

... Not ready yet ...

### Offcanvas

on devices up to the size of the `breakpoint` attribute will appear toggler, which after clicking will display offcanvas with sidebar content.

On devices larger than `breakpoint`, the toggler will disappear and "sidebar content" will appear as a normal element.

```astro
---
import { Offcanvas } from '@components/Offcanvas.astro'
---

<Offcanvas title="Menu" breakpoint="lg">
  <!-- Toggler -->
  <div slot="toggler">Toggle</div>

  <!-- Sidebar content -->
  <ul class="flex gap-7 max-lg:flex-col">
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
    <li><a href="#">Link 4</a></li>
    <li><a href="#">Link 5</a></li>
  </ul>
</Offcanvas>
```
