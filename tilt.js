const aboutWrapper = document.getElementById('aboutWrapper');
const aboutImage = document.getElementById('aboutImage');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10; // 左右倾斜
  const y = (e.clientY / window.innerHeight - 0.5) * 10; // 上下倾斜

  aboutWrapper.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  aboutImage.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});
