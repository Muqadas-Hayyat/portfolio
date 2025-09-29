
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaReact, FaNodeJs, FaCss3Alt } from "react-icons/fa";
import { SiTailwindcss, SiRedux, SiJavascript } from "react-icons/si";
import emailjs from "@emailjs/browser";

// --- Projects Data
const PROJECTS = [
  {
    id: "akoya-laundry",
    title: "AKOYA Laundry",
    role: "Frontend",
    tags: ["React", "Tailwind", "Redux Toolkit"],
    short: "Modern laundry management app with booking & real-time updates.",
    description:
      "AKOYA Laundry is a full-featured laundry service platform. It allows users to schedule pickup & delivery, track order status, and view service history. Admin can manage orders, pricing, and view analytics. Built with a responsive UI, real-time updates, and secure backend.",
    link: "https://akoya-laundary-project-c6qdafw42-muqadashayyats-projects.vercel.app/",
    image: "./images/akoya.png",
    github: "https://github.com/Muqadas-Hayyat/AKOYA_laundary_project",
    features: [
      "User registration and login",
      "Schedule pickup & delivery",
      "Real-time order tracking",
      "Responsive UI with mobile & desktop support",
      "Admin dashboard to manage orders",
      "Service history & past orders",
      "Integration with database and REST APIs",
    ],
  },
];

// --- Typing Effect
const TypingEffect = ({ text, speed = 150, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayText}</span>;
};

// --- Floating Mesh
function FloatingMesh({ pos = [0, 0, 0], color = [0.3, 0.5, 0.9], scale = 1, speed = 1.0 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.2 * delta * speed;
    ref.current.rotation.y += 0.15 * delta * speed;
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.002;
  });
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      <torusKnotGeometry args={[0.9, 0.28, 120, 16]} />
      <meshStandardMaterial
        metalness={0.6}
        roughness={0.2}
        color={`rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`}
        emissive={`rgb(${color[0] * 40}, ${color[1] * 40}, ${color[2] * 40})`}
      />
    </mesh>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ height: "100%", width: "100%" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <Suspense fallback={null}>
        <group>
          <FloatingMesh pos={[-3, 1, 0]} color={[0.2, 0.4, 0.9]} scale={1.6} speed={1.1} />
          <FloatingMesh pos={[2, -1.2, -1]} color={[0.9, 0.3, 0.5]} scale={1.4} speed={0.9} />
          <FloatingMesh pos={[0, 0.6, -0.5]} color={[0.4, 0.8, 0.5]} scale={1.2} speed={1.3} />
        </group>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.25} enablePan={false} />
      </Suspense>
    </Canvas>
  );
}

// --- EmailJS Contact Form (with reset + smaller button)
function ContactForm() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_5j2dkbr", "template_w94an0b", formRef.current, "uBQXNvri7hw9bDA5B")
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          formRef.current.reset();
        },
        () => setStatus("❌ Failed to send. Try again.")
      );
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="max-w-2xl mx-auto grid gap-6 text-left">
      <motion.input
        type="text"
        name="from-name"
        placeholder="Your Name"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <motion.input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <motion.input
        type="phone"
        name="phone"
        placeholder="Your Phone Number"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <motion.textarea
        rows="5"
        name="message"
        placeholder="Your Message"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Smaller Button */}
      <motion.button
        type="submit"
        className="px-6 py-3 w-[200px] mx-auto self-center rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        Send
      </motion.button>

      {status && <p className="text-center text-sm mt-2">{status}</p>}
    </form>
  );
}

// --- Main App
const App = () => {
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-gray-900">
      {/* Header */}
      <header className="fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between backdrop-blur bg-white/40 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center shadow-md text-white font-bold">
              MH
            </div>
            <div>
              <div className="font-bold text-lg">Muqadas Hayyat</div>
              <div className="text-xs text-gray-600">Frontend Developer</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-indigo-600">Home</a>
            <a href="#projects" className="hover:text-indigo-600">Work</a>
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <HeroScene />
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                <TypingEffect text="Muqadas Hayyat" speed={150} onComplete={() => setTypingComplete(true)} />
              </span>
            </h1>
            <p className="text-lg text-gray-700 font-medium mt-2">
              {typingComplete && (
                <TypingEffect text="Frontend Developer & UI/UX Enthusiast" speed={120} />
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About + Skills */}
      <section id="about" className="py-20 px-6 bg-white/70">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-extrabold mb-6 text-gray-900">About Me</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              I’m <span className="font-semibold text-indigo-600">Muqadas Hayyat</span>, a passionate frontend developer with experience building scalable, responsive web applications. I love creating intuitive user interfaces and seamless experiences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              My stack includes React, TailwindCSS, Redux Toolkit and RTK Query. I enjoy diving into UI animations, optimizing performance, and writing maintainable code. In my projects, I aim for accessibility, responsiveness, and a delightful user experience.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Beyond code, I'm curious, always learning new tools, and passionate about turning ideas into real experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            <div className="flex flex-col items-center">
              <FaReact className="text-blue-500 w-10 h-10 mb-2" />
              <span className="text-sm text-gray-700">React.js</span>
            </div>
            <div className="flex flex-col items-center">
              <SiTailwindcss className="text-teal-400 w-10 h-10 mb-2" />
              <span className="text-sm text-gray-700">TailwindCSS</span>
            </div>
            <div className="flex flex-col items-center">
              <SiJavascript className="text-yellow-500 w-10 h-10 mb-2" />
              <span className="text-sm text-gray-700">JavaScript</span>
            </div>
            <div className="flex flex-col items-center">
              <FaNodeJs className="text-green-600 w-10 h-10 mb-2" />
              <span className="text-sm text-gray-700">Node.js</span>
            </div>
            <div className="flex flex-col items-center">
              <SiRedux className="text-green-700 w-10 h-10 mb-2" />
              <span className="text-sm text-gray-700">Redux Toolkit</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCss3Alt className="text-blue-600 w-10 h-10 mb-2" />
              <span className="text-sm text-gray-700">CSS / UI</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 bg-white/70">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-10 text-center text-gray-900"
          >
            Projects
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {PROJECTS.map((p) => (
              <motion.article
                key={p.id}
                whileHover={{ scale: 1.03 }}
                className="group bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 w-full max-w-sm"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{p.short}</p>

                  <div className="mt-3">
                    <strong className="text-sm">Features:</strong>
                    <ul className="list-disc ml-4 mt-1 text-gray-700 text-sm space-y-1">
                      {p.features.slice(0, 3).map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 mt-4 text-sm">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-indigo-600 hover:underline"
                    >
                      <ExternalLink size={16} /> Live
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-gray-700 hover:underline"
                    >
                      <FaGithub size={16} /> Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-indigo-100 via-pink-50 to-white text-center">
        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold mb-4 text-gray-900">
          Let’s build something
        </motion.h3>
        <p className="text-gray-600 mb-10">Have a project or idea? Drop me a message below </p>
        <ContactForm />
      </section>

      <footer className="py-8 border-t border-gray-200 text-center text-gray-600">
        © {new Date().getFullYear()} Muqadas Hayyat
      </footer>
    </div>
  );
};

export default App;
