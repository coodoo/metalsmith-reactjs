/** @jsx React.DOM */

var React = require('react');
var Layout = require('./Layout.jsx');

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

  //
  handleClick: function() {
    // this.setState({items: this.state.items.concat(this.state.items.length)})
  },

  // 
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

})
