/** @jsx React.DOM */

var React = require('react');

// This is just a simple example of a component that can be rendered on both
// the server and browser

module.exports = React.createClass({

  // We initialise its state by using the `props` that were passed in when it
  // was first rendered
  getInitialState: function() {

    // jx: 注意這裏接收了 this.props 傳入的參數
    // 就算在 server 上也可以傳進來喔
    return {items: this.props.pages}
  },

  // Then we just update the state whenever its clicked - but you could imagine
  // this being updated with the results of AJAX calls, etc
  handleClick: function() {
    this.setState({items: this.state.items.concat(this.state.items.length)})
  },

  // 這是最外層基底元件，放 <html>, <head>, <body> 等元素
  render: function() {

    return (
          <html>
            
            <head>
              <meta charSet="utf-8"/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="viewport" content="width=device-width"/>

              <meta property="og:title" content={this.props.title}/>

              <title>{this.props.title}</title>
              
              <link rel="stylesheet" href="/stylesheets/style.css" />
              
              {/*<script dangerouslySetInnerHTML={{__html:'\
                              // This is making use of ES6 template strings, which allow for \
                              // multiline strings. We specified "{jsx: {harmony: true}}" when \
                              // creating the engine in app.js to get this feature. \
                              console.log("hello world"); \
                            '}}/>*/}
            </head>

            <body>
              {this.props.children}
            </body>
          </html>
        );

  }

})
