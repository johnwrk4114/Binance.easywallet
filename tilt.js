const loginWrapper = document.getElementById('loginWrapper');
const loginContainer = document.getElementById('loginContainer');
const aboutWrapper = document.getElementById('aboutWrapper');
const aboutImage = document.getElementById('aboutImage');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20; // 左右倾斜
  const y = (e.clientY / window.innerHeight - 0.5) * 20; // 上下倾斜

  loginWrapper.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  loginContainer.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

  aboutWrapper.style.transform = `rotateY(${x/2}deg) rotateX(${-y/2}deg)`;
  aboutImage.style.transform = `rotateY(${x/2}deg) rotateX(${-y/2}deg)`;
});
