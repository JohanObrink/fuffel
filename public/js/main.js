
// Main
// ------------
// Kicks it all off
$(function() {

  'use strict';

  var game = new Game($('#game'));

  window.game = game;

  game.start();

});