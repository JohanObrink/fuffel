
(function() {

  'use strict';

  // internal utility function for creating a canvas
  var c = function(id, width, height, parent) {
    var cnv = document.createElement('canvas');
    cnv.attributes.id = id;
    cnv.width = width;
    cnv.height = height;
    cnv.style.position = 'absolute';
    cnv.style.top = 0;
    cnv.style.left = 0;

    parent.appendChild(cnv);

    return cnv;
  };

  // Game
  // ----------------
  // Main class controlling EVERYTHING!
  window.Game = function($el) {
    this.$el = $el;
    this.el = this.$el[0];

    this.width = $el.width();
    this.height = $el.height();

    this.bg = c('game-background', this.width, this.height, this.el);
    this.ctx_bg = this.bg.getContext('2d');

    this.objs = c('game-objects', this.width, this.height, this.el);
    this.ctx_objs = this.objs.getContext('2d');

    this.stage = new Game.Stage(this.width, this.height, this.ctx_bg, this.ctx_objs);

    this.initialized = false;

    this.controls = {};

    _.bindAll(this);
  };

  // ##start
  // Starts the game. Calls init if game is not paused
  Game.prototype.start = function() {
    if(!this.initialized) {
      this.init();
    }
    this.ticker = setInterval(this.tick, 1/30);
  };

  // ##pause
  // Toilet brake!
  Game.prototype.pause = function() {
    clearInterval(this.ticker);
  };

  // ##stop
  // Time for bed! Calls cleanup
  Game.prototype.stop = function() {
    clearInterval(this.ticker);
    this.cleanup();
  };

  // ##init
  // Sets up the stage, adding bg and stuff
  Game.prototype.init = function() {
    this.initialized = true;

    this.player = new Game.Player(Game.Characters.princess);
    this.stage.add(this.player);

    this.startListen();
  };

  // ##cleanup
  // Removes everything from the stage and hides it under the carpet
  Game.prototype.cleanup = function() {
    this.initialized = false;
  };

  // ##tick
  // Main game loop call
  Game.prototype.tick = function() {

    if(this.controls.left) {
      this.player.move(-1);
    }
    if(this.controls.right) {
      this.player.move(1);
    }
    if(this.controls.up) {
      this.player.jump();
      this.controls.up = false;
    }

    this.stage.render();
  };

  Game.prototype.keydown = function(e) {
    switch(e.keyCode) {
      case 37:
        // left
        this.controls.left = true;
        break;
      case 39:
        // right
        this.controls.right = true;
        break;
      case 38:
      case 32:
        // up
        this.controls.up = true;
        break;
      case 40:
        // down
        break;

      default: console.log(e.keyCode); break;
    }
  };

  Game.prototype.keyup = function(e) {
    switch(e.keyCode) {
      case 37:
        // left
        this.controls.left = false;
        break;
      case 39:
        // left
        this.controls.right = false;
        break;
      case 38:
        // up
        break;
      case 40:
        // down
        break;

      default: console.log(e.keyCode); break;
    }
  };

  Game.prototype.startListen = function() {
    $(window).keydown(this.keydown).keyup(this.keyup);
  };

})();