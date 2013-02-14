
(function() {

  'use strict';

  // Player
  // -----------------
  // The Player is the protagonist of the game
  // Basically your average controllabe, star picking, monster squashing
  // princess/agent/horse owner/Darth Vader bad ass.
  var Player = Game.Player = function(caracter) {

    // the struct holding url:s for each caracter image based on current action
    this.caracter = caracter;

    // the caracters velocity - currently only used for jumping
    this.velocity = { x: 0, y: 0 };

    // players current position - updated by updatePosition method
    this.position = { x: 0, y: 0 };

    // the area that needs to be deleted from the canvas before rendering the new image
    this.clearRect = null;

    // the size of the new image to render - position is retrieved from position
    this.renderRect = { width: 0, height: 0 };

    // the collision detection size of the player
    this.hitRect = { x: 0, y: 0, width: 0, height: 0 };

    // the basic speed of movement while walking / jumping
    this.speed = { x: 2, y: 5 };

    // the rate of y speed change when jumping
    this.gravity = 0.1;

    // a flag indicating whether the player needs to be redrawn
    this.needsRedraw = true;

    // the current drawn image
    this.currentImage = '';

    _.bindAll(this);
  };

  // ##move
  // move one step left or right (-1 | 1)
  Player.prototype.move = function(direction) {
    this.velocity.x = this.speed.x * direction / Math.abs(direction);
    return this;
  };

  // ##jump
  // jump... duh!
  Player.prototype.jump = function() {
    //check if player is on the ground
    if(this.position.y === 0) {
      this.velocity.y = -this.speed.y;
    }
    return this;
  };

  // ##updatePosition
  // Called by the Game's render loop to update player position
  Player.prototype.updatePosition = function() {
    
    //make jumps slow down
    if(this.velocity.y !== 0) {
      this.velocity.y -= this.gravity;
      this.position.y += this.velocity;

      // check if player has landed
      if(this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y = 0;
      }

      this.needsRedraw = true;
    }

    //update x position
    if(this.velocity.x !== 0) {
      this.position.x += this.velocity.x;

      this.needsRedraw = true;
    }

    return this;
  };

  // ## render
  // If needsRedraw is true, clears former position and draws new position
  Player.prototype.render = function(ctx) {

    var newImage = this.getImage();
    if(newImage !== this.currentImage) {
      this.needsRedraw = true;
      this.currentImage = newImage;
    }

    if(this.needsRedraw) {
      if(this.clearRect) {
        this.clear(ctx);
      }

    }

    this.needsRedraw = false;
    
    return this;
  };

  // ##clearRect
  // Deletes the current player from the canvas
  Player.prototype.clear = function(ctx) {
    
    return this;
  };

  // ##getImage
  // Called from render
  // Updates current player image according to movement
  Player.prototype.getImage = function() {
    
    return this;
  };


})();