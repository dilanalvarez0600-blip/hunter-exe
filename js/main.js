(() => {
  const loader = document.getElementById("loader");
  const bootLog = document.getElementById("bootLog");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");
  const canvas = document.getElementById("hex");
  const ctx = canvas.getContext("2d");

  const lines = [
    "[ SYSTEM BOOT ]",
    "FILE: HUNTER.EXE",
    "STATUS: RUNNING",
    "MEMORY: UNLIMITED",
    "CHAIN: ROBINHOOD",
    "RUN HUNTER.EXE",
  ];

  const typeBoot = async () => {
    for (const line of lines) {
      for (let i = 0; i < line.length; i += 1) {
        bootLog.textContent += line[i];
        await new Promise((r) => setTimeout(r, 18));
      }
      bootLog.textContent += "\n";
      await new Promise((r) => setTimeout(r, 90));
    }
  };

  const hideLoader = () => loader.classList.add("done");
  typeBoot().then(() => setTimeout(hideLoader, 420));
  setTimeout(hideLoader, 2600);

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  document.querySelectorAll("a, button, .hero-logo").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hot"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hot"));
  });

  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let cx = mx;
  let cy = my;

  window.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
    },
    { passive: true }
  );

  const tickCursor = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(tickCursor);
  };
  tickCursor();

  const glyphs = "0123456789ABCDEFHUNTER$";
  const cols = [];
  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const count = Math.ceil(canvas.width / 22);
    cols.length = 0;
    for (let i = 0; i < count; i += 1) {
      cols.push({ x: i * 22, y: Math.random() * canvas.height, s: 0.6 + Math.random() * 1.4 });
    }
  };
  resize();
  window.addEventListener("resize", resize);

  const drawHex = () => {
    ctx.fillStyle = "rgba(4, 6, 10, 0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(154, 255, 90, 0.28)";
    ctx.font = "12px IBM Plex Mono, monospace";
    cols.forEach((c) => {
      ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], c.x, c.y);
      c.y += c.s * 6;
      if (c.y > canvas.height) c.y = -20;
    });
    requestAnimationFrame(drawHex);
  };
  drawHex();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.16 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
