'use strict';

var React = require('react');
var request = require('superagent');

module.exports = React.createClass({

  render: function() {
    console.log(this.props.userPokemon);
    return (
      <section>
        <span> Wild Pokemon: {this.props.enemyPokemon.name} HP: {this.props.enemyPokemon.hp} </span>
        <img src={"http://pokeapi.co" + this.props.enemySprite.image} alt="pokemon" />
        <span> Your Pokemon: {this.props.userPokemon.name} HP: {this.props.userPokemon.hp} </span>
        <img src={"http://pokeapi.co" + this.props.userSprite.image} alt="pokemon" />
      </section>
    )
  }
});
