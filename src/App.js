import { useState, useEffect, useRef } from "react";
import photo1 from "./photo1.jpg";
import photo2 from "./photo2.png";
import img1 from "./images/2.svg";
import img2 from "./images/3.svg";
import img3 from "./images/4.svg";
import img4 from "./images/5.svg";

const NAV_ITEMS = [
  { id: "home", icon: "⌂", label: "Home" },
  { id: "skills", icon: "◈", label: "Skills" },
  { id: "testimonials", icon: "💬", label: "Reviews" },
  { id: "contact", icon: "✉", label: "Contact" },
];

const SKILLS = [
  { name: "Website Development", icon: "🌐", pct: 90, color: "#61dafb" },
  { name: "Graphic Designing", icon: "🎨", pct: 85, color: "#86efac" },
  { name: "UX Design", icon: "📱", pct: 80, color: "#f59e0b" },
  { name: "Growth Marketing", icon: "🚀", pct: 88, color: "#10b981" },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Khan",
    role: "CEO, TechStart Pakistan",
    review:
      "Maryam's digital marketing strategies boosted our online presence by 300%. Her creative content and targeted campaigns are exceptional.",
    avatar: "👨‍💼",
  },
  {
    name: "Fatima Ali",
    role: "Founder, FashionHub",
    review:
      "Working with Maryam transformed our brand. Her UX/UI designs and marketing insights helped us connect with our audience like never before.",
    avatar: "👩‍💻",
  },
  {
    name: "Omar Sheikh",
    role: "Marketing Director, EcomPlus",
    review:
      "Maryam's growth marketing expertise and React development skills delivered outstanding results. Highly recommend her services!",
    avatar: "👨‍💼",
  },
  {
    name: "Ayesha Malik",
    role: "Entrepreneur, BeautyGlow",
    review:
      "From graphic design to content writing, Maryam covered all our needs. Her work is professional, creative, and results-driven.",
    avatar: "👩‍🎨",
  },
  {
    name: "Ali Raza",
    role: "Lahore",
    review:
      "Absolutely amazing experience! The website design was clean, modern, and fast. Also helped me rank my business on Google within weeks. Highly recommended for anyone serious about online growth.",
    avatar: "👨‍💼",
  },
  {
    name: "Ayesha Khan",
    role: "Karachi",
    review:
      "She designed my brand identity and social media posts. Everything looked premium and professional. My engagement increased a lot after her work!",
    avatar: "👩‍💼",
  },
  {
    name: "Usman Tariq",
    role: "Islamabad",
    review:
      "Very professional developer. Fixed all bugs on my website and improved speed. SEO work also brought real traffic. Worth every penny.",
    avatar: "👨‍💻",
  },
  {
    name: "Hassan Malik",
    role: "Faisalabad",
    review:
      "I was struggling with my online store, but after her SEO and design improvements, my sales doubled. Great communication and fast delivery.",
    avatar: "👨‍💼",
  },
];

const TYPED_STRINGS = ["Digital Marketer", "Graphic Designer", "Content Writer", "UX/UI Specialist", "Creative Professional"];

function useTyped(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIdx(i => (i + 1) % strings.length);
          setCharIdx(0);
        } else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);
  return display;
}

function SkillBar({ skill, animate }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#e2e8f0", fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>
          <span style={{ fontSize: 18 }}>{skill.icon}</span> {skill.name}
        </span>
        <span style={{ color: skill.color, fontWeight: 700, fontSize: 14 }}>{skill.pct}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 50, height: 8, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          borderRadius: 50,
          background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          width: animate ? `${skill.pct}%` : "0%",
          transition: "width 1.4s cubic-bezier(0.25,1,0.5,1)",
          boxShadow: `0 0 12px ${skill.color}80`,
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const skillsRef = useRef(null);
  const typed = useTyped(TYPED_STRINGS);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.3 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "testimonials", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060d1f", fontFamily: "'Inter', sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a1628; } ::-webkit-scrollbar-thumb { background: #1e40af50; border-radius: 4px; }
        .nav-item { transition: all 0.25s; cursor: pointer; }
        .nav-item:hover { transform: scale(1.1); }
        .project-card { transition: transform 0.3s, box-shadow 0.3s; }
        .project-card:hover { transform: translateY(-6px); }
        .cta-btn { transition: all 0.25s; cursor: pointer; border: none; }
        .cta-btn:hover { transform: translateY(-2px); filter: brightness(1.15); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 30px #3b82f640} 50%{box-shadow:0 0 60px #3b82f680} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.35);opacity:0} }
        .avatar-wrap { animation: float 4s ease-in-out infinite; }
        .hero-card { animation: fadeUp 0.8s ease both; }
        .section-title { font-family: 'Syne', sans-serif; }
        .tag { transition: background 0.2s; }
        .tag:hover { filter: brightness(1.3); }
      `}</style>

      {/* Sidebar */}
      <div style={{
        position: "fixed", left: 0, top: 0, height: "100vh", width: 72,
        background: "linear-gradient(180deg, #0d1b3e 0%, #060d1f 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 8, zIndex: 100, padding: "20px 0",
      }}>
        <div style={{
          position: "absolute", top: 20, width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#fff",
          boxShadow: "0 0 20px #3b82f650",
        }}>M</div>

        {NAV_ITEMS.map(item => (
          <div key={item.id} className="nav-item" onClick={() => scrollTo(item.id)}
            title={item.label}
            style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 20,
              background: active === item.id ? "linear-gradient(135deg, #1d4ed8, #0891b2)" : "transparent",
              color: active === item.id ? "#fff" : "#4a5568",
              boxShadow: active === item.id ? "0 0 20px #3b82f640" : "none",
            }}>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ marginLeft: 72, flex: 1 }}>

        {/* HERO */}
        <section id="home" style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          padding: "60px 40px",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #1e3a8a18 0%, transparent 70%)",
          position: "relative", overflow: "hidden",
        }}>
          {/* bg grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
          {/* glows */}
          <div style={{ position: "absolute", top: "20%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "#1d4ed820", filter: "blur(80px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "#0891b215", filter: "blur(60px)", pointerEvents: "none" }} />

          <div className="hero-card" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* Avatar */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
              <div style={{ position: "absolute", inset: -6, borderRadius: "50%", animation: "pulse-ring 2.5s ease-out infinite", background: "#3b82f640" }} />
              <img src={photo1} alt="Maryam" className="avatar-wrap" style={{
                width: 120, height: 120, borderRadius: "50%", overflow: "hidden",
                border: "3px solid #3b82f6",
                boxShadow: "0 0 40px #3b82f650",
                objectFit: "cover",
                display: "flex", alignItems: "center", justifyContent: "center",
              }} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#38bdf8", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>Available for Work</span>
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.2rem,6vw,4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
              Hi I'm{" "}
              <span style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Maryam
              </span>
            </h1>

            <div style={{ fontSize: "clamp(1rem,2.5vw,1.4rem)", color: "#94a3b8", marginBottom: 16, fontFamily: "'DM Sans',sans-serif", height: 32 }}>
              I'm a{" "}
              <span style={{ color: "#38bdf8", fontWeight: 600 }}>{typed}</span>
              <span style={{ color: "#3b82f6", animation: "blink 1s step-end infinite" }}>|</span>
            </div>

            <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7, fontSize: 15, fontFamily: "'DM Sans',sans-serif" }}>
              I create stunning digital experiences and drive growth through strategic marketing. Specializing in UX/UI design, content creation, and web development.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://web.facebook.com/profile.php?id=61565861498211" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="cta-btn" onClick={() => scrollTo("portfolio")} style={{
                  padding: "12px 28px", borderRadius: 50,
                  background: "linear-gradient(135deg, #1d4ed8, #0891b2)",
                  color: "#fff", fontWeight: 600, fontSize: 14,
                  fontFamily: "'Syne',sans-serif", letterSpacing: 0.5,
                  boxShadow: "0 4px 24px #3b82f640",
                }}>View My Work</button>
              </a>
              <button className="cta-btn" style={{
                padding: "12px 28px", borderRadius: 50,
                background: "transparent", border: "1.5px solid #3b82f660",
                color: "#94a3b8", fontWeight: 600, fontSize: 14,
                fontFamily: "'Syne',sans-serif",
              }}>
                <a href={photo2} download="Maryam_CV.png" style={{ textDecoration: "none", color: "inherit" }}>Download CV</a>
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
              {[["3+", "Years Exp."], ["50+", "Projects"], ["30+", "Clients"], ["99%", "Satisfaction"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" ref={skillsRef} style={{
          minHeight: "90vh", display: "flex", alignItems: "center",
          padding: "80px 40px",
          background: "linear-gradient(180deg, #060d1f 0%, #0a1628 50%, #060d1f 100%)",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left visual */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 260, height: 260 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid #3b82f620", animation: "pulse-ring 3s ease infinite" }} />
                {[img1, img2, img3, img4].map((e, i) => {
                  const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
                  const r = 100;
                  const x = 130 + r * Math.cos(angle);
                  const y = 130 + r * Math.sin(angle);
                  return (
                    <div key={i} style={{
                      position: "absolute", left: x - 24, top: y - 24,
                      width: 48, height: 48, borderRadius: 14,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}><img src={e} alt="icon" style={{ width: "100%", height: "100%", borderRadius: 14, objectFit: "cover", mixBlendMode: "screen" }} /></div>
                  );
                })}
                <div style={{
                  position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
                  width: 80, height: 80, borderRadius: "50%",
                  background: "linear-gradient(135deg, #1d4ed8, #0891b2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 30, boxShadow: "0 0 40px #3b82f680",
                }}>🚀</div>
              </div>
            </div>

            {/* Right skills */}
            <div>
              <p style={{ fontSize: 12, color: "#38bdf8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>What I Know</p>
              <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>
                My{" "}
                <span style={{ background: "linear-gradient(90deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Skills
                </span>
              </h2>
              <p style={{ color: "#64748b", marginBottom: 32, lineHeight: 1.7, fontSize: 14, fontFamily: "'DM Sans',sans-serif" }}>
                Passionate digital marketer and web developer with expertise in growth marketing, UX/UI design, and modern web technologies.
              </p>
              {SKILLS.map(s => <SkillBar key={s.name} skill={s} animate={skillsVisible} />)}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" style={{
          padding: "80px 40px",
          background: "linear-gradient(180deg, #0a1628 0%, #060d1f 50%, #0a1628 100%)",
        }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 12, color: "#38bdf8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Client Reviews</p>
              <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800 }}>
                What{" "}
                <span style={{ background: "linear-gradient(90deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Clients Say
                </span>
              </h2>
              <p style={{ color: "#475569", marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>Testimonials from satisfied clients</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  background: "linear-gradient(145deg, #0d1b3e, #0a1628)",
                  borderRadius: 20, padding: "24px", border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 30px #00000030",
                  transition: "transform 0.3s",
                }} className="project-card">
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginRight: 12,
                      boxShadow: "0 0 20px #3b82f640",
                    }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{t.role}</div>
                    </div>
                  </div>
                  <p style={{ color: "#94a3b8", lineHeight: 1.6, fontSize: 14, fontFamily: "'DM Sans',sans-serif" }}>
                    "{t.review}"
                  </p>
                  <div style={{ marginTop: 16, display: "flex", gap: 4 }}>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#fbbf24", fontSize: 14 }}>⭐</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{
          padding: "80px 40px", textAlign: "center",
          background: "linear-gradient(180deg, #060d1f, #0a1628)",
        }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <p style={{ fontSize: 12, color: "#38bdf8", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Get In Touch</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, marginBottom: 16 }}>
              Contact{" "}
              <span style={{ background: "linear-gradient(90deg,#3b82f6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Me
              </span>
            </h2>
            <p style={{ color: "#64748b", marginBottom: 40, lineHeight: 1.7, fontFamily: "'DM Sans',sans-serif" }}>
              I'm currently available for freelance work. If you have a project you'd like to discuss, feel free to reach out!
            </p>

            <div style={{ display: "grid", gap: 16, marginBottom: 36 }}>
              {[
                { label: "Name", ph: "Your name" },
                { label: "Email", ph: "your@email.com" },
              ].map(f => (
                <input key={f.label} placeholder={f.ph} style={{
                  width: "100%", padding: "14px 20px", borderRadius: 14,
                  background: "#0d1b3e", border: "1px solid #1e3a8a50",
                  color: "#e2e8f0", fontSize: 14, outline: "none",
                  fontFamily: "'DM Sans',sans-serif",
                }} />
              ))}
              <textarea placeholder="Your message..." rows={5} style={{
                width: "100%", padding: "14px 20px", borderRadius: 14,
                background: "#0d1b3e", border: "1px solid #1e3a8a50",
                color: "#e2e8f0", fontSize: 14, outline: "none", resize: "vertical",
                fontFamily: "'DM Sans',sans-serif",
              }} />
            </div>

            <a href="https://wa.me/923144656596?text=Hello%20I%20want%20to%20work%20with%20you" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="cta-btn" style={{
                width: "100%", padding: "16px", borderRadius: 14,
                background: "linear-gradient(135deg, #1d4ed8, #0891b2)",
                color: "#fff", fontWeight: 700, fontSize: 15,
                fontFamily: "'Syne',sans-serif", letterSpacing: 0.5,
                boxShadow: "0 4px 30px #3b82f650",
              }}>Send Message ✉️</button>
            </a>

            {/* Social names */}
            <div style={{ textAlign: "center", marginTop: 40, color: "#64748b", fontSize: 14, fontFamily: "'DM Sans',sans-serif" }}>
              LinkedIn • Facebook • Pinterest
            </div>
          </div>
        </section>

        <footer style={{ textAlign: "center", padding: "20px", color: "#1e3a8a", fontSize: 12, fontFamily: "'DM Sans',sans-serif" }}>
          © 2026 Maryam · Designed & Built with ❤️
        </footer>
      </div>

      {/* Custom Cursor */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: 20, height: 20, borderRadius: "50%",
        background: "linear-gradient(135deg, #3b82f6, #06b6d4)", pointerEvents: "none",
        transform: `translate(${cursorPos.x - 10}px, ${cursorPos.y - 10}px)`,
        transition: "transform 0.1s ease-out", zIndex: 9999,
        boxShadow: "0 0 20px #3b82f640",
      }} />
    </div>
  );
}
