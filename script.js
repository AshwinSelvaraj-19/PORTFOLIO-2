// === Typing Effect for Hero ===
const heroText = "Hey, I'm Ashwin Selvaraj";
const typedText = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');
let charIndex = 0;
function typeHeroText() {
  if (charIndex <= heroText.length) {
    typedText.textContent = heroText.slice(0, charIndex);
    charIndex++;
    setTimeout(typeHeroText, 70);
  }
}
document.addEventListener('DOMContentLoaded', typeHeroText);

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('.nav-links a, .hero-btn').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    }
  });
});

// === Scroll-triggered Fade-in Animation ===
function revealOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === Contact Form Validation (No Backend) ===
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = '#ff4e4e';
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = '#ff4e4e';
        return;
      }
      formMessage.textContent = 'Thank you! Your message has been received.';
      formMessage.style.color = '#00fff7';
      form.reset();
    });
  }
});

// === Simple Particle/Glow Effect in Hero ===
(function createParticles() {
  const canvas = document.createElement('canvas');
  const container = document.getElementById('particles');
  if (!container) return;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#00fff7', '#a259ff', '#1a8fff'];
  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  window.addEventListener('resize', resize);
  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 1.2 + Math.random() * 2.8;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 0.18 + Math.random() * 0.22;
    this.speed = 0.2 + Math.random() * 0.5;
    this.angle = Math.random() * Math.PI * 2;
  }
  Particle.prototype.draw = function() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 16;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  };
  Particle.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.angle += (Math.random() - 0.5) * 0.02;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  };
  function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 3500);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})(); 