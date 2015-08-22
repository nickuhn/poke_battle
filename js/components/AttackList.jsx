'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section id="attackList">
        <button type="button" onClick={this.props.lightAttack}>Light Attack</button>
        <button type="button" onClick={this.props.heavyAttack}>Heavy Attack</button>
        <button type="button" onClick={this.props.defend}>Defend</button>
      </section>
    )
  }
});
