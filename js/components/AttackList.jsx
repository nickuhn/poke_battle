'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section>
        <button type="button" onClick={this.props.lightAttack}>Light Attack</button>
        <button type="button" onClick={this.props.heavyAttack}>Heavy Attack</button>
        <button type="button" onClick={this.props.lightDefense}>Light Defense</button>
        <button type="button" onClick={this.props.heavyDefense}>Heavy Defense</button>
      </section>
    )
  }
});
