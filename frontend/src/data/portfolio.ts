export const navItems = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Systems" },
  { id: "contact", label: "Contact" }
] as const;

export const heroRoles = [
  "React-first product builder",
  "FastAPI and NestJS backend engineer",
  "Scalable systems and API architecture enthusiast",
  "Performance-driven full stack developer"
];

export const heroStats = [
  { value: "10+", label: "projects delivered across production-minded stacks" },
  { value: "2", label: "internships that sharpened frontend and backend execution" },
  { value: "Full Stack", label: "product thinking from UI motion to API performance" }
];

export const storyChapters = [
  {
    slug: "foundation",
    eyebrow: "Chapter 01",
    title: "I build products where interface atmosphere and backend reliability belong to the same story.",
    body:
      "My work usually starts with the feeling of the product. The opening screen, the rhythm of motion, the way content enters the viewport. But I enjoy that part because I also care about the system underneath it staying predictable, maintainable, and fast.",
    bullets: [
      "React interfaces shaped with premium motion, typography, and responsive structure",
      "Backend services designed around clean contracts, auth flows, and maintainability",
      "A preference for ambitious experiences that still stay practical in production"
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    metric: "Frontend polish + backend trust"
  },
  {
    slug: "experience",
    eyebrow: "Chapter 02",
    title: "Internships turned theory into delivery habits, reusable systems, and product speed.",
    body:
      "At SGSN Associates I worked across more than ten projects, building reusable frontend systems, REST APIs, PostgreSQL optimizations, and Redis-backed improvements. At Interpe I focused on responsive UI, async integrations, and performance cleanup that made interfaces feel lighter.",
    bullets: [
      "React, Next.js, Tailwind, FastAPI, and Node.js used in practical delivery workflows",
      "Indexing and Redis caching applied to improve data-heavy paths",
      "Agile collaboration, CI/CD awareness, and production-minded execution"
    ],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    metric: "10+ projects touched"
  },
  {
    slug: "systems",
    eyebrow: "Chapter 03",
    title: "I like systems that feel calm on the surface because the architecture underneath is honest.",
    body:
      "Caching, asynchronous processing, predictable schema design, and API discipline are recurring themes in my work. I enjoy shaping products so the experience feels smooth in the browser while the underlying implementation stays scalable and clear when the product grows.",
    bullets: [
      "Redis for hot-path performance and reduced repeated computation",
      "Async workflows for downloads, AI tasks, and longer-running jobs",
      "System-design mindset applied to real product features"
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    metric: "Scalable by design"
  }
];

export const skillGroups = [
  {
    title: "Frontend",
    accent: "lime",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend",
    accent: "white",
    items: ["Node.js", "NestJS", "FastAPI", "REST APIs", "JWT", "OAuth"]
  },
  {
    title: "Databases",
    accent: "stone",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Schema Design", "Indexing"]
  },
  {
    title: "Tools",
    accent: "zinc",
    items: ["Docker", "Redis", "Kafka", "CI/CD", "Git", "Vite"]
  }
] as const;

export const orbitSkills = [
  "React",
  "FastAPI",
  "NestJS",
  "Tailwind",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kafka"
];

export const projects = [
  {
    title: "Audio / Video Downloader",
    category: "Media Workflow",
    headline: "Concurrent media conversion pipeline with FastAPI and React.",
    description:
      "A full stack downloader built for asynchronous processing, clean API communication, and reliable conversion flows using yt-dlp and ffmpeg.",
    tags: ["React", "TypeScript", "FastAPI", "yt-dlp", "ffmpeg"],
    githubUrl: "https://github.com/Anshul1023/audiodownloader",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Architected an asynchronous FastAPI backend to handle concurrent downloads and conversion jobs.",
      "Integrated yt-dlp and ffmpeg into a processing pipeline designed for practical media workflows.",
      "Built a responsive React frontend focused on quick interaction and clear feedback."
    ]
  },
  {
    title: "Expense Tracker",
    category: "Finance Product",
    headline: "Feature-rich expense tracking with dashboards, budgets, and bills.",
    description:
      "A modern React and TypeScript expense product with budget planning, analytics, bill tracking, and Supabase-backed authentication and storage.",
    tags: ["React", "TypeScript", "Tailwind", "Supabase", "Analytics"],
    githubUrl: "https://github.com/Anshul1023/crafty-canvas",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Designed dashboard views, expense flows, bill tracking, and budget planning experiences.",
      "Used Supabase for backend services, authentication, and structured data handling.",
      "Built the UI with a product-first mindset around clarity, responsiveness, and financial insights."
    ]
  },
  {
    title: "Usage & Billing System",
    category: "SaaS System",
    headline: "Capacity-aware resource management and automatic usage billing.",
    description:
      "A full stack resource-usage system with real-time session tracking, duration-based billing, and validation around limited-capacity resources.",
    tags: ["FastAPI", "React", "TypeScript", "SQLAlchemy", "Billing"],
    githubUrl: "https://github.com/Anshul1023/usage-billing-system",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Implemented resource lifecycle management, active session tracking, and billing record generation.",
      "Designed the backend with layered services, schemas, routers, and persistence boundaries.",
      "Focused on operational logic like capacity validation and duration-based pricing."
    ]
  },
  {
    title: "Workflow Builder",
    category: "AI Product",
    headline: "Visual pipeline builder for intelligent data-processing workflows.",
    description:
      "A drag-and-drop workflow product that helps users design, configure, validate, and test multi-step AI or retrieval-oriented pipelines.",
    tags: ["React", "TypeScript", "React Flow", "Zustand", "Tailwind"],
    githubUrl: "https://github.com/Anshul1023/workflow-builder",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Built a visual canvas flow with component configuration and real-time validation.",
      "Structured the experience around user query, knowledge base, LLM engine, and output stages.",
      "Used modern React tooling to keep complex UI state manageable."
    ]
  },
  {
    title: "Adaptive AI Engine",
    category: "AI Storytelling",
    headline: "Prompt-controlled storytelling with multilingual narration.",
    description:
      "A full stack AI storytelling product combining React, FastAPI, local Ollama generation, and multilingual narration playback.",
    tags: ["React", "FastAPI", "Ollama", "Framer Motion", "edge-tts"],
    githubUrl: "https://github.com/Anshul1023/adaptive_ai_engine",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Orchestrated local LLM generation through Ollama with frontend controls for tone and language.",
      "Added multilingual narration through backend speech generation services.",
      "Framed the product as an immersive AI experience rather than a plain prompt-response demo."
    ]
  },
  {
    title: "AI Resume Analyzer",
    category: "Local AI Tool",
    headline: "Local LLM-based resume analysis and Q&A without API cost.",
    description:
      "A Streamlit and Ollama application for parsing resumes, generating structured analysis, and supporting follow-up chat around candidate fit and improvement.",
    tags: ["Python", "Streamlit", "Ollama", "PyMuPDF", "Llama3"],
    githubUrl: "https://github.com/Anshul1023/resume_analyzer",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Parsed PDF resumes into structured text for local model analysis.",
      "Supported summary, skill extraction, strengths, weaknesses, and follow-up Q&A.",
      "Focused on low-cost local AI workflows and practical product usefulness."
    ]
  },
  {
    title: "Interview AI Agent",
    category: "Realtime Assistant",
    headline: "Realtime interview support overlay with STT, LLM, and screen-share-safe UI.",
    description:
      "A real-time AI assistant built around voice input, streaming answers, hidden overlay rendering, and backend WebSocket orchestration.",
    tags: ["FastAPI", "WebSockets", "Electron", "Groq", "Whisper"],
    githubUrl: "https://github.com/Anshul1023/interview-agent",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Connected speech-to-text, LLM responses, and overlay delivery in a realtime loop.",
      "Used Electron to keep the overlay hidden from common screen-capture surfaces.",
      "Built a practical assistant product around speed, stealth, and interaction flow."
    ]
  },
  {
    title: "Browser Camera App",
    category: "Browser API",
    headline: "Camera-first browser experiment using native media APIs.",
    description:
      "A lightweight web app for camera preview, media capture, and device interaction through modern browser capabilities.",
    tags: ["JavaScript", "HTML5", "MediaDevices API", "WebRTC"],
    githubUrl: "https://github.com/Anshul1023/browser-camera",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Used browser-native APIs to access live camera streams and capture media.",
      "Focused on permission-based UX and device compatibility.",
      "Explored practical use cases like capture flows, verification, and scanning interfaces."
    ]
  },
  {
    title: "FastAPI Backend Skeleton",
    category: "Backend Foundation",
    headline: "Minimal async FastAPI and SQLAlchemy starter for scalable APIs.",
    description:
      "A backend foundation project that demonstrates async FastAPI structure, SQLAlchemy integration, Dockerized database setup, and health-check-driven development.",
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "Python"],
    githubUrl: "https://github.com/Anshul1023/Fastapi",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Structured a minimal but practical FastAPI setup for backend-oriented workflows.",
      "Included async database patterns, Dockerized infrastructure, and testing alignment.",
      "Useful as a clean starting point for future service-oriented builds."
    ]
  },
  {
    title: "JavaScript Snake Game",
    category: "Canvas Game",
    headline: "Classic browser game built with canvas and requestAnimationFrame.",
    description:
      "A compact game project showing clean logic, collision handling, keyboard controls, and browser rendering fundamentals without framework overhead.",
    tags: ["JavaScript", "HTML5 Canvas", "requestAnimationFrame"],
    githubUrl: "https://github.com/Anshul1023/JavaScript-Snake-game",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Built the gameplay loop with vanilla JavaScript and canvas rendering.",
      "Handled food generation, collision logic, scoring, and movement rules.",
      "A good example of core browser logic and animation fundamentals."
    ]
  },
  {
    title: "Portfolio Contact Backend",
    category: "Production Utility",
    headline: "Dedicated backend for handling portfolio contact workflows.",
    description:
      "A focused FastAPI backend for receiving contact submissions, validating payloads, storing messages, and sending email notifications for a personal portfolio.",
    tags: ["FastAPI", "SMTP", "SQLAlchemy", "Pydantic", "CORS"],
    githubUrl: "https://github.com/Anshul1023/contact-backend",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Designed specifically for portfolio contact handling rather than as a generic API.",
      "Included validation, message storage, and email notification responsibilities.",
      "Reflects practical backend thinking applied to a focused product use case."
    ]
  },
  {
    title: "Developer Portfolio Website",
    category: "Brand Experience",
    headline: "Cinematic personal portfolio built as a product-style experience.",
    description:
      "A premium portfolio site focused on visual storytelling, motion design, custom interactions, and production-ready frontend architecture.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
    githubUrl: "https://github.com/Anshul1023/anshul-rawat-portfolio",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Designed as a product-style developer portfolio instead of a basic resume page.",
      "Combines motion, scroll choreography, custom cursor behavior, and 3D background work.",
      "Structured with separate frontend and backend workspaces for clean deployment."
    ]
  },
  {
    title: "GitHub Profile Identity",
    category: "Developer Presence",
    headline: "Profile-first repository focused on developer branding and visibility.",
    description:
      "A GitHub profile repository that presents developer identity, stack focus, and project direction in a compact branded format.",
    tags: ["GitHub", "Markdown", "Branding", "Developer Profile"],
    githubUrl: "https://github.com/Anshul1023/Anshul1023",
    liveUrl: null,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    details: [
      "Built to make the GitHub profile feel intentional and recruiter-friendly.",
      "Highlights current stack, focus areas, and project visibility through clean structure.",
      "Supports the wider portfolio by improving developer presence across platforms."
    ]
  }
];

export const architectureFlow = [
  {
    title: "API Optimization",
    description: "Thoughtful payload design, predictable contracts, and clean controller-service separation."
  },
  {
    title: "Redis Caching",
    description: "Hot-path acceleration for repeated reads and lower database pressure in production flows."
  },
  {
    title: "Async Processing",
    description: "Non-blocking workflows for downloads, integrations, and longer-running backend tasks."
  },
  {
    title: "Scalable Design",
    description: "Composable services, schema discipline, and architecture that grows with product complexity."
  }
];

export const certifications = [
  "React JS Certification - Scalar",
  "Closing the AI Value Gap - from Copilots to Agentic Automation (2026)"
];

export const contactLinks = [
  {
    label: "Email",
    value: "anshulrawat5124@gmail.com",
    href: "mailto:anshulrawat5124@gmail.com"
  },
  {
    label: "GitHub",
    value: "github.com/Anshul1023",
    href: "https://github.com/Anshul1023"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/anshul-rawat-235019290",
    href: "https://www.linkedin.com/in/anshul-rawat-235019290/"
  },
  {
    label: "Location",
    value: "Faridabad, Haryana",
    href: "https://maps.google.com/?q=Faridabad,Haryana"
  }
];
