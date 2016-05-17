var Particle = function (lifeTime, posX, posY, startFrameCount, size) {
    this.pos = { x: posX, y: posY };
    this.startPos = { x: posX, y: posY };
    this.lifeTime = lifeTime;
    this.startFrameCount = startFrameCount;
    this.size = size;
    this.color = { r: 255 - constrain(startFrameCount % 300, 0, 255), g: 0, b: 0 };
}

/*
* clamp input value between min and max
*/
var constrain = function (v, min, max) {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}


Particle.prototype.update = function (frameCount) {
  
    //particles draw spirals
    this.pos.x = this.startPos.x + Math.sin(Math.PI * 2 * (frameCount - this.startFrameCount) / 20) * (frameCount - this.startFrameCount) / 20 * this.size;
    this.pos.y = this.startPos.y + Math.cos(Math.PI * 2 * (frameCount - this.startFrameCount) / 20) * (frameCount - this.startFrameCount) / 20 * this.size;
    //console.log(" " + this.lifeTime);
    this.lifeTime -= 1;
}

Particle.prototype.draw = function (context) {
    context.beginPath();
    context.strokeStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + ",1)";
    context.arc(this.pos.x, this.pos.y, 1 * this.size, 0, 2 * Math.PI);
    context.stroke();
}