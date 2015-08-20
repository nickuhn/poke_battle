'use strict'

var React = require('react');
var BattleFrame = require('./components/BattleFrame.jsx');

var App = React.createClass({
  render: function() {
    return (
      <main>
        <h1>Pokemon Battle Royale</h1>
        <BattleFrame />
      </main>
    );
  }
});

React.render(<App />, document.getElementById('BattleBox'));
