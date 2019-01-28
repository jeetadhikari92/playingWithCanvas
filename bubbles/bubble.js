const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
})

function Circle (x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = function() {
        if(this.x + this.radius> innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius> innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
                if(this.radius < 40){
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius){
                this.radius -= 1;
            }

        this.draw();
    }
}


let x, y, dx, dy, radius;
const circleArr = [];

for (let i = 0; i < 800; i++) {
    x = Math.random() * (innerWidth - radius * 2) + radius;
    y = Math.random() * (innerHeight - radius *2) + radius;
    dx = (Math.random() - 0.5) * 5;
    dy = (Math.random() - 0.5) * 5;
    radius = Math.random() * 3 + 1;
    let randomColor = "#" + Math.floor(Math.random() * 25542195).toString(16);
    circleArr.push(new Circle(x, y, dx, dy, radius, randomColor));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for( let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
}

animate();
