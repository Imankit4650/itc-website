/* ═══════════════════════════════════════════
   ITC IITB — script.js
   All interactions, data, and dynamic effects
   ═══════════════════════════════════════════ */

/* ── DATA ── */
const events = [
  { title: "Techfest 2025",         type: "competition", status: "upcoming", icon: "🚀", date: "Jan 17–19, 2026", venue: "IIT Bombay",    desc: "Asia's largest science & technology festival, drawing participants from 150+ countries." },
  { title: "XLR8 Robotics",         type: "competition", status: "upcoming", icon: "🤖", date: "Dec 12, 2025",    venue: "Robotics Lab", desc: "Annual line-following and maze-solving robotics competition across three difficulty levels." },
  { title: "Web Dev Bootcamp",       type: "workshop",    status: "upcoming", icon: "💻", date: "Nov 28, 2025",    venue: "CC 103",       desc: "3-day intensive workshop on modern full-stack web development: React, Node, and deployment." },
  { title: "Inter IIT Tech 13.0",   type: "competition", status: "past",     icon: "🏆", date: "Mar 2025",        venue: "IIT Kharagpur",desc: "IIT Bombay's contingent represented the institute brilliantly at the national inter-IIT tech meet." },
  { title: "ML & AI Summit",         type: "workshop",    status: "past",     icon: "🧠", date: "Feb 2025",        venue: "Victor CC",    desc: "Full-day summit on machine learning with talks from leading researchers and industry practitioners." },
  { title: "PCB Design Workshop",    type: "workshop",    status: "past",     icon: "🔌", date: "Oct 2024",        venue: "EE Seminar",   desc: "Hands-on PCB layout and soldering workshop for beginners, with free kits included." },
  { title: "Hackathon 6.0",          type: "competition", status: "past",     icon: "⚡", date: "Sep 2024",        venue: "SOM 101",      desc: "36-hour hackathon with ₹1L in prizes across 5 domains — AI, FinTech, SustainTech, Web, and IoT." },
  { title: "Astronomy Night",         type: "workshop",    status: "past",     icon: "🔭", date: "Aug 2024",        venue: "Hostel Grounds",desc: "Telescope sessions, astrophotography demo, and a talk on India's Chandrayaan-3 mission." },
];

const cabinet = [
  { name: "Aarav Mehta",  role: "General Secretary",      initials: "AM", color: "#3d8b5e" },
  { name: "Priya Nair",   role: "Deputy Secretary",        initials: "PN", color: "#e8a020" },
  { name: "Rohan Gupta",  role: "Events Head",             initials: "RG", color: "#5ab07d" },
  { name: "Sneha Iyer",   role: "Finance Head",            initials: "SI", color: "#c87941" },
  { name: "Karan Singh",  role: "PR & Outreach Head",      initials: "KS", color: "#3d8b5e" },
  { name: "Divya Patel",  role: "Technical Head",          initials: "DP", color: "#e8a020" },
];

const managers = [
  { name: "Aditya Verma", role: "Manager", club: "Robotics Club",    initials: "AV", color: "#3d8b5e" },
  { name: "Tanya Shah",   role: "Manager", club: "Coding Club",      initials: "TS", color: "#e8a020" },
  { name: "Nikhil Rao",   role: "Manager", club: "Electronics Club", initials: "NR", color: "#5ab07d" },
  { name: "Misha Bose",   role: "Manager", club: "Astronomy Club",   initials: "MB", color: "#c87941" },
  { name: "Arjun Das",    role: "Manager", club: "Aeromodelling",    initials: "AD", color: "#3d8b5e" },
  { name: "Riya Kumar",   role: "Manager", club: "Web & Design",     initials: "RK", color: "#e8a020" },
  { name: "Varun Joshi",  role: "Manager", club: "Embedded Systems", initials: "VJ", color: "#5ab07d" },
  { name: "Pooja Sharma", role: "Manager", club: "Blockchain Club",  initials: "PS", color: "#c87941" },
];

/* ══════════════════════════════════
   HERO CANVAS — animated particles
══════════════════════════════════ */
function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 55;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.5 + 0.4,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(61,139,94,${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90,176,125,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════
   3D TILT EFFECT on hover
══════════════════════════════════ */
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    if (card.dataset.tiltReady === 'true') return;

    card.dataset.tiltReady = 'true';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * 8;
      const ry = ((e.clientX - cx) / rect.width) * -8;

      card.style.transform = `scale(1.04) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
  });
}

/* ══════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.stat-val').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = target >= 1000
        ? (current >= 1000 ? Math.floor(current / 1000) + 'k' : Math.floor(current))
        : Math.floor(current);
    }, step);
  });
}

/* ══════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════ */
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════
   RENDER EVENTS
══════════════════════════════════ */
function renderEvents(filter = 'all') {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;
  const filtered = filter === 'all'
    ? events
    : events.filter(e => e.status === filter || e.type === filter);

  grid.innerHTML = filtered.map(e => `
    <div class="event-card">
      <div class="event-thumb">
        <span>${e.icon}</span>
        <span class="event-status ${e.status}">${e.status === 'upcoming' ? 'Upcoming' : 'Past'}</span>
      </div>
      <div class="event-body">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <div class="event-meta">
          <span>📅 ${e.date}</span>
          <span>📍 ${e.venue}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Attach tilt to new cards
  initTilt();
}

function filterEvents(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEvents(filter);
}

/* ══════════════════════════════════
   RENDER TEAM
══════════════════════════════════ */
function renderTeam() {
  const cg = document.getElementById('cabinetGrid');
  const mg = document.getElementById('managersGrid');
  if (!cg || !mg) return;

  cg.innerHTML = cabinet.map(m => `
    <div class="team-card tilt-card">
      <div class="team-avatar" style="background:${m.color}22;color:${m.color}">${m.initials}</div>
      <h4>${m.name}</h4>
      <div class="team-role">${m.role}</div>
    </div>
  `).join('');

  mg.innerHTML = managers.map(m => `
    <div class="team-card tilt-card">
      <div class="team-avatar" style="background:${m.color}22;color:${m.color}">${m.initials}</div>
      <h4>${m.name}</h4>
      <div class="team-role">${m.role}</div>
      <span class="club-badge">${m.club}</span>
    </div>
  `).join('');

  initTilt();
}

/* ══════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById('page-' + id);
  const nav  = document.getElementById('nav-' + id);
  if (page) page.classList.add('active');
  if (nav)  nav.classList.add('active');

  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo(0, 0);

  if (id === 'events') renderEvents();
  if (id === 'team')   renderTeam();

  // Re-observe new elements
  setTimeout(() => {
    observeReveal();
    initTilt();
  }, 50);

  if (id === 'home') initCanvas();
  return false;
}

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ══════════════════════════════════
   NAV SCROLL SHADOW
══════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ══════════════════════════════════
   CONTACT FORM
══════════════════════════════════ */
function submitForm() {
  const fn  = document.getElementById('firstName').value.trim();
  const em  = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if (!fn || !em || !msg) {
    alert('Please fill in your Name, Email, and Message.');
    return;
  }
  document.getElementById('contactFormWrap').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initTilt();
  observeReveal();
  animateCounters();

  // Instantly show all .reveal elements on the active home page
  setTimeout(() => {
    document.querySelectorAll('#page-home .reveal').forEach(el => el.classList.add('visible'));
  }, 200);
});
