# react-image-attribution

> Easily add attribution info to your images

[![NPM](https://img.shields.io/npm/v/react-image-attribution.svg)](https://www.npmjs.com/package/react-image-attribution) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This package allows to add attibution info to the images and easily display them in different ways.

You can use it as a normal `<img />` element or pass a custom component as child.

[How to correctly attribute images](https://www.pixsy.com/academy/image-user/correctly-attribute-images/)

[Best practices for attribution](https://wiki.creativecommons.org/wiki/best_practices_for_attribution)

![Sample usage](/sample_image.gif)

## Install

```bash
npm install --save react-image-attribution
```

## Usage

You can use this component as the standard [HTML img tag](https://www.w3schools.com/tags/tag_img.asp).

```jsx
import React, { Component } from "react";

import ImageAttribution from "react-image-attribution";

class Example extends Component {
  render() {
    return <ImageAttribution
                src="https://www.pixsy.com/wp-content/uploads/2018/03/Winter-in-town-David-J-CC-BY-2.0.jpg"
                title="Winter in town"
                author="David J"
                license="CC BY 2.0"
                mode="overlay"
            />
  }
}
```

You can use a custom image component:

```jsx
import React, { Component } from "react";

import ImageAttribution from "react-image-attribution";
import CustomImage from "./CustomImage";

class Example extends Component {
  render() {
    return <ImageAttribution
                title="Winter in town"
                author="David J"
                license="CC BY 2.0"
                mode="overlay"
            >
              <CustomImage
                imageLink="https://www.pixsy.com/wp-content/ uploads/2018/03/Winter-in-town-David-J-CC-BY-2.0.jpg"
              />
            </ImageAttribution>
  }
}
```

### Props

By default the image is shown using an `img` HTML element. All unlinsted props will be passed to the `img` element.

| Name | Type | Deafult | Description |
| - | - | - | - |
| attributionText | string, | null | Replace the attribution text with a custom text |
| attributionTextClassName | string | null | Class assigned to the attribution text element |
| attributionTextComponent | component/element | "figcaption" | Custom component or html element used for the attribution text|
| attributionTextStyle | any | null | Style assigned to the attribution text element |
| author | string, | null | Picture's author name |
| authorLink | string, | null | Link assigned to the `author` text |
| containerClassName | string | null | Class of the img container, not used with `mode: hidden` |
| containerComponent | component/element | "figure" | Component/element of the img container, not used with `mode: hidden` |
| containerStyle | any | null | Style  of the img container, not used with `mode: hidden`|
| dataAttributes | boolean | true | If true add picture informations as [data-* attributes](https://www.w3schools.com/tags/att_global_data.asp) to the img element |
| hover | bool | false | If true, show attribution text only when the mouse is hover the image |
| license | string | null | License applied to the picture |
| licenseLink | string | null | Link assigned to the `license` text |
| mode | "hidden"/"outside"/"overlay" | "overlay" | Mode to display the attribution text |
| onContainerMouseEnter | func | null | `onMouseEnter` listener of the img container, not used with `mode: hidden` |
| onContainerMouseLeave | func | null | `onMouseLeave` listener of the img container, not used with `mode: hidden` |
| position | "topleft"/"topcenter"/"topright"/"bottomleft"/"bottomcenter"/"bottomright" | "bottomright" | Position of the attribution text |
| source | string | null | Source of the picture |
| sourceLink | string | null | Link assigned to the `source` text |
| title | string | null | Title of the picture |
| titleLink | string | null | Link assigned to the `title` text |

## License

MIT © [scailbc](https://github.com/scailbc)
