import { useState, useEffect, useRef } from "react";
import photo1 from "./photo1.jpg";

/* ─────────────────────────────────────────────
   DATA  (unchanged)
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home",         icon: "⌂",  label: "Home"    },
  { id: "skills",       icon: "◈",  label: "Skills"  },
  { id: "testimonials", icon: "💬", label: "Reviews" },
  { id: "contact",      icon: "✉",  label: "Contact" },
];

const SKILLS = [
  { name: "Digital Marketing",    icon: "📣", pct: 92, color: "#00d4ff" },
  { name: "Graphic Designing",    icon: "🎨", pct: 88, color: "#0099ff" },
  { name: "UX / UI Design",       icon: "📱", pct: 83, color: "#00aaff" },
  { name: "SEO & Growth Strategy",icon: "🚀", pct: 90, color: "#0077ff" },
  { name: "Content Creation",     icon: "✍️", pct: 87, color: "#00ccff" },
  { name: "Web Development",      icon: "🌐", pct: 80, color: "#0055ff" },
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
    color: "#00aaff",
    bg: "rgba(0,170,255,0.08)",
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61565861498211",
    icon: "f",
    color: "#0099ff",
    bg: "rgba(0,153,255,0.08)",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/",
    icon: "P",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.08)",
  },
];

const CAROUSEL_ITEMS = [
  {
    title: "Manar Realestate",
    subtitle: "Luxury UI/UX Design",
    icon: "🏛️",
    color: "#00d4ff",
    href: "https://web.facebook.com/profile.php?id=61565861498211",
  },
  {
    title: "Cybersecurity Quiz",
    subtitle: "Security Logic App",
    icon: "🔐",
    color: "#0077ff",
    href: "https://manoak786-coder.github.io/cyberapp/",
  },
  {
    title: "Brand Strategy",
    subtitle: "Marketing Campaign",
    icon: "📣",
    color: "#00aaff",
    href: "https://web.facebook.com/profile.php?id=61565861498211",
  },
  {
    title: "Growth Analytics",
    subtitle: "SEO & Performance",
    icon: "🚀",
    color: "#0055ff",
    href: "https://web.facebook.com/profile.php?id=61565861498211",
  },
  {
    title: "Creative Content",
    subtitle: "Visual Storytelling",
    icon: "🎨",
    color: "#00ccff",
    href: "https://web.facebook.com/profile.php?id=61565861498211",
  },
];

/* ─────────────────────────────────────────────
   HOOKS  (unchanged)
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
   ELECTRIC BORDER WRAPPER
───────────────────────────────────────────── */
function ElectricCard({ children, style = {}, className = "" }) {
  return (
    <div className={`electric-card ${className}`} style={{ position: "relative", ...style }}>
      <div className="electric-border-anim" />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3D CAROUSEL
───────────────────────────────────────────── */
function Carousel3D() {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const rafRef = useRef(null);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const angleRef = useRef(0);
  const velRef = useRef(0);

  const count = CAROUSEL_ITEMS.length;
  const theta = 360 / count;

  // Auto-spin
  useEffect(() => {
    if (isDragging) return;
    const spin = () => {
      velRef.current *= 0.96;
      if (Math.abs(velRef.current) < 0.03) velRef.current = 0.25;
      angleRef.current += velRef.current;
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(spin);
    };
    rafRef.current = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    const dx = e.clientX - lastX.current;
    if (dt > 0) velRef.current = dx / dt * 10;
    lastX.current = e.clientX;
    lastTime.current = now;
    angleRef.current += dx * 0.3;
    setAngle(angleRef.current);
  };

  const handleMouseUp = () => setIsDragging(false);

  const radius = 260;

  return (
    <div
      style={{
        width: "100%", height: 420,
        perspective: 1200,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{
        position: "relative",
        width: 200, height: 260,
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg)`,
        transition: isDragging ? "none" : "transform 0.05s linear",
      }}>
        {CAROUSEL_ITEMS.map((item, i) => {
          const itemAngle = theta * i;
          return (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                width: 200, height: 260,
                left: 0, top: 0,
                transformStyle: "preserve-3d",
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                textDecoration: "none",
              }}
            >
              <div style={{
                width: "100%", height: "100%",
                borderRadius: 20,
                background: "linear-gradient(145deg, rgba(0,10,30,0.95), rgba(0,5,20,0.98))",
                border: `1px solid ${item.color}55`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 16,
                boxShadow: `0 0 30px ${item.color}40, 0 0 60px ${item.color}20, inset 0 0 30px ${item.color}08`,
                backdropFilter: "blur(12px)",
                transition: "box-shadow 0.3s",
                position: "relative", overflow: "hidden",
              }}>
                {/* Glow top bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  boxShadow: `0 0 12px ${item.color}`,
                }} />
                {/* Corner accents */}
                <div style={{
                  position: "absolute", top: 8, left: 8,
                  width: 14, height: 14,
                  borderTop: `2px solid ${item.color}`,
                  borderLeft: `2px solid ${item.color}`,
                  borderRadius: "2px 0 0 0",
                }} />
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  width: 14, height: 14,
                  borderTop: `2px solid ${item.color}`,
                  borderRight: `2px solid ${item.color}`,
                  borderRadius: "0 2px 0 0",
                }} />
                <div style={{
                  position: "absolute", bottom: 8, left: 8,
                  width: 14, height: 14,
                  borderBottom: `2px solid ${item.color}`,
                  borderLeft: `2px solid ${item.color}`,
                  borderRadius: "0 0 0 2px",
                }} />
                <div style={{
                  position: "absolute", bottom: 8, right: 8,
                  width: 14, height: 14,
                  borderBottom: `2px solid ${item.color}`,
                  borderRight: `2px solid ${item.color}`,
                  borderRadius: "0 0 2px 0",
                }} />

                {/* Icon */}
                <div style={{
                  width: 72, height: 72, borderRadius: 16,
                  background: `radial-gradient(circle at 30% 30%, ${item.color}25, transparent 70%)`,
                  border: `1px solid ${item.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32,
                  boxShadow: `0 0 24px ${item.color}50`,
                }}>
                  {item.icon}
                </div>

                <div style={{ textAlign: "center", padding: "0 16px" }}>
                  <div style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: 13, fontWeight: 700,
                    color: "#fff", marginBottom: 6,
                    letterSpacing: 1,
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: 11, color: item.color,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    textShadow: `0 0 8px ${item.color}80`,
                  }}>{item.subtitle}</div>
                </div>

                {/* Bottom glow */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  opacity: 0.5,
                }} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKILL BAR
───────────────────────────────────────────── */
function SkillBar({ skill, animate }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
        <span style={{
          display: "flex", alignItems: "center", gap: 10,
          color: "#e8f4ff", fontSize: 14,
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${skill.color}12`,
            border: `1px solid ${skill.color}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15,
            boxShadow: `0 0 12px ${skill.color}35`,
          }}>
            {skill.icon}
          </span>
          {skill.name}
        </span>
        <span style={{
          color: skill.color, fontWeight: 700, fontSize: 13,
          fontFamily: "'Orbitron', monospace",
          background: `${skill.color}10`,
          padding: "2px 10px", borderRadius: 50,
          border: `1px solid ${skill.color}40`,
          textShadow: `0 0 10px ${skill.color}80`,
        }}>
          {skill.pct}%
        </span>
      </div>
      <div style={{
        background: "rgba(0,100,200,0.06)",
        borderRadius: 50, height: 7, overflow: "hidden",
        border: "1px solid rgba(0,100,255,0.1)",
      }}>
        <div style={{
          height: "100%", borderRadius: 50,
          background: `linear-gradient(90deg, ${skill.color}55, ${skill.color})`,
          width: animate ? `${skill.pct}%` : "0%",
          transition: "width 1.6s cubic-bezier(0.25,1,0.5,1)",
          boxShadow: `0 0 18px ${skill.color}95`,
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────── */
function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(145deg, rgba(0,20,50,0.95), rgba(0,10,30,0.98))"
          : "linear-gradient(145deg, rgba(0,10,30,0.9), rgba(0,5,18,0.98))",
        borderRadius: 20,
        padding: "28px",
        border: hovered
          ? "1px solid rgba(0,170,255,0.5)"
          : "1px solid rgba(0,100,255,0.12)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(0,150,255,0.2), inset 0 0 0 1px rgba(0,170,255,0.06)"
          : "0 4px 30px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.25,1,0.5,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Electric top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: hovered
          ? "linear-gradient(90deg, transparent, #00aaff, #00d4ff, transparent)"
          : "linear-gradient(90deg, transparent, rgba(0,100,255,0.3), transparent)",
        transition: "all 0.35s",
        boxShadow: hovered ? "0 0 12px rgba(0,170,255,0.8)" : "none",
      }} />

      {/* Quote mark */}
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontSize: 72, color: "rgba(0,120,255,0.08)", fontFamily: "Georgia, serif",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
      }}>"</div>

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
        {[...Array(t.stars)].map((_, j) => (
          <span key={j} style={{
            color: "#00d4ff", fontSize: 13,
            textShadow: "0 0 8px rgba(0,212,255,0.9)",
          }}>★</span>
        ))}
      </div>

      <p style={{
        color: "#88aabb", lineHeight: 1.75, fontSize: 14,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginBottom: 20, position: "relative", zIndex: 1,
        fontStyle: "italic",
      }}>
        "{t.review}"
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: "50%",
          background: "linear-gradient(135deg, #001a4d, #0044aa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
          boxShadow: "0 0 20px rgba(0,170,255,0.5)",
          border: "1px solid rgba(0,170,255,0.3)",
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 700, fontSize: 13, color: "#e8f4ff",
            letterSpacing: 0.5,
          }}>
            {t.name}
          </div>
          <div style={{ fontSize: 11, color: "#00aaff", marginTop: 2, letterSpacing: 0.5 }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LIQUID NAV ITEM
───────────────────────────────────────────── */
function LiquidNavItem({ item, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="nav-item"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={item.label}
      style={{
        width: 50, height: 50, borderRadius: isActive ? 16 : 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
        background: isActive
          ? "linear-gradient(135deg, #003399, #0066cc)"
          : hovered
          ? "rgba(0,100,255,0.08)"
          : "rgba(255,255,255,0.02)",
        color: isActive ? "#fff" : hovered ? "#00aaff" : "#334466",
        boxShadow: isActive
          ? "0 0 28px rgba(0,100,255,0.7), 0 0 56px rgba(0,170,255,0.25), 0 8px 24px rgba(0,0,0,0.5)"
          : "none",
        border: isActive
          ? "1px solid rgba(0,170,255,0.5)"
          : hovered
          ? "1px solid rgba(0,100,255,0.3)"
          : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isActive ? "scale(1.1)" : hovered ? "scale(1.05)" : "scale(1)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {isActive && (
        <div style={{
          position: "absolute", inset: -2, borderRadius: 18,
          background: "transparent",
          border: "1px solid rgba(0,200,255,0.3)",
          animation: "liquid-ring 2s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}
      {item.icon}
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
  const [trailPos, setTrailPos]         = useState({ x: -100, y: -100 });
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

  /* Custom cursor — main dot */
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Cursor trail with lag */
  useEffect(() => {
    let animId;
    let tx = -100, ty = -100;
    const follow = () => {
      setCursorPos(pos => {
        tx += (pos.x - tx) * 0.12;
        ty += (pos.y - ty) * 0.12;
        setTrailPos({ x: tx, y: ty });
        return pos;
      });
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, []);

  /* Hover detection */
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
      background: "#000005",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#e8f4ff",
      cursor: "none",
    }}>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap');

        :root {
          --black:        #000005;
          --black-2:      #00050f;
          --white:        #ffffff;
          --blue-bright:  #00d4ff;
          --blue-mid:     #0099ff;
          --blue-dark:    #0044cc;
          --blue-deep:    #001a4d;
          --electric:     #00aaff;
          --glow-sm:      0 0 12px rgba(0,170,255,0.5);
          --glow-md:      0 0 28px rgba(0,170,255,0.6), 0 0 56px rgba(0,100,255,0.25);
          --glow-lg:      0 0 50px rgba(0,170,255,0.7), 0 0 100px rgba(0,100,255,0.3);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000005; cursor: none; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000005; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(#003399, #0099ff);
          border-radius: 4px;
          box-shadow: 0 0 8px rgba(0,153,255,0.6);
        }

        .nav-item { cursor: none; }
        .cta-btn { cursor: none; border: none; transition: all 0.3s cubic-bezier(0.25,1,0.5,1); }
        .cta-btn:hover { transform: translateY(-3px) scale(1.02); filter: brightness(1.15); }

        .section-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          color: #e8f4ff;
        }

        /* ── Electric Card ── */
        .electric-card {
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(0,10,30,0.9), rgba(0,5,20,0.98));
          border: 1px solid rgba(0,100,255,0.15);
          overflow: hidden;
        }

        .electric-border-anim {
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: conic-gradient(
            from var(--border-angle, 0deg),
            transparent 0deg,
            transparent 120deg,
            #00aaff 180deg,
            #00d4ff 200deg,
            #0055ff 220deg,
            transparent 280deg,
            transparent 360deg
          );
          animation: border-spin 3s linear infinite;
          z-index: 0;
          pointer-events: none;
        }

        .electric-border-anim::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(0,10,30,0.95), rgba(0,5,20,0.99));
        }

        /* ── Keyframes ── */
        @keyframes float      { 0%,100%{transform:translateY(0)}      50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6}     100%{transform:scale(1.5);opacity:0} }
        @keyframes blink      { 0%,100%{opacity:1}                    50%{opacity:0} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn    { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes orb-drift  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(.97)} }
        @keyframes border-spin { to { --border-angle: 360deg; } }

        @keyframes electric-glow {
          0%,100% { box-shadow: 0 0 20px rgba(0,150,255,0.5), 0 0 40px rgba(0,100,255,0.2); }
          50%     { box-shadow: 0 0 35px rgba(0,200,255,0.8), 0 0 70px rgba(0,150,255,0.4); }
        }
        @keyframes text-electric {
          0%,100% { text-shadow: 0 0 12px rgba(0,180,255,0.6), 0 0 28px rgba(0,100,255,0.3); }
          50%     { text-shadow: 0 0 24px rgba(0,220,255,0.9), 0 0 50px rgba(0,170,255,0.6); }
        }

        @keyframes scanline {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.04; }
          90%  { opacity: 0.04; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes liquid-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          50%  { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        @keyframes shimmer-blue {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes ring-pulse {
          0%   { transform: scale(1); opacity: 0.8; }
          50%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }

        @keyframes badge-pulse-rotate {
          0%   { transform: translate(-50%, -50%) scale(1) rotateZ(0deg); box-shadow: 0 0 60px rgba(0,100,255,0.9), 0 0 120px rgba(0,170,255,0.5), inset 0 0 40px rgba(0,200,255,0.2); }
          25%  { transform: translate(-50%, -50%) scale(1.08) rotateZ(4deg); }
          50%  { transform: translate(-50%, -50%) scale(1.12) rotateZ(0deg); box-shadow: 0 0 80px rgba(0,150,255,1), 0 0 160px rgba(0,200,255,0.7), inset 0 0 60px rgba(0,220,255,0.3); }
          75%  { transform: translate(-50%, -50%) scale(1.08) rotateZ(-4deg); }
          100% { transform: translate(-50%, -50%) scale(1) rotateZ(0deg); box-shadow: 0 0 60px rgba(0,100,255,0.9), 0 0 120px rgba(0,170,255,0.5), inset 0 0 40px rgba(0,200,255,0.2); }
        }

        .shimmer-text {
          background: linear-gradient(90deg,
            #0099ff 0%,
            #ffffff 20%,
            #00d4ff 45%,
            #ffffff 65%,
            #0055ff 85%,
            #00aaff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-blue 3.5s linear infinite;
        }

        .stat-num {
          background: linear-gradient(135deg, #00aaff, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-electric 3s ease-in-out infinite;
        }

        .avatar-img  { animation: float 4.5s ease-in-out infinite; }
        .hero-card   { animation: fadeUp 0.9s ease both; }

        /* Scanline */
        .scanline-overlay {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,100,255,0.012) 3px, rgba(0,100,255,0.012) 4px
          );
          pointer-events: none; z-index: 0;
        }

        /* Mobile nav button */
        .mobile-menu-btn {
          display: none;
          position: fixed; top: 16px; right: 16px;
          z-index: 200; width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #003399, #0066cc);
          border: 1px solid rgba(0,170,255,0.4);
          cursor: none;
          align-items: center; justify-content: center;
          font-size: 20px; color: #fff;
          box-shadow: 0 4px 20px rgba(0,100,255,0.55), 0 0 28px rgba(0,150,255,0.3);
          animation: electric-glow 3s ease-in-out infinite;
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

        /* @property for conic gradient animation */
        @property --border-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
      `}</style>

      {/* ── CUSTOM CURSOR — Blue Trail System ── */}
      {/* Trail (lagging ring) */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: cursorHover ? 44 : 28,
        height: cursorHover ? 44 : 28,
        borderRadius: "50%",
        border: `1.5px solid ${cursorHover ? "#00d4ff" : "rgba(0,170,255,0.5)"}`,
        pointerEvents: "none",
        transform: `translate(${trailPos.x - (cursorHover ? 22 : 14)}px, ${trailPos.y - (cursorHover ? 22 : 14)}px)`,
        transition: "width 0.3s, height 0.3s, border-color 0.3s",
        zIndex: 9998,
        boxShadow: cursorHover
          ? "0 0 16px rgba(0,212,255,0.7), 0 0 32px rgba(0,170,255,0.4)"
          : "0 0 8px rgba(0,170,255,0.3)",
        background: cursorHover ? "rgba(0,170,255,0.06)" : "transparent",
      }} />
      {/* Core dot */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: cursorHover ? 10 : 8,
        height: cursorHover ? 10 : 8,
        borderRadius: "50%",
        background: cursorHover
          ? "radial-gradient(circle, #ffffff, #00d4ff)"
          : "radial-gradient(circle, #00aaff, #0055ff)",
        pointerEvents: "none",
        transform: `translate(${cursorPos.x - (cursorHover ? 5 : 4)}px, ${cursorPos.y - (cursorHover ? 5 : 4)}px)`,
        transition: "width 0.15s, height 0.15s, transform 0.04s linear",
        zIndex: 9999,
        boxShadow: cursorHover
          ? "0 0 20px rgba(0,212,255,0.9), 0 0 40px rgba(0,150,255,0.5)"
          : "0 0 12px rgba(0,170,255,0.8)",
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
          position: "fixed", inset: 0,
          background: "rgba(0,0,10,0.97)",
          backdropFilter: "blur(20px)",
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
                  ? "linear-gradient(135deg, #003399, #0066cc)"
                  : "transparent",
                border: active === item.id
                  ? "1px solid rgba(0,170,255,0.5)"
                  : "1px solid rgba(0,100,255,0.25)",
                borderRadius: 14,
                color: active === item.id ? "#fff" : "#00aaff",
                fontFamily: "'Orbitron', monospace",
                fontWeight: 600, fontSize: 14,
                padding: "14px 40px",
                cursor: "none",
                minWidth: 200,
                transition: "all 0.2s",
                letterSpacing: 1,
                boxShadow: active === item.id
                  ? "0 0 28px rgba(0,100,255,0.6)"
                  : "none",
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ── SIDEBAR — Liquid Animated Nav ── */}
      <nav
        className="sidebar"
        style={{
          position: "fixed", left: 0, top: 0,
          height: "100vh", width: 76,
          background: "linear-gradient(180deg, rgba(0,5,20,0.98) 0%, rgba(0,0,10,0.99) 100%)",
          borderRight: "1px solid rgba(0,100,255,0.08)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8, zIndex: 100, padding: "24px 0",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Electric right-edge line */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 1,
          background: "linear-gradient(180deg, transparent, rgba(0,170,255,0.4) 30%, rgba(0,212,255,0.5) 50%, rgba(0,170,255,0.4) 70%, transparent)",
          boxShadow: "0 0 8px rgba(0,170,255,0.3)",
        }} />

        {/* Logo badge — MA with electric pulse */}
        <div style={{
          position: "absolute", top: 20,
          width: 44, height: 44, borderRadius: 13,
          background: "linear-gradient(135deg, #002266, #0055cc)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Orbitron', monospace",
          fontSize: 16, fontWeight: 900,
          color: "#fff",
          boxShadow: "0 0 24px rgba(0,100,255,0.7), 0 0 48px rgba(0,170,255,0.3)",
          animation: "electric-glow 3s ease-in-out infinite",
          border: "1px solid rgba(0,170,255,0.4)",
        }}>
          M
        </div>

        {/* Nav items with liquid animation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
          {/* Active indicator pill */}
          <div style={{
            position: "absolute",
            right: -4, width: 3, height: 50,
            borderRadius: 2,
            background: "linear-gradient(180deg, #0055ff, #00d4ff)",
            boxShadow: "0 0 12px rgba(0,170,255,0.9)",
            transition: "top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            top: NAV_ITEMS.findIndex(i => i.id === active) * 58,
          }} />

          {NAV_ITEMS.map(item => (
            <LiquidNavItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => scrollTo(item.id)}
            />
          ))}
        </div>

        {/* Social icons */}
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
                fontFamily: "'Orbitron', monospace",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.boxShadow = `0 0 18px ${s.color}70`;
                e.currentTarget.style.borderColor = `${s.color}60`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = `${s.color}30`;
              }}
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
            background: "var(--black)",
          }}
        >

          <div style={{
            position: "absolute", top: "8%", right: "12%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,100,255,0.2) 0%, rgba(0,50,200,0.08) 40%, transparent 70%)",
            filter: "blur(80px)",
            animation: "orb-drift 12s ease-in-out infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", left: "4%",
            width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,170,255,0.18) 0%, rgba(0,100,255,0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
            animation: "orb-drift 16s ease-in-out infinite reverse",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "45%", left: "30%",
            width: 240, height: 240, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
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
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.3)",
              borderRadius: 50, padding: "6px 18px",
              marginBottom: 28,
              boxShadow: "0 0 16px rgba(0,212,255,0.12)",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#00d4ff",
                boxShadow: "0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.6)",
                display: "inline-block",
                animation: "pulse-ring 2s ease-out infinite",
              }} />
              <span style={{
                fontSize: 11, color: "#00d4ff", letterSpacing: 2.5,
                textTransform: "uppercase",
                fontFamily: "'Orbitron', monospace",
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
                background: "rgba(0,100,255,0.18)",
              }} />
              <div style={{
                position: "absolute", inset: -5, borderRadius: "50%",
                background: "linear-gradient(135deg, #003399, #0099ff, #00d4ff)",
                padding: 3,
                boxShadow: "0 0 40px rgba(0,100,255,0.6), 0 0 80px rgba(0,170,255,0.3)",
                animation: "electric-glow 3s ease-in-out infinite",
              }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  background: "#000005",
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
                  background: "linear-gradient(#000005, #000005) padding-box, linear-gradient(135deg,#003399,#00aaff) border-box",
                  boxShadow: "0 0 60px rgba(0,100,255,0.7), 0 0 100px rgba(0,170,255,0.3)",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Heading */}
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)",
              fontWeight: 800, lineHeight: 1.08, marginBottom: 14,
              color: "#e8f4ff",
            }}>
              Hi, I'm{" "}
              <span className="shimmer-text">Maryam</span>
            </h1>

            {/* Typed role */}
            <div style={{
              fontSize: "clamp(1.05rem, 2.6vw, 1.45rem)",
              color: "#334466", marginBottom: 20,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              height: 36, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6,
            }}>
              I'm a{" "}
              <span style={{
                color: "#00aaff", fontWeight: 700,
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
                textShadow: "0 0 14px rgba(0,170,255,0.8)",
              }}>{typed}</span>
              <span style={{
                color: "#00d4ff",
                animation: "blink 1s step-end infinite",
                textShadow: "0 0 12px rgba(0,212,255,0.9)",
              }}>|</span>
            </div>

            {/* Sub-text */}
            <p style={{
              color: "#445566", maxWidth: 500, margin: "0 auto 40px",
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
                    background: "linear-gradient(135deg, #002299 0%, #0066cc 100%)",
                    color: "#fff", fontWeight: 700, fontSize: 13,
                    fontFamily: "'Orbitron', monospace",
                    letterSpacing: 1,
                    boxShadow: "0 6px 32px rgba(0,100,255,0.6), 0 0 0 1px rgba(0,170,255,0.25), 0 0 50px rgba(0,100,255,0.2)",
                    border: "1px solid rgba(0,170,255,0.3)",
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
                    border: "1.5px solid rgba(0,170,255,0.5)",
                    color: "#00aaff", fontWeight: 600, fontSize: 13,
                    fontFamily: "'Orbitron', monospace",
                    letterSpacing: 1,
                    boxShadow: "0 0 20px rgba(0,170,255,0.15), inset 0 0 20px rgba(0,170,255,0.05)",
                    textShadow: "0 0 10px rgba(0,170,255,0.5)",
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
                borderTop: "1px solid rgba(0,100,255,0.1)",
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
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "clamp(1.6rem,3vw,2.2rem)",
                    fontWeight: 900, lineHeight: 1,
                  }}>{n}</div>
                  <div style={{
                    fontSize: 11, color: "#334466", marginTop: 6,
                    fontFamily: "'Orbitron', monospace",
                    letterSpacing: 1.5, textTransform: "uppercase",
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            FEATURED WORK — My Projects
        ════════════════════════════════ */}
        <section
          id="portfolio"
          className="section-pad"
          style={{
            padding: "100px 48px",
            background: "linear-gradient(180deg, #000005 0%, #000510 50%, #000005 100%)",
            position: "relative",
          }}
        >
          {/* Top divider */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.4), rgba(0,212,255,0.5), transparent)",
            boxShadow: "0 0 8px rgba(0,170,255,0.3)",
          }} />

          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{
                fontSize: 10, color: "#00aaff", letterSpacing: 4,
                textTransform: "uppercase", marginBottom: 12,
                fontFamily: "'Orbitron', monospace", fontWeight: 600,
                textShadow: "0 0 14px rgba(0,170,255,0.6)",
              }}>
                Featured Work
              </p>
              <h2
                className="section-heading"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(1.9rem,4vw,2.9rem)",
                  fontWeight: 800,
                }}
              >
                Design{" "}
                <span style={{
                  background: "linear-gradient(90deg, #00aaff, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(0,170,255,0.5))",
                }}>Strategy</span>
                {" "}Security
              </h2>
              <p style={{
                color: "#334466", marginTop: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
              }}>
                Drag to rotate · Click to explore projects
              </p>
            </div>

            <Carousel3D />
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
            background: "#000005",
            position: "relative",
          }}
        >
          {/* Neon decorative top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,100,255,0.4), rgba(0,170,255,0.5), transparent)",
            boxShadow: "0 0 8px rgba(0,100,255,0.3)",
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
                {/* Concentric neon rings */}
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{
                    position: "absolute",
                    inset: i * 18,
                    borderRadius: "50%",
                    border: `1px solid rgba(0,170,255,${0.25 - i * 0.05})`,
                    boxShadow: `0 0 ${18 - i * 3}px rgba(0,170,255,${0.15 - i * 0.03})`,
                    animation: `ring-pulse ${3.5 - i * 0.3}s ease-in-out infinite`,
                  }} />
                ))}
                {/* Center badge with enhanced animation */}
                <div style={{
                  position: "absolute", left: "50%", top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 100, height: 100, borderRadius: "50%",
                  background: "linear-gradient(135deg, #002266, #0066cc)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 44,
                  boxShadow: "0 0 60px rgba(0,100,255,0.9), 0 0 120px rgba(0,170,255,0.5), inset 0 0 40px rgba(0,200,255,0.2)",
                  animation: "badge-pulse-rotate 3.5s ease-in-out infinite",
                  border: "2px solid rgba(0,170,255,0.6)",
                  backdropFilter: "blur(8px)",
                }}>
                  📣
                </div>
              </div>
            </div>

            {/* Right — Skill bars */}
            <div>
              <p style={{
                fontSize: 10, color: "#00aaff", letterSpacing: 4,
                textTransform: "uppercase", marginBottom: 10,
                fontFamily: "'Orbitron', monospace", fontWeight: 600,
                textShadow: "0 0 14px rgba(0,170,255,0.6)",
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
                  background: "linear-gradient(90deg, #00aaff, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(0,170,255,0.5))",
                }}>
                  Skills
                </span>
              </h2>
              <p style={{
                color: "#445566", marginBottom: 36,
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
            background: "linear-gradient(180deg, #000005 0%, #000510 50%, #000005 100%)",
            position: "relative",
          }}
        >
          {/* Top divider */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.4), rgba(0,212,255,0.5), transparent)",
            boxShadow: "0 0 8px rgba(0,170,255,0.3)",
          }} />

          <div style={{ maxWidth: 1080, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{
                fontSize: 10, color: "#00d4ff", letterSpacing: 4,
                textTransform: "uppercase", marginBottom: 12,
                fontFamily: "'Orbitron', monospace", fontWeight: 600,
                textShadow: "0 0 14px rgba(0,212,255,0.7)",
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
                  background: "linear-gradient(90deg, #00aaff, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(0,170,255,0.5))",
                }}>
                  Clients Say
                </span>
              </h2>
              <p style={{
                color: "#445566", marginTop: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
              }}>
                Real results from real clients — here's what they experienced.
              </p>

              {/* Stars summary */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: 20,
                background: "rgba(0,170,255,0.05)",
                border: "1px solid rgba(0,170,255,0.2)",
                borderRadius: 50, padding: "8px 20px",
                boxShadow: "0 0 16px rgba(0,170,255,0.1)",
              }}>
                <span style={{
                  fontSize: 14, color: "#00d4ff",
                  textShadow: "0 0 10px rgba(0,212,255,0.8)",
                }}>★★★★★</span>
                <span style={{
                  fontSize: 12, color: "#00aaff", fontWeight: 600,
                  fontFamily: "'Orbitron', monospace",
                  textShadow: "0 0 8px rgba(0,170,255,0.5)",
                  letterSpacing: 0.5,
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
            background: "linear-gradient(180deg, #000005, #000010)",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Top divider */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.5), rgba(0,212,255,0.6), transparent)",
            boxShadow: "0 0 10px rgba(0,170,255,0.4)",
          }} />

          <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 10, color: "#00aaff", letterSpacing: 4,
              textTransform: "uppercase", marginBottom: 12,
              fontFamily: "'Orbitron', monospace", fontWeight: 600,
              textShadow: "0 0 14px rgba(0,170,255,0.6)",
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
                background: "linear-gradient(90deg, #00aaff, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 10px rgba(0,170,255,0.5))",
              }}>
                Work Together
              </span>
            </h2>
            <p style={{
              color: "#445566", marginBottom: 44,
              lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15,
            }}>
              Currently available for freelance projects. Have an idea or a brief?
              I'd love to hear about it!
            </p>

            {/* Electric card for form */}
            <ElectricCard style={{ padding: "32px", marginBottom: 20 }}>
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
                      width: "100%", padding: "15px 22px", borderRadius: 12,
                      background: "rgba(0,5,20,0.8)",
                      border: "1px solid rgba(0,100,255,0.25)",
                      color: "#e8f4ff", fontSize: 14, outline: "none",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      cursor: "none",
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = "rgba(0,170,255,0.6)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,100,255,0.1), 0 0 20px rgba(0,170,255,0.15)";
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = "rgba(0,100,255,0.25)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                ))}
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  aria-label="Message"
                  style={{
                    width: "100%", padding: "15px 22px", borderRadius: 12,
                    background: "rgba(0,5,20,0.8)",
                    border: "1px solid rgba(0,100,255,0.25)",
                    color: "#e8f4ff", fontSize: 14, outline: "none",
                    resize: "vertical", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    cursor: "none",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(0,170,255,0.6)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,100,255,0.1), 0 0 20px rgba(0,170,255,0.15)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(0,100,255,0.25)";
                    e.target.style.boxShadow = "none";
                  }}
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
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #002299, #0066cc)",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                    fontFamily: "'Orbitron', monospace",
                    letterSpacing: 1,
                    boxShadow: "0 6px 36px rgba(0,100,255,0.55), 0 0 0 1px rgba(0,170,255,0.25), 0 0 60px rgba(0,100,255,0.2)",
                    border: "1px solid rgba(0,170,255,0.3)",
                  }}
                >
                  Send Message via WhatsApp ✉️
                </button>
              </a>
            </ElectricCard>

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
                    fontSize: 12, fontWeight: 600,
                    fontFamily: "'Orbitron', monospace",
                    transition: "all 0.25s",
                    letterSpacing: 0.5,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}40, 0 0 24px ${s.color}25`;
                    e.currentTarget.style.borderColor = `${s.color}60`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = `${s.color}30`;
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: `${s.color}18`,
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
          color: "#00aaff", fontSize: 11,
          fontFamily: "'Orbitron', monospace",
          borderTop: "1px solid rgba(0,100,255,0.08)",
          background: "#000000",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, flexWrap: "wrap",
          letterSpacing: 0.5,
        }}>
          <span>© 2026 Maryam Akbar</span>
          <span style={{ color: "rgba(0,170,255,0.25)", fontSize: 16 }}>·</span>
          <span style={{ color: "rgba(0,170,255,0.5)" }}>Digital Marketer & Creative Professional</span>
          <span style={{ color: "rgba(0,170,255,0.25)", fontSize: 16 }}>·</span>
          <span>Designed & Built with ❤️</span>
        </footer>
      </div>
    </div>
  );
}