const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const mouse = { x: null, y: null };

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(){
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = 'rgba(243,186,47,0.8)';
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(mouse.x && mouse.y){
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 100){
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
        if(this.x < 0 || this.x > width) this.speedX *= -1;
        if(this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function initParticles(){
    particlesArray = [];
    for(let i=0; i<120; i++){
        particlesArray.push(new Particle());
    }
}

function connectParticles(){
    for(let a=0; a<particlesArray.length; a++){
        for(let b=a; b<particlesArray.length; b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 120){
                ctx.strokeStyle = 'rgba(243,186,47,0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    ctx.clearRect(0,0,width,height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animate();
