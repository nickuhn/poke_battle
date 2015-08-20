'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section>
        <p>You did (insert number here) damage to wild (insert name here)!</p>
        <p>Wild (insert name here) did (insert number here) to you!</p>
      </section>
    )
  }
});
