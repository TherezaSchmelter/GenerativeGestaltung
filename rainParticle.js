//particle constructor
var Particle = function (lifeTime, posX, posY, size, canvasHeight) {
    this.pos = {x:posX, y:posY};
    this.vel = {x:0,y:0.5};
    this.lifeTime = lifeTime;
    //particles spawning at the top, have the highest velocity
    //particles with high velocity are "bigger" to create a 3d dimensional look
    this.size = 20*(1-(quantize((posY + canvasHeight) % canvasHeight, 5) / canvasHeight));
    this.lastForce = {x:0, y:0};

}

/*
* quantize input value 0..1 in n steps
*/
var quantize = function (x, n) {
    if (n == 0) return 0;
    return Math.floor(x * n) / n;
}

//update particle
Particle.prototype.update = function (forceX, forceY, windForceX, windForceY) {
  
    this.vel.x += forceX + windForceX;
    this.vel.y += forceY + windForceY;

    this.lastForce.x = forceX + windForceX;
    this.lastForce.y = forceY + windForceY;
    
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.lifeTime -= 1;
}

//normalize function
var normalizeVector = function(vector){
    var length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
    if (length != 1){
        vector.x /= length;
        vector.y /= length;
    }
    return vector;
}

//"length" and "direction" of the raindrop is based from the last applied force
var calculateRainDirection = function(xPos, yPos, vector, size){
    var newPosition = { x: xPos, y: yPos };
    newPosition.x -= vector.x * size;
    newPosition.y -= vector.y * size;
    return newPosition;
}

//draw particle
Particle.prototype.draw = function (context) {

    context.beginPath();
    context.lineWidth = "" + Math.ceil(this.size*0.05) + "";
    context.strokeStyle = "rgba(200,200,200,1)";
    context.moveTo(this.pos.x, this.pos.y);
    var newPosition = calculateRainDirection(this.pos.x, this.pos.y, normalizeVector(this.lastForce), this.size);
    context.lineTo(newPosition.x, newPosition.y);
    context.stroke();

}