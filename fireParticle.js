var Particle = function (lifeTime, posX, posY) {
  this.pos = {x:posX, y:posY};
  this.vel = {x:0,y:0};
  this.lifeTime = lifeTime;
}

Particle.prototype.update = function (forces) {
  
  for (var i=0; i<forces.length; i++) {
    this.vel.x += forces[i].x;
    this.vel.y += forces[i].y;
    
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  this.lifeTime -= 1;
}

Particle.prototype.draw = function (context) {
  context.fillStyle = "#ffff00";
  context.fillRect(this.pos.x, this.pos.y, 10, 10);
}