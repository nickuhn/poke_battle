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
      enemyAttack: '',
      enemyCurrHp: 0,
      userPokemon: '',
      userSprite: '',
      userCurrHp: 0,
      userAttack: ['Welcome to the Battle!']
    }
  },

  getEnemyPokemon: function(random) {
    request
        .get('http://pokeapi.co/api/v1/pokemon/' + random + '/')
        .end(function(err, res) {
          var curr = JSON.parse(res.text);
          this.setState({
            enemyPokemon: curr,
            enemyCurrHp: curr.hp
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
            userPokemon: curr,
            userCurrHp: curr.hp
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
    this.battleLogic('lightAttack');
  },

  heavyAttack: function() {
    this.battleLogic('heavyAttack');
  },

  defend: function() {
    var randomNum = Math.floor(Math.random() * 10);
    if (randomNum < 5) {
      this.battleLogic('lightDefense');
    } else {
      this.battleLogic('heavyDefense');
    }
  },

  checkVictory: function(userHp, enemyHp) {
    if(userHp <= 0) {
      var message = 'You have been defeated by ' + this.state.enemyPokemon.name;
      this.setState({
        userAttack: [message].concat(this.state.userAttack),
        userCurrHp: 0
      })
    } else if (enemyHp <= 0) {
      var message = 'You have slain ' + this.state.enemyPokemon.name;
      this.setState({
        userAttack: [message].concat(this.state.userAttack),
        enemyCurrHp: 0
      })
    }
  },

  battleLogic: function(attack) {
    var message= '';
    var x = Math.floor(Math.random() * this.state.userPokemon.moves.length);
    var userAttack = this.state.userPokemon.moves[x].name;
    var y = Math.floor(Math.random() * this.state.enemyPokemon.moves.length);
    var enemyAttack = this.state.enemyPokemon.moves[y].name;
    var possEnemyMoves = ['lightAttack', 'heavyAttack', 'lightDefense', 'heavyDefense'];
    var z = Math.floor(Math.random() * 4);
    var enemyMove = possEnemyMoves[z];
    var userHp = this.state.userCurrHp;
    var enemyHp = this.state.enemyCurrHp;
    if (attack === 'lightAttack' && (enemyMove === 'lightDefense' || enemyMove === 'heavyDefense' )) {
      message = 'You used ' + userAttack + ' ' + this.state.enemyPokemon.name + ' successfully blocked it. ';
    } else if (attack === 'lightAttack' && enemyMove === 'lightAttack') {
      message = 'You used ' + userAttack + ' and did 5 damage! ' + this.state.enemyPokemon.name + ' used ' + enemyAttack + ' and did 5 damage to you!';
      userHp = this.state.userCurrHp - 5;
      enemyHp = this.state.enemyCurrHp - 5;
    } else if (attack === 'lightAttack' && enemyMove === 'heavyAttack') {
      message = 'You used ' + userAttack + ' and did 5 damage! ' + this.state.enemyPokemon.name + ' used ' + enemyAttack + ' and did 10 damage to you!';
      userHp = this.state.userCurrHp - 10;
      enemyHp = this.state.enemyCurrHp - 5;

    } else if (attack === 'heavyAttack' && enemyMove === 'lightAttack') {
      message = 'You used ' + userAttack + ' and did 10 damage! ' + this.state.enemyPokemon.name + ' used ' + enemyAttack + ' and did 5 damage to you!';
      userHp = this.state.userCurrHp - 5;
      enemyHp = this.state.enemyCurrHp - 10;
    } else if (attack === 'heavyAttack' && enemyMove === 'heavyAttack') {
      message = 'You used ' + userAttack + ' and did 10 damage! ' + this.state.enemyPokemon.name + ' used ' + enemyAttack + ' and did 10 damage to you!';
      userHp = this.state.userCurrHp - 10;
      enemyHp = this.state.enemyCurrHp - 10;
    } else if (attack === 'heavyAttack' && enemyMove === 'lightDefense') {
      message = 'You used ' + userAttack + ' ' + this.state.enemyPokemon.name + ' successfully blocked half of it taking 5 damage. ';
      enemyHp = this.state.enemyCurrHp - 5;
    } else if (attack === 'heavyAttack' && enemyMove === 'heavyDefense') {
      message = 'You used ' + userAttack + ' ' + this.state.enemyPokemon.name + ' successfully blocked it. ';

    } else if (attack === 'lightDefense' && enemyMove === 'lightAttack') {
      message = 'You successfully blocked ' + this.state.enemyPokemon.name  + ' with ' + userAttack;
    } else if (attack === 'lightDefense' && enemyMove === 'heavyAttack') {
      message = 'You partially blocked ' + this.state.enemyPokemon.name + '\'s ' + enemyAttack + ' and took 5 damage!';
      userHp = this.state.userCurrHp - 5;
    } else if ((attack === 'lightDefense' || attack === 'heavyDefense') && (enemyMove === 'lightDefense' || enemyMove === 'heavyDefense')) {
      message = 'You blocked with ' + userAttack + ' ' + this.state.enemyPokemon.name + ' blocked as well';
    } else if (attack === 'heavyDefense') {
      message = 'You successfully blocked ' + this.state.enemyPokemon.name  + ' with ' + userAttack;
    }
    this.setState({
      userAttack: [message].concat(this.state.userAttack),
      userCurrHp: userHp,
      enemyCurrHp: enemyHp
    })
    this.checkVictory(userHp, enemyHp);
  },

  render: function() {
    return (
      <main>
        <BattleField enemyPokemon={this.state.enemyPokemon}
                     enemySprite={this.state.enemySprite}
                     userPokemon={this.state.userPokemon}
                     userSprite={this.state.userSprite}
                     enemyCurrHp={this.state.enemyCurrHp}
                     userCurrHp={this.state.userCurrHp} />
        <AttackList userAttacks={this.state.userPokemon}
                    lightAttack={this.lightAttack}
                    heavyAttack={this.heavyAttack}
                    defend={this.defend} />
        <Printout userAttack={this.state.userAttack} />
      </main>
    );
  }
});






