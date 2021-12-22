const fs = require('fs');
const { createCanvas } = require('canvas');
const randomColor = require('randomcolor');
const w = 500;
const h = 500;

const canvas = createCanvas(w, h);
const ctx = canvas.getContext('2d');
const particles = [];
const loopNum = 100;

function Factory() {
  this.x = Math.round(Math.random() * w);
  this.y = Math.round(Math.random() * h);
  this.rad = Math.round(Math.random() * 1) + 1;
  this.rgba = randomColor({ luminosity: 'light' });
  this.vx = Math.round(Math.random() * 3) - 1.5;
  this.vy = Math.round(Math.random() * 3) - 1.5;
}

function draw(particleNum, bgList) {
  ctx.clearRect(0, 0, w, h);
  // make background
  var gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, bgList[0]);
  gradient.addColorStop(1, bgList[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 0; i < particleNum; i++) {
    var temp = particles[i];
    var factor = 1;

    for (var j = 0; j < particleNum; j++) {

      var temp2 = particles[j];
      ctx.linewidth = 0.5;

      if (findDistance(temp, temp2) < 50 && Math.random() > 0.8) {
        ctx.strokeStyle = temp.rgba;
        ctx.beginPath();
        ctx.moveTo(temp.x, temp.y);
        ctx.lineTo(temp2.x, temp2.y);
        ctx.stroke();
        factor++;
      }
    }


    ctx.fillStyle = temp.rgba;
    ctx.strokeStyle = temp.rgba;

    ctx.beginPath();
    ctx.arc(temp.x, temp.y, temp.rad * factor, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(temp.x, temp.y, (temp.rad + 5) * factor, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();


    temp.x += temp.vx;
    temp.y += temp.vy;

    if (temp.x > w) temp.x = 0;
    if (temp.x < 0) temp.x = w;
    if (temp.y > h) temp.y = 0;
    if (temp.y < 0) temp.y = h;
  }
}

function findDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

for (var i = 0; i <= loopNum; i++) {
  const backgroundColor = randomColor({ luminosity: 'dark', count: 2 });
  particles.push(new Factory());
  // console.log(particles)
  draw(i, backgroundColor);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`./public/images/collection_${i}.png`, buffer);
}




