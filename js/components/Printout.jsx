'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var attacks = this.props.userAttack.map(function(attack) {
      return (<p>{attack}</p>);
    });
    return (
      <section id="printOut">
        {attacks}
      </section>
    )
  }
});
