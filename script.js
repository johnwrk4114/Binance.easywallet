const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// 粒子类
class Particle {
    constructor(){
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = 'rgba(243, 186, 47, 0.8)'; // 金色
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        // 边界检测
        if(this.x < 0 || this.x > width) this.speedX *= -1;
        if(this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 创建粒子
function initParticles(){
    particlesArray = [];
    for(let i=0; i<100; i++){
        particlesArray.push(new Particle());
    }
}

// 画线连接粒子
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

// 动画循环
function animate(){
    ctx.clearRect(0,0,width,height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
}

// 监听窗口变化
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
});

// 初始化
initParticles();
animate();
