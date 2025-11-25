import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Cpu, 
  Globe, 
  Terminal, 
  Layers, 
  BookOpen, 
  Briefcase, 
  X,
  ExternalLink,
  ChevronRight,
  Server,
  Zap,
  Coffee
} from 'lucide-react';

// --- DATA: RESUME CONTENT ---
const RESUME_DATA = {
  profile: {
    name: "Pranav Kajgaonkar",
    role: "Senior Software Engineer",
    tagline: "Architecting Scalable Distributed Systems",
    bio: "Specializing in Cloud Applications, Networking Protocols, and Machine Learning. Currently building the next generation of public DNS services at Oracle.",
    location: "Sunnyvale, USA",
    links: {
      github: "https://github.com/Pranavhk",
      linkedin: "https://linkedin.com/in/pranav-kajgaonkar",
      email: "mailto:pranav.kajgaonkar@gmail.com"
    }
  },
  skills: [
    { category: "Languages", items: ["Java", "Python", "Golang", "C++", "SQL", "JavaScript", "R"] },
    { category: "Core", items: ["Distributed Systems", "Computer Architecture", "Networking", "Cloud Apps"] },
    { category: "Tools", items: ["Kubernetes", "Kafka", "AWS", "Spring Boot", "Django", "Redis", "Jenkins"] }
  ],
  experience: [
    {
      company: "Oracle America Inc.",
      role: "Senior Software Engineer",
      period: "Apr 2024 - Present",
      location: "Sunnyvale, USA",
      color: "from-red-500 to-orange-500",
      description: "Building fundamental logging capabilities for Oracle Managed Services.",
      achievements: [
        "Enabled customer-facing logging for DNS query/response activity.",
        "Increased resolution capacity of public DNS service in Oracle Cloud Network by 4x.",
        "Enhanced development efficiency by employing robust CI/CD practices."
      ]
    },
    {
      company: "Amazon.com Inc.",
      role: "Software Development Engineer",
      period: "Jul 2022 - Dec 2023",
      location: "New York, USA",
      color: "from-yellow-400 to-orange-500",
      description: "High-scale advertisement rendering and campaign management.",
      achievements: [
        "Implemented ad cluster rendering for a $21M Single Brand campaign using Spring Boot & K8s.",
        "Engineered Preferred Brand campaign using SageMaker & DynamoDB ($40M revenue).",
        "Architected systems using Kinesis & RedShift, increasing click rates by 38%."
      ]
    },
    {
      company: "ElasticRun Networks",
      role: "Software Engineer",
      period: "Jul 2019 - Dec 2020",
      location: "Pune, India",
      color: "from-blue-400 to-indigo-500",
      description: "Supply chain optimization and real-time analytics.",
      achievements: [
        "Designed real-time scorecard system using Apache Kafka, boosting performance by 20%.",
        "Spearheaded Smart Market Basket Analysis model with 90% prediction accuracy.",
        "Formulated supervised algorithms to analyze technical patterns."
      ]
    }
  ],
  education: [
    {
      school: "Columbia University",
      degree: "M.S. in Computer Science",
      year: "2021 - 2022",
      location: "New York, NY"
    },
    {
      school: "University of Pune",
      degree: "B.E. in Information Technology",
      year: "2015 - 2019",
      location: "Pune, India"
    }
  ],
  projects: [
    {
      title: "Traffic Signal Control (RL)",
      tech: ["Python", "Reinforcement Learning"],
      description: "Constructed RL-based algorithm to optimize traffic signal control, resulting in 30% increase in throughput.",
      longDescription: "This project tackled the complex problem of urban traffic congestion. By simulating intersections and applying Reinforcement Learning agents, the system learned optimal switching timings based on real-time queue lengths rather than static timers.",
      link: "#"
    },
    {
      title: "Asymmetric Backpropagation",
      tech: ["Neural Networks", "Deep Learning"],
      description: "Solved Weight Transport Problem in Feedforward/Feedback connections using Normalization.",
      longDescription: "A deep dive into biological plausibility in neural networks. Addressed the weight transport problem by implementing feedback alignment and asymmetric backprop mechanisms, validating them on standard datasets.",
      link: "#"
    },
    {
      title: "Distributed File System",
      tech: ["Go", "gRPC", "Raft"],
      description: "A fault-tolerant distributed file system implementation modeled after GFS.",
      longDescription: "Built from scratch using Golang. Features include chunk server replication, a master server for metadata management, and automatic failover handling using the Raft consensus algorithm.",
      link: "#"
    }
  ]
};

// --- COMPONENTS ---

// 1. Background Animation (Canvas)
const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
        // Connect particles
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40 pointer-events-none" />;
};

// 2. Navigation Dock
const Dock = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: <Terminal size={20} />, label: 'Home' },
    { id: 'work', icon: <Briefcase size={20} />, label: 'Experience' },
    { id: 'projects', icon: <Code2 size={20} />, label: 'Projects' },
    { id: 'education', icon: <BookOpen size={20} />, label: 'Education' },
    { id: 'fun', icon: <Zap size={20} />, label: 'Interests' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative group p-3 rounded-full transition-all duration-300 ease-out
              ${activeTab === tab.id 
                ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30' 
                : 'text-zinc-400 hover:bg-white/10 hover:text-white hover:scale-105'
              }`}
          >
            {tab.icon}
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 3. Sections
const HomeSection = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-700">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-30 animate-pulse"></div>
      <div className="relative w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border-2 border-white/10">
        <span className="text-4xl">👨‍💻</span>
      </div>
    </div>
    
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
        {RESUME_DATA.profile.name}
      </h1>
      <p className="text-xl md:text-2xl text-zinc-400 font-light">
        {RESUME_DATA.profile.role}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {RESUME_DATA.skills[1].items.map((skill, i) => (
          <span key={i} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-zinc-300">
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="flex gap-4 pt-4">
      <a href={RESUME_DATA.profile.links.github} target="_blank" rel="noreferrer" className="p-3 bg-zinc-800 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
        <Github size={24} />
      </a>
      <a href={RESUME_DATA.profile.links.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-zinc-800 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors duration-300">
        <Linkedin size={24} />
      </a>
      <a href={RESUME_DATA.profile.links.email} className="p-3 bg-zinc-800 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300">
        <Mail size={24} />
      </a>
    </div>
  </div>
);

const ExperienceSection = () => (
  <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-10 duration-700">
    <h2 className="text-3xl font-bold text-white mb-8">Professional Journey</h2>
    <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-12 pb-12">
      {RESUME_DATA.experience.map((job, idx) => (
        <div key={idx} className="relative pl-8 md:pl-12 group">
          {/* Timeline Dot */}
          <div className={`absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-gradient-to-r ${job.color} shadow-lg shadow-white/10 ring-4 ring-black`}></div>
          
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{job.role}</h3>
                <div className="text-lg text-blue-400 font-medium">{job.company}</div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-zinc-400 mt-2 md:mt-0">
                  {job.period}
                </span>
                <div className="text-xs text-zinc-500 mt-1">{job.location}</div>
              </div>
            </div>
            
            <ul className="space-y-2 text-zinc-400">
              {job.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
      <h2 className="text-3xl font-bold text-white mb-8">Selected Works</h2>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESUME_DATA.projects.map((project, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedProject(project)}
            className="group relative h-64 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-zinc-800 rounded-2xl group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                    <Layers size={24} />
                  </div>
                  <ExternalLink size={18} className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-zinc-400 line-clamp-3">{project.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded text-zinc-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder for new Project */}
        <div className="group h-64 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-600 hover:border-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer">
          <Code2 size={40} className="mb-4 opacity-50" />
          <span className="text-sm font-medium">Add New Project</span>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
            <div className="flex gap-2 mb-6">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>{selectedProject.longDescription}</p>
              <p>
                This project demonstrates proficiency in system design and algorithmic optimization. 
                Checkout the code on GitHub to see the implementation details.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors">
                View Repository <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EducationSection = () => (
  <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-700">
    <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
    <div className="grid gap-6">
      {RESUME_DATA.education.map((edu, idx) => (
        <div key={idx} className="flex items-center gap-6 p-6 bg-zinc-900/30 border border-white/5 rounded-2xl">
          <div className="h-16 w-16 bg-zinc-800 rounded-xl flex items-center justify-center shrink-0">
             <BookOpen size={32} className="text-zinc-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{edu.school}</h3>
            <p className="text-blue-400">{edu.degree}</p>
            <p className="text-sm text-zinc-500 mt-1">{edu.year} • {edu.location}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FunSection = () => (
  <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
    <h2 className="text-3xl font-bold text-white mb-8">Beyond the Code</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Skill Cloud Visualizer Placeholder */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
        <Server size={48} className="text-indigo-500 mb-6" />
        <h3 className="text-xl font-bold text-white mb-2">System Design Enthusiast</h3>
        <p className="text-zinc-400 text-sm">
          I spend my free time reading engineering blogs from Uber, Netflix, and Meta. 
          Fascinated by high-throughput distributed architectures.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-full">
            <Coffee size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white">Coffee Connoisseur</h4>
            <p className="text-xs text-zinc-400">Exploring new roasts every weekend.</p>
          </div>
        </div>
        
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-full">
            <Globe size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white">Travel</h4>
            <p className="text-xs text-zinc-400">Been to 10+ National Parks in the US.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30 font-sans">
      <ParticleNetwork />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-24 pb-32">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'work' && <ExperienceSection />}
        {activeTab === 'projects' && <ProjectsSection />}
        {activeTab === 'education' && <EducationSection />}
        {activeTab === 'fun' && <FunSection />}
      </main>

      <Dock activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Global CSS for animations that Tailwind doesn't cover by default */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}