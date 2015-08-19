'use strict'

var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <article>
        <h1>Pokemon Battle Royale</h1>
      </article>
    )
  }
})

React.render(<App />, document.getElementById('battleBox'));
