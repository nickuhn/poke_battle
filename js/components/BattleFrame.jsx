'use strict'

var React = require('react');
var request = require('superagent');
var Printout = require('./Printout.jsx');
var BattleField = require('./BattleField.jsx');
var AttackList = require('./AttackList.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      enemyPokemon: '',
      enemySprite: '',
      userPokemon: '',
      userSprite: ''
    }
  },

  getEnemyPokemon: function(random) {
    request
        .get('http://pokeapi.co/api/v1/pokemon/' + random + '/')
        .end(function(err, res) {
          var curr = JSON.parse(res.text);
          this.setState({
            enemyPokemon: curr
          })
          request
            .get('http://pokeapi.co' + curr.sprites[0].resource_uri)
            .end(function(err, res) {
              this.setState({
                enemySprite: JSON.parse(res.text)
              })
            }.bind(this))
        }.bind(this));
  },

  getUserPokemon: function(random) {
    request
        .get('http://pokeapi.co/api/v1/pokemon/' + random + '/')
        .end(function(err, res) {
          var curr = JSON.parse(res.text);
          this.setState({
            userPokemon: curr
          })
          request
            .get('http://pokeapi.co' + curr.sprites[0].resource_uri)
            .end(function(err, res) {
              this.setState({
                userSprite: JSON.parse(res.text)
              })
            }.bind(this))
        }.bind(this));
  },

  componentDidMount: function() {
    var rEnemy = Math.floor(Math.random() * 151 ) + 1;
    var rUser = Math.floor(Math.random() * 151 ) + 1;
    this.getEnemyPokemon(rEnemy);
    this.getUserPokemon(rUser);
  },

  lightAttack: function() {
    var n = Math.floor(Math.random() * this.state.userPokemon.moves.length);
    console.log('light attack', this.state.userPokemon.moves[n].name);
  },

  heavyAttack: function() {
    var n = Math.floor(Math.random() * this.state.userPokemon.moves.length);
    console.log('heavy attack', this.state.userPokemon.moves[n].name);
  },

  lightDefense: function() {
    var n = Math.floor(Math.random() * this.state.userPokemon.moves.length);
    console.log('light defense', this.state.userPokemon.moves[n].name);
  },

  heavyDefense: function() {
    var n = Math.floor(Math.random() * this.state.userPokemon.moves.length);
    console.log('heavy defense', this.state.userPokemon.moves[n].name);
  },

  render: function() {
    return (
      <main>
        <BattleField enemyPokemon={this.state.enemyPokemon}
                     enemySprite={this.state.enemySprite}
                     userPokemon={this.state.userPokemon}
                     userSprite={this.state.userSprite}/>
        <AttackList userAttacks={this.state.userPokemon}
                    lightAttack={this.lightAttack}
                    heavyAttack={this.heavyAttack}
                    lightDefense={this.lightDefense}
                    heavyDefense={this.heavyDefense}/>
        <Printout />
      </main>
    );
  }
});






