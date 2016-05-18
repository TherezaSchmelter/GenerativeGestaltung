var Particle = function (posX, posY) {
    this.pos = { x: posX, y: posY };
    this.vel = { x: 0, y: 0 };
}

var constrain = function (v, min, max) {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}

//update particle
Particle.prototype.update = function (foodSourcePos, bestSolution, randomX, randomY) {
    var newVel = { x: 0, y: 0 };
    newVel.x = constrain(this.vel.x + randomX + 0.01 * (foodSourcePos.x - this.pos.x) + 0.005 * (bestSolution.x - this.pos.x), -2, 2);
    newVel.y = constrain(this.vel.y + randomY + 0.01 * (foodSourcePos.y - this.pos.y) + 0.005 * (bestSolution.y - this.pos.y), - 2, 2);

    this.pos.x += newVel.x;
    this.pos.y += newVel.y;

    vel = newVel;
}

Particle.prototype.draw = function (context) {
    context.beginPath();
    context.strokeStyle = "rgba(100,100,255,1)";
    context.lineWidth = 5;
    context.arc(this.pos.x, this.pos.y,3, 0, 2 * Math.PI);
    context.stroke();
}