'use strict';

var React = require('react');
var request = require('superagent');

module.exports = React.createClass({

  render: function() {
    console.log(this.props.userPokemon);
    return (
      <section id="battleField">
        <span id="enemyText"> Wild {this.props.enemyPokemon.name} HP: {this.props.enemyCurrHp} / {this.props.enemyPokemon.hp} </span>
        <img id="enemyPic" src={"http://pokeapi.co" + this.props.enemySprite.image} alt="pokemon" />
        <span id="userText"> {this.props.userPokemon.name} HP: {this.props.userCurrHp} / {this.props.userPokemon.hp} </span>
        <img id="userPic" src={"http://pokeapi.co" + this.props.userSprite.image} alt="pokemon" />
      </section>
    )
  }
});
