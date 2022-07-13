const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pixel;
let click;
let mouse;
let generatePixel = true;

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw();
};

window.addEventListener('resize', () => resizeCanvas);

class Pixel {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x - this.size, this.y - this.size, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(generatePixel)
  pixel = new Pixel(
    (canvas.width - 30) * Math.random() + 30,
    (canvas.height - 30) * Math.random() + 30,
    'aqua',
    30
  );

  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'start';
  ctx.fillText('SQUARE:', 5, 30);
  ctx.fillText(`X: ${pixel.x.toFixed(1) - 10}`, 5, 60);
  ctx.fillText(`Y: ${pixel.y.toFixed(1) - 10}`, 5, 90);

  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'right';
  ctx.fillText('MOUSE:', canvas.width, 30);
  if (mouse) {
    ctx.fillText(`X: ${mouse.x.toFixed(1) - 10}`, canvas.width, 60);
    ctx.fillText(`Y: ${mouse.y.toFixed(1) - 10}`, canvas.width, 90);
  }

  pixel.draw(ctx);
};

document.addEventListener('mousemove', (e) => {
  mouse = { x: e.pageX, y: e.pageY };
  generatePixel = false
  draw()
});

document.addEventListener('click', (e) => {
  click = { x: e.pageX, y: e.pageY };

  if (
    click.x > pixel.x - pixel.size &&
    click.x < pixel.x &&
    click.y > pixel.y - pixel.size &&
    click.y < pixel.y
  ) {
    generatePixel = true
    draw();
  }
});

requestAnimationFrame(draw);
