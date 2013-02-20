
(function() {

  'use strict';

  // Player
  // -----------------
  // The Player is the protagonist of the game
  // Basically your average controllabe, star picking, monster squashing
  // princess/agent/horse owner/Darth Vader bad ass.
  var Player = Game.Player = function(character) {

    this.groundY = 220;

    // the struct holding url:s for each caracter image based on current action
    this.character = character;

    // the caracters velocity - currently only used for jumping
    this.velocity = { x: 0, y: 0 };

    // players current position - updated by updatePosition method
    this.position = { x: 350, y: this.groundY };

    // the area that needs to be deleted from the canvas before rendering the new image
    this.oldPosition = {};

    // the basic speed of movement while walking / jumping
    this.speed = { x: 3, y: 40/4 };

    // the rate of y speed change when jumping
    this.gravity = 9.2/50;

    // a flag indicating whether the player needs to be redrawn
    this.needsRedraw = true;

    // the current drawn image
    this.currentImage = null;

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
    if(this.position.y === this.groundY) {
      this.velocity.y = -this.speed.y;
    }
    return this;
  };

  // ##updatePosition
  // Called by the Game's render loop to update player position
  Player.prototype.updatePosition = function() {

    this.oldPosition = { x: this.position.x, y: this.position.y };
    
    //make jumps slow down
    if(this.velocity.y !== 0) {

      this.position.y += this.velocity.y;
      this.velocity.y += this.gravity;

      // check if player has landed
      if(this.position.y >= this.groundY) {
        this.position.y = this.groundY;
        this.velocity.y = 0;
      }

      this.needsRedraw = true;
    }

    //update x position
    if(this.velocity.x !== 0) {
      this.position.x += this.velocity.x;

      this.needsRedraw = true;
    }

    this.velocity.x = 0;

    return this;
  };

  // ## render
  // If needsRedraw is true, clears former position and draws new position
  Player.prototype.render = function(ctx) {

    var newImage = this.getImage();
    if(!this.currentImage || this.currentImage.src.indexOf(newImage.src) === -1) {
      this.needsRedraw = true;
      this.currentImage = new Image();
      this.currentImage.src = newImage.src;
    }

    ctx.clearRect(this.oldPosition.x, this.oldPosition.y, this.currentImage.width, this.currentImage.height);
    ctx.drawImage(this.currentImage, this.position.x, this.position.y);

    this.needsRedraw = false;
    
    return this;
  };

  // ##getImage
  // Called from render
  // Updates current player image according to movement
  Player.prototype.getImage = function() {
    return this.character.normal.standing.left;
  };


})();