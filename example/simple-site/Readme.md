
# metalsmith-reactjs example
  
  This example demonstrates how to use react.js as the template engine to compose each page.
  

## Installation

    $ npm install

## Run

```
$ node server
```

then visit `http://localhost:3000`

## Usage

### Layout.jsx

This is the base view component, all top level pages should start with this component. You could change each page's meta tag like `title`, `description` in this component, or better yet, make them metatags in markdown file and bind to each field at build time.

### Blog.jsx

This is a top level page, it's contents should all be wrapped in the `<Layout>` component, which looks like this:

  ``````javascript
  
      render: function() {

        return (
            <Layout title={this.props.title}>

              <h1>Blog contents</h1>
              <h2>
                {this.state.items.map( function(item) {
                    return <span key={item.path} >{item.title}<br/></span>
                  }
                )}
              </h2>
            
            </Layout>
        )
      }

  
  ```

  Since this is a standard reactjs comonent, you enjoy the **ultimate** freedom of assembling the page with sub-components (in a sense of `partials` in traditional templating system like `Handlebars`) however you like.

## License

  MIT