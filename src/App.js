import { useState, useEffect, useRef } from "react";
import photo1 from "./photo1.jpg";
import img1 from "./images/2.svg";
import img2 from "./images/3.svg";
import img3 from "./images/4.svg";
import img4 from "./images/5.svg";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home",         icon: "⌂",  label: "Home"    },
  { id: "skills",       icon: "◈",  label: "Skills"  },
  { id: "testimonials", icon: "💬", label: "Reviews" },
  { id: "contact",      icon: "✉",  label: "Contact" },
];

const SKILLS = [
  { name: "Digital Marketing",    icon: "📣", pct: 92, color: "#f59e0b" },
  { name: "Graphic Designing",    icon: "🎨", pct: 88, color: "#10b981" },
  { name: "UX / UI Design",       icon: "📱", pct: 83, color: "#38bdf8" },
  { name: "SEO & Growth Strategy",icon: "🚀", pct: 90, color: "#a78bfa" },
  { name: "Content Creation",     icon: "✍️", pct: 87, color: "#fb7185" },
  { name: "Web Development",      icon: "🌐", pct: 80, color: "#34d399" },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Khan",
    role: "CEO, TechStart Pakistan",
    review: "Maryam's digital marketing strategies boosted our online presence by 300%. Her creative content and targeted campaigns are exceptional.",
    avatar: "👨‍💼",
    stars: 5,
  },
  {
    name: "Fatima Ali",
    role: "Founder, FashionHub",
    review: "Working with Maryam transformed our brand. Her UX/UI designs and marketing insights helped us connect with our audience like never before.",
    avatar: "👩‍💻",
    stars: 5,
  },
  {
    name: "Omar Sheikh",
    role: "Marketing Director, EcomPlus",
    review: "Maryam's growth marketing expertise and React development skills delivered outstanding results. Highly recommend her services!",
    avatar: "👨‍💼",
    stars: 5,
  },
  {
    name: "Ayesha Malik",
    role: "Entrepreneur, BeautyGlow",
    review: "From graphic design to content writing, Maryam covered all our needs. Her work is professional, creative, and results-driven.",
    avatar: "👩‍🎨",
    stars: 5,
  },
  {
    name: "Ali Raza",
    role: "Lahore",
    review: "Absolutely amazing experience! The website design was clean, modern, and fast. Also helped me rank my business on Google within weeks. Highly recommended for anyone serious about online growth.",
    avatar: "👨‍💼",
    stars: 5,
  },
  {
    name: "Ayesha Khan",
    role: "Karachi",
    review: "She designed my brand identity and social media posts. Everything looked premium and professional. My engagement increased a lot after her work!",
    avatar: "👩‍💼",
    stars: 5,
  },
  {
    name: "Usman Tariq",
    role: "Islamabad",
    review: "Very professional developer. Fixed all bugs on my website and improved speed. SEO work also brought real traffic. Worth every penny.",
    avatar: "👨‍💻",
    stars: 5,
  },
  {
    name: "Hassan Malik",
    role: "Faisalabad",
    review: "I was struggling with my online store, but after her SEO and design improvements, my sales doubled. Great communication and fast delivery.",
    avatar: "👨‍💼",
    stars: 5,
  },
];

const TYPED_STRINGS = [
  "Digital Marketer",
  "Graphic Designer",
  "Content Writer",
  "UX/UI Specialist",
  "Creative Professional",
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maryam-akbar-538595273",
    icon: "in",
    color: "#0a66c2",
    bg: "rgba(10,102,194,0.12)",
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61565861498211",
    icon: "f",
    color: "#1877f2",
    bg: "rgba(24,119,242,0.12)",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/",
    icon: "P",
    color: "#e60023",
    bg: "rgba(230,0,35,0.12)",
  },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useTyped(strings, speed = 80, pause = 1800) {
  const [display, setDisplay]   = useState("");
  const [idx, setIdx]           = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIdx(i => (i + 1) % strings.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function SkillBar({ skill, animate }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
        <span style={{
          display: "flex", alignItems: "center", gap: 10,
          color: "#e2e8f0", fontSize: 14,
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${skill.color}18`,
            border: `1px solid ${skill.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15,
          }}>
            {skill.icon}
          </span>
          {skill.name}
        </span>
        <span style={{
          color: skill.color, fontWeight: 700, fontSize: 13,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: `${skill.color}15`,
          padding: "2px 10px", borderRadius: 50,
          border: `1px solid ${skill.color}30`,
        }}>
          {skill.pct}%
        </span>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 50, height: 7, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          height: "100%", borderRadius: 50,
          background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
          width: animate ? `${skill.pct}%` : "0%",
          transition: "width 1.6s cubic-bezier(0.25,1,0.5,1)",
          boxShadow: `0 0 14px ${skill.color}70`,
        }} />
      </div>
    </div>
  );
}

function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(145deg, #180f40, #120d30)"
          : "linear-gradient(145deg, #120d30, #08061c)",
        borderRadius: 20,
        padding: "28px",
        border: hovered ? "1px solid rgba(167,139,250,0.25)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.12)"
          : "0 4px 30px rgba(0,0,0,0.35)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.25,1,0.5,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative quote mark */}
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontSize: 72, color: "#2d1b69", fontFamily: "Georgia, serif",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>"</div>

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
        {[...Array(t.stars)].map((_, j) => (
          <span key={j} style={{ color: "#f59e0b", fontSize: 13 }}>★</span>
        ))}
      </div>

      <p style={{
        color: "#94a3b8", lineHeight: 1.75, fontSize: 14,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginBottom: 20, position: "relative", zIndex: 1,
        fontStyle: "italic",
      }}>
        "{t.review}"
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: "50%",
          background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
          boxShadow: "0 0 20px rgba(124,58,237,0.35)",
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: 14, color: "#f1f5f9",
          }}>
            {t.name}
          </div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive]             = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [cursorPos, setCursorPos]       = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover]   = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const skillsRef = useRef(null);
  const typed     = useTyped(TYPED_STRINGS);

  /* Intersection observer for skills animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.2 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  /* Custom cursor */
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Hover detection for cursor enlargement */
  useEffect(() => {
    const over = (e) => {
      if (e.target.closest("button, a, [role='button'], .nav-item")) {
        setCursorHover(true);
      }
    };
    const out = () => setCursorHover(false);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  /* Active section on scroll */
  useEffect(() => {
    const ids = ["home", "skills", "testimonials", "contact"];
    const handleScroll = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 200 && bottom >= 200) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMobileNavOpen(false);
  };

  /* ── RENDER ── */
  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#08061c",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#e2e8f0",
    }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Clash+Display:wght@400;500;600;700&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #08061c; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08061c; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#7c3aed, #4f46e5); border-radius: 4px; }

        .nav-item { transition: all 0.25s ease; cursor: pointer; }
        .nav-item:hover { transform: scale(1.1); }

        .cta-btn { cursor: pointer; border: none; transition: all 0.3s cubic-bezier(0.25,1,0.5,1); }
        .cta-btn:hover { transform: translateY(-3px); filter: brightness(1.12); }

        .section-heading { font-family: 'Bricolage Grotesque', sans-serif; }

        @keyframes float      { 0%,100%{transform:translateY(0)}      50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.5}     100%{transform:scale(1.4);opacity:0} }
        @keyframes blink      { 0%,100%{opacity:1}                    50%{opacity:0} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn    { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes orb-drift  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(.97)} }

        .avatar-img  { animation: float 4.5s ease-in-out infinite; }
        .hero-card   { animation: fadeUp 0.9s ease both; }

        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa 0%, #c4b5fd 30%, #818cf8 55%, #7c3aed 80%, #a78bfa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .glass-card {
          background: linear-gradient(145deg, rgba(30,18,80,0.7), rgba(8,6,28,0.9));
          border: 1px solid rgba(167,139,250,0.1);
          backdrop-filter: blur(12px);
        }

        .stat-num {
          background: linear-gradient(135deg, #a78bfa, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mobile-menu-btn {
          display: none;
          position: fixed; top: 16px; right: 16px;
          z-index: 200; width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border: none; cursor: pointer;
          align-items: center; justify-content: center;
          font-size: 20px; color: #fff;
          box-shadow: 0 4px 20px rgba(124,58,237,.4);
        }

        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .main-wrap { margin-left: 0 !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-btns { flex-direction: column !important; align-items: center !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .stat-row { gap: 24px !important; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 80px 20px 40px !important; }
          .section-pad  { padding: 60px 20px !important; }
        }
      `}</style>

      {/* ── CUSTOM CURSOR ── */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: cursorHover ? 36 : 18,
        height: cursorHover ? 36 : 18,
        borderRadius: "50%",
        background: cursorHover
          ? "rgba(124,58,237,0.18)"
          : "linear-gradient(135deg, #7c3aed, #4f46e5)",
        border: cursorHover ? "2px solid #a78bfa" : "none",
        pointerEvents: "none",
        transform: `translate(${cursorPos.x - (cursorHover ? 18 : 9)}px, ${cursorPos.y - (cursorHover ? 18 : 9)}px)`,
        transition: "width 0.2s, height 0.2s, background 0.2s, border 0.2s, transform 0.08s ease-out",
        zIndex: 9999,
        boxShadow: cursorHover ? "0 0 20px rgba(124,58,237,0.6)" : "0 0 10px rgba(124,58,237,0.45)",
        mixBlendMode: "normal",
      }} />

      {/* ── MOBILE MENU BTN ── */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileNavOpen(v => !v)}
        aria-label="Toggle navigation"
      >
        {mobileNavOpen ? "✕" : "☰"}
      </button>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(8,6,28,0.97)",
          zIndex: 150, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 24,
          animation: "fadeUp 0.3s ease",
        }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: active === item.id
                  ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                  : "transparent",
                border: active === item.id ? "none" : "1px solid rgba(124,58,237,0.3)",
                borderRadius: 14,
                color: "#e2e8f0",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600, fontSize: 16,
                padding: "14px 40px",
                cursor: "pointer",
                minWidth: 200,
                transition: "all 0.2s",
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <nav
        className="sidebar"
        style={{
          position: "fixed", left: 0, top: 0,
          height: "100vh", width: 76,
          background: "linear-gradient(180deg, #120d30 0%, #08061c 100%)",
          borderRight: "1px solid rgba(167,139,250,0.06)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8, zIndex: 100, padding: "24px 0",
        }}
      >
        {/* Logo */}
        <div style={{
          position: "absolute", top: 20,
          width: 42, height: 42, borderRadius: 12,
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 800,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          color: "#fff",
          boxShadow: "0 0 24px rgba(124,58,237,0.5)",
        }}>
          M
        </div>

        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            className="nav-item"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo(item.id)}
            onKeyDown={(e) => e.key === "Enter" && scrollTo(item.id)}
            title={item.label}
            style={{
              width: 46, height: 46, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
              background: active === item.id
                ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                : "rgba(255,255,255,0.02)",
              color: active === item.id ? "#fff" : "#4a3870",
              boxShadow: active === item.id ? "0 0 24px rgba(124,58,237,0.4)" : "none",
              border: active === item.id
                ? "1px solid rgba(124,58,237,0.35)"
                : "1px solid transparent",
              transition: "all 0.25s",
            }}
          >
            {item.icon}
          </div>
        ))}

        {/* Social icons in sidebar */}
        <div style={{
          position: "absolute", bottom: 24,
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          {SOCIAL_LINKS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: s.bg,
                border: `1px solid ${s.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color, fontWeight: 700, fontSize: 13,
                textDecoration: "none",
                transition: "all 0.2s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.boxShadow = `0 0 16px ${s.color}50`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="main-wrap" style={{ marginLeft: 76, flex: 1, overflow: "hidden" }}>

        {/* ════════════════════════════════
            HERO SECTION
        ════════════════════════════════ */}
        <section
          id="home"
          className="hero-section"
          style={{
            minHeight: "100vh",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "80px 48px 60px",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Animated background orbs */}
          <div style={{
            position: "absolute", top: "8%", right: "12%",
            width: 480, height: 480, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "orb-drift 12s ease-in-out infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", left: "4%",
            width: 340, height: 340, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "orb-drift 16s ease-in-out infinite reverse",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "45%", left: "30%",
            width: 220, height: 220, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,181,253,0.1) 0%, transparent 70%)",
            filter: "blur(50px)", pointerEvents: "none",
          }} />

          {/* Hero card */}
          <div className="hero-card" style={{
            textAlign: "center", position: "relative", zIndex: 1,
            maxWidth: 680,
          }}>

            {/* Availability badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: 50, padding: "6px 18px",
              marginBottom: 28,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
                display: "inline-block",
                animation: "pulse-ring 2s ease-out infinite",
              }} />
              <span style={{
                fontSize: 12, color: "#10b981", letterSpacing: 2,
                textTransform: "uppercase",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}>
                Available for Work
              </span>
            </div>

            {/* Avatar */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
              <div style={{
                position: "absolute", inset: -10, borderRadius: "50%",
                animation: "pulse-ring 2.8s ease-out infinite",
                background: "rgba(124,58,237,0.25)",
              }} />
              <div style={{
                position: "absolute", inset: -5, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5, #a78bfa)",
                padding: 3,
              }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  background: "#08061c",
                }} />
              </div>
              <img
                src={photo1}
                alt="Maryam Akbar — Digital Marketer"
                className="avatar-img"
                style={{
                  position: "relative",
                  width: 128, height: 128, borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid transparent",
                  background: "linear-gradient(#08061c, #08061c) padding-box, linear-gradient(135deg,#7c3aed,#4f46e5) border-box",
                  boxShadow: "0 0 60px rgba(124,58,237,0.55)",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)",
              fontWeight: 800, lineHeight: 1.08, marginBottom: 14,
            }}>
              Hi, I'm{" "}
              <span className="shimmer-text">Maryam</span>
            </h1>

            {/* Typed role */}
            <div style={{
              fontSize: "clamp(1.05rem, 2.6vw, 1.45rem)",
              color: "#64748b", marginBottom: 20,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              height: 36, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6,
            }}>
              I'm a{" "}
              <span style={{ color: "#c4b5fd", fontWeight: 700 }}>{typed}</span>
              <span style={{ color: "#7c3aed", animation: "blink 1s step-end infinite" }}>|</span>
            </div>

            {/* Sub-text */}
            <p style={{
              color: "#475569", maxWidth: 500, margin: "0 auto 40px",
              lineHeight: 1.8, fontSize: 15,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              I craft stunning digital experiences and drive measurable growth through
              strategic marketing, bold design, and results-oriented development.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-btns"
              style={{
                display: "flex", gap: 16, justifyContent: "center",
                flexWrap: "wrap", marginBottom: 56,
              }}
            >
              <a
                href="https://web.facebook.com/profile.php?id=61565861498211"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="cta-btn"
                  style={{
                    padding: "14px 34px", borderRadius: 50,
                    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: 0.3,
                    boxShadow: "0 6px 32px rgba(124,58,237,0.48)",
                  }}
                >
                  View My Work ✦
                </button>
              </a>

              <a
                href="https://wa.me/923144656596?text=Hello%20I%20want%20to%20work%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="cta-btn"
                  style={{
                    padding: "13px 34px", borderRadius: 50,
                    background: "transparent",
                    border: "1.5px solid rgba(124,58,237,0.45)",
                    color: "#94a3b8", fontWeight: 600, fontSize: 14,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Let's Talk 💬
                </button>
              </a>
            </div>

            {/* Stats */}
            <div
              className="stat-row"
              style={{
                display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap",
                paddingTop: 40,
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                ["3+",  "Years Exp."],
                ["50+", "Projects Done"],
                ["30+", "Happy Clients"],
                ["99%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div className="stat-num" style={{
                    fontSize: 30, fontWeight: 800,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    lineHeight: 1,
                  }}>
                    {n}
                  </div>
                  <div style={{
                    fontSize: 11, color: "#334155",
                    textTransform: "uppercase", letterSpacing: 1.8,
                    marginTop: 4,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            SKILLS SECTION
        ════════════════════════════════ */}
        <section
          id="skills"
          ref={skillsRef}
          className="section-pad"
          style={{
            padding: "100px 48px",
            background: "linear-gradient(180deg, #08061c 0%, #0d0a24 50%, #08061c 100%)",
            position: "relative",
          }}
        >
          {/* Decorative line */}
          <div style={{
            position: "absolute", top: 0, left: 76, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
          }} />

          <div style={{
            maxWidth: 980, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64, alignItems: "center",
          }}
            className="skills-grid"
          >
            {/* Left — Orbit visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: 280, height: 280 }}>
                {/* Rings */}
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    position: "absolute",
                    inset: i * 22,
                    borderRadius: "50%",
                    border: `1px solid rgba(124,58,237,${0.15 - i * 0.04})`,
                  }} />
                ))}
                {/* Orbiting icons */}
                {[img1, img2, img3, img4].map((e, i) => {
                  const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
                  const r = 108;
                  const x = 140 + r * Math.cos(angle);
                  const y = 140 + r * Math.sin(angle);
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: x - 26, top: y - 26,
                        width: 52, height: 52, borderRadius: 14,
                        background: "rgba(30,18,80,0.85)",
                        border: "1px solid rgba(124,58,237,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                      }}
                    >
                      <img
                        src={e}
                        alt="skill icon"
                        style={{
                          width: 34, height: 34,
                          borderRadius: 8, objectFit: "cover",
                          mixBlendMode: "screen",
                        }}
                      />
                    </div>
                  );
                })}
                {/* Center badge */}
                <div style={{
                  position: "absolute", left: "50%", top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 84, height: 84, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 34,
                  boxShadow: "0 0 60px rgba(124,58,237,0.6)",
                  animation: "float 4s ease-in-out infinite",
                }}>
                  📣
                </div>
              </div>
            </div>

            {/* Right — Skill bars */}
            <div>
              <p style={{
                fontSize: 11, color: "#a78bfa", letterSpacing: 3.5,
                textTransform: "uppercase", marginBottom: 10,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              }}>
                Expertise
              </p>
              <h2
                className="section-heading"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(1.9rem,4vw,2.9rem)",
                  fontWeight: 800, marginBottom: 12, lineHeight: 1.1,
                }}
              >
                My{" "}
                <span style={{
                  background: "linear-gradient(90deg,#a78bfa,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Skills
                </span>
              </h2>
              <p style={{
                color: "#334155", marginBottom: 36,
                lineHeight: 1.75, fontSize: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                Passionate digital marketer and creative professional with expertise
                in growth strategy, compelling design, and full-stack web development.
              </p>
              {SKILLS.map(s => (
                <SkillBar key={s.name} skill={s} animate={skillsVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            TESTIMONIALS SECTION
        ════════════════════════════════ */}
        <section
          id="testimonials"
          className="section-pad"
          style={{
            padding: "100px 48px",
            background: "linear-gradient(180deg, #08061c 0%, #0d0a24 50%, #08061c 100%)",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{
                fontSize: 11, color: "#f59e0b", letterSpacing: 3.5,
                textTransform: "uppercase", marginBottom: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              }}>
                Client Reviews
              </p>
              <h2
                className="section-heading"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(1.9rem,4vw,2.9rem)",
                  fontWeight: 800,
                }}
              >
                What{" "}
                <span style={{
                  background: "linear-gradient(90deg, #f59e0b, #fb923c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Clients Say
                </span>
              </h2>
              <p style={{
                color: "#334155", marginTop: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
              }}>
                Real results from real clients — here's what they experienced.
              </p>

              {/* Stars summary */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: 20,
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
                borderRadius: 50, padding: "8px 20px",
              }}>
                <span style={{ fontSize: 14 }}>★★★★★</span>
                <span style={{
                  fontSize: 13, color: "#fbbf24", fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  5.0 · {TESTIMONIALS.length} Reviews
                </span>
              </div>
            </div>

            {/* Grid */}
            <div
              className="reviews-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: 24,
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            CONTACT SECTION
        ════════════════════════════════ */}
        <section
          id="contact"
          className="section-pad"
          style={{
            padding: "100px 48px",
            background: "linear-gradient(180deg, #08061c, #0d0a24)",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Decorative top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
          }} />

          <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 11, color: "#a78bfa", letterSpacing: 3.5,
              textTransform: "uppercase", marginBottom: 12,
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
            }}>
              Get In Touch
            </p>
            <h2
              className="section-heading"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(1.9rem,4vw,2.9rem)",
                fontWeight: 800, marginBottom: 16,
              }}
            >
              Let's{" "}
              <span style={{
                background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Work Together
              </span>
            </h2>
            <p style={{
              color: "#334155", marginBottom: 44,
              lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15,
            }}>
              Currently available for freelance projects. Have an idea or a brief?
              I'd love to hear about it!
            </p>

            {/* Form fields */}
            <div style={{ display: "grid", gap: 14, marginBottom: 14 }}>
              {[
                { label: "Name",  ph: "Your name",       type: "text"  },
                { label: "Email", ph: "your@email.com",  type: "email" },
              ].map(f => (
                <input
                  key={f.label}
                  type={f.type}
                  placeholder={f.ph}
                  aria-label={f.label}
                  style={{
                    width: "100%", padding: "15px 22px", borderRadius: 14,
                    background: "rgba(30,18,80,0.5)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    color: "#e2e8f0", fontSize: 14, outline: "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "rgba(124,58,237,0.6)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(124,58,237,0.25)"; }}
                />
              ))}
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                aria-label="Message"
                style={{
                  width: "100%", padding: "15px 22px", borderRadius: 14,
                  background: "rgba(30,18,80,0.5)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  color: "#e2e8f0", fontSize: 14, outline: "none",
                  resize: "vertical", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(124,58,237,0.6)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(124,58,237,0.25)"; }}
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/923144656596?text=Hello%20I%20want%20to%20work%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block" }}
            >
              <button
                className="cta-btn"
                style={{
                  width: "100%", padding: "16px",
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: 0.3,
                  boxShadow: "0 6px 36px rgba(124,58,237,0.45)",
                  marginBottom: 14,
                }}
              >
                Send Message via WhatsApp ✉️
              </button>
            </a>

            {/* Social links bar */}
            <div style={{
              display: "flex", gap: 16,
              justifyContent: "center", marginTop: 40, flexWrap: "wrap",
            }}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 50,
                    background: s.bg,
                    border: `1px solid ${s.color}30`,
                    color: s.color, textDecoration: "none",
                    fontSize: 13, fontWeight: 600,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}30`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: `${s.color}20`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800, fontSize: 12,
                  }}>
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: "center", padding: "24px 48px",
          color: "#2d1b69", fontSize: 12,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          borderTop: "1px solid rgba(124,58,237,0.08)",
          background: "#05041a",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, flexWrap: "wrap",
        }}>
          <span>© 2026 Maryam Akbar</span>
          <span style={{ color: "#1a1040" }}>·</span>
          <span>Digital Marketer & Creative Professional</span>
          <span style={{ color: "#1a1040" }}>·</span>
          <span>Designed & Built with ❤️</span>
        </footer>
      </div>
    </div>
  );
}
