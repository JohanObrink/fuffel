
(function() {

  'use strict';

  var Stage = Game.Stage = function(width, height, ctx_bg, ctx_obj) {

    this.items = [];

    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;

    this.ctx_bg = ctx_bg;
    this.ctx_obj = ctx_obj;

    _.bindAll(this);

    this.grass = new Image();
    this.grass.src = '/img/grass.png';

    this.init();
  };

  Stage.prototype.add = function(item) {
    this.items.push(item);
  };

  Stage.prototype.getVisible = function() {
    return this.items.filter(function(item) {
      return item.x + item.width > this.x
        && item.x < this.x + this.width
        && item.y + item.height > this.y
        && item.y < this.y + this.height;
    });
  };

  Stage.prototype.init = function() {

    this.ctx_bg.fillStyle = 'rgb(0, 0, 255)';
    this.ctx_bg.fillRect(0, 0, this.width, this.height/2);
    this.ctx_bg.fillStyle = 'rgb(0, 255, 0)';
    this.ctx_bg.fillRect(0, this.height/2, this.width, this.height/2);
  };

  Stage.prototype.render = function() {
    this.items.forEach(this.renderItem);
  };

  Stage.prototype.renderItem = function(item) {
    if(item.updatePosition().needsRedraw || true) {
      item.render(this.ctx_obj);
    }
  };

})();