var sizeOverLifeTime = [0, 50, 0];
var sizeOVerLifeTimeTiming = [0.1, 0.6, 1];

var colorOverLifeTime = [{ r: 255, g: 193, b: 27 }, { r: 255, g: 50, b: 50 }, { r: 200, g: 200, b: 200 }];
var colorOverLifeTimeTiming = [0, 0.6, 0.8];

var transparencyOverLifeTime = [1, 0];
var transparencyOverLifeTimeTiming = [0.6,1];

var Particle = function (lifeTime, posX, posY, rotation, spawnCenterX) {
    var distanceToCenter = Math.abs(spawnCenterX - posX) / 200;
    this.pos = { x: posX, y: posY - (distanceToCenter*100) };
    this.vel = { x: 0, y: 0 };
    this.currentLifeTime = lifeTime / (1+distanceToCenter);
    this.lifeTime = this.currentLifeTime;
    this.angleSpeed = rotation;
}

var blend = function (x0, x1, t) {
    return (1 - t) * x0 + t * x1;
}

var constrain = function (x, min, max) {
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

var getAnimationTime = function(startTime, endTime, currentTime){
    if (currentTime > endTime) {
        return 1;
    } else if (currentTime<startTime) {
        return 0;
    } else {
        return (currentTime - startTime) / (endTime - startTime);
    }
}

Particle.prototype.update = function (force, windForce) {
  
    this.vel.x += force.x + windForce.x;
    this.vel.y += force.y + windForce.y;
    
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  
    this.currentLifeTime -= 1;
}

Particle.prototype.draw = function (context, frameCount) {
    var time = 1 - this.currentLifeTime / this.lifeTime;
    var color = { 
        r: Math.floor(blend(Math.floor(blend(colorOverLifeTime[0].r, colorOverLifeTime[1].r, getAnimationTime(colorOverLifeTimeTiming[0], colorOverLifeTimeTiming[1], time))),colorOverLifeTime[2].r,getAnimationTime(colorOverLifeTimeTiming[1], colorOverLifeTimeTiming[2], time))), 
        g: Math.floor(blend(Math.floor(blend(colorOverLifeTime[0].g, colorOverLifeTime[1].g, getAnimationTime(colorOverLifeTimeTiming[0], colorOverLifeTimeTiming[1], time))),colorOverLifeTime[2].g,getAnimationTime(colorOverLifeTimeTiming[1], colorOverLifeTimeTiming[2], time))),  
        b: Math.floor(blend(Math.floor(blend(colorOverLifeTime[0].b, colorOverLifeTime[1].b, getAnimationTime(colorOverLifeTimeTiming[0], colorOverLifeTimeTiming[1], time))), colorOverLifeTime[2].b, getAnimationTime(colorOverLifeTimeTiming[1], colorOverLifeTimeTiming[2], time)))
    };
    var transparency = blend(transparencyOverLifeTime[0], transparencyOverLifeTime[1], getAnimationTime(transparencyOverLifeTimeTiming[0], transparencyOverLifeTimeTiming[1], time))

    context.save();
    var size = blend(blend(sizeOverLifeTime[0], sizeOverLifeTime[1], getAnimationTime(sizeOVerLifeTimeTiming[0], sizeOVerLifeTimeTiming[1], time)), sizeOverLifeTime[2], getAnimationTime(sizeOVerLifeTimeTiming[1], sizeOVerLifeTimeTiming[2], time));
    context.translate(this.pos.x + size / 2, this.pos.y + size / 2);
    context.rotate(frameCount / 100 * this.angleSpeed * Math.sin(frameCount / 500) * 5);

    context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + transparency + ")"
    
    context.fillRect(-size/2, -size/2, size, size);
    context.restore();
}