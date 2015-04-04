
# metalsmith-reactjs

  A **[metalsmith](https://github.com/segmentio/metalsmith)** plugin to render files using [React.js](http://facebook.github.io/react/) as the template engine, hence allowing you to use familiar `jsx` syntax to compose pages in a component manner instead of partials.

  In short, it's a replacement for traditional templating system like `Handlebars` or `Jade`.


## Installation

    $ npm install metalsmith-reactjs

## Javascript Usage

  For the simplest use case, just pass your templating engine:

```js
var template = require('metalsmith-reactjs');

metalsmith.use(template());
```

  To specify additional options:

```js
metalsmith.use(template({
    staticPage: true, 
    templateDir: __dirname + '/templates/' 
}));
```

### staticPage
When true, will use `React.renderToStaticMarkup()` to generate content string, which contains no `data-react-id` hence it's pure static content without any react component functionality.

When set to false, will use `React.renderToString()` to generate content string, each generated element will come with `data-react-id` attribute so you can control it just like any react component.

### templateDir
Assign path to template folder, default is `./templates`.


## CLI Usage

  Install the node modules and then add the `metalsmith-reactjs` key to your `metalsmith.json` plugins. If you want to specify additional options, pass an object:

```json
{
  "plugins": {
    "metalsmith-reactjs": {
      "staticPage": true,
      "templateDir": "./templates/"
    }
  }
}
```

## Example

See `example/`.

## License

  MIT