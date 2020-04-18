# react-image-attribution

> Easily add attribution info to your images

[![NPM](https://img.shields.io/npm/v/react-image-attribution.svg)](https://www.npmjs.com/package/react-image-attribution) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This package allows to add attibution info to the images and easily display them in different ways.

You can use it as a normal `<img />` element or pass a custom component as child.

[How to correctly attribute images](https://www.pixsy.com/academy/image-user/correctly-attribute-images/)

[Best practices for attribution](https://wiki.creativecommons.org/wiki/best_practices_for_attribution)

## Install

```bash
npm install --save react-image-attribution
```

## Usage

```jsx
import React, { Component } from 'react'

import ImageAttribution from 'react-image-attribution'

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

## License

MIT © [scailbc](https://github.com/scailbc)
