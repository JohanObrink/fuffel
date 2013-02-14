
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

    this.initialized = false;

    _.bindAll(this);
  };

  // ##start
  // Starts the game. Calls init if game is not paused
  Game.prototype.start = function() {
    if(!this.initialized) {
      this.init();
    }
    this.ticker = setInterval(this.render, 100);
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

    
  };

  // ##cleanup
  // Removes everything from the stage and hides it under the carpet
  Game.prototype.cleanup = function() {
    this.initialized = false;
  };

  // ##render
  // Main game loop call
  Game.prototype.render = function() {
    console.log('render');
  };

})();