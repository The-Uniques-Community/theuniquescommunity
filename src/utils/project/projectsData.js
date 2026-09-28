export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "UNI CARE",
    batch: "Uniques 4.0",
    description:
      "A student-support system that identifies potential problem areas and flags them for timely attention and appropriate support.",
    image: "/projects/unicare.webp",
    technologies: ["REACT", "NODE.JS", "MONGODB", "AI"],
    category: "Support & Mentorship",
    link: "https://uniques-care.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-01-15",
  },
  {
    id: 2,
    title: "Libraria",
    batch: "Uniques 1.0",
    description:
      "A digital library platform that helps students discover, access, organize, and manage academic books and learning resources.",
    image: "/projects/libraria.webp",
    technologies: ["REACT", "NODE.JS", "MONGODB", "TAILWIND"],
    category: "Digital Library",
    link: "https://libraria-tu.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-01-10",
  },
  {
    id: 3,
    title: "TU Portal",
    batch: "Uniques 1.0",
    description:
      "A centralized student data portal containing profiles, academic information, records, and essential data of all Uniques students.",
    image: "/projects/tuportal.webp",
    technologies: ["REACT", "NODE.JS", "MONGODB", "TAILWIND"],
    category: "Student Records & LMS",
    link: "https://theuniquesportal.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-01-05",
  },
  {
    id: 4,
    title: "Code crusade 0.5",
    batch: "Uniques 5.0",
    description:
      "A 7-day intensive workshop designed to develop industry-grade coding skills and evaluate students' knowledge through practical tests.",
    image: "/projects/codecrusade.webp",
    technologies: ["WORKSHOP", "CODING", "ASSESSMENT", "PYTHON"],
    category: "Workshop & Testing",
    link: "https://codecrusade2026.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-02-01",
  },
  {
    id: 5,
    title: "Ideajam 2026",
    batch: "Uniques 4.0",
    description:
      "An internal hackathon portal enabling student teams to pitch innovative ideas and selecting top teams to participate in the Smart India Hackathon (SIH).",
    image: "/projects/ideajam2026.webp",
    technologies: ["REACT", "NODE.JS", "TAILWIND", "SIH"],
    category: "Hackathon & SIH",
    link: "https://ideajam2026.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-02-15",
  },
  {
    id: 6,
    title: "Eureka - National Ideathon",
    batch: "Uniques 4.0",
    description:
      "A national-level ideathon platform organized across diverse universities for student innovators to pitch disruptive solutions and compete.",
    image: "/projects/eureka.webp",
    technologies: ["REACT", "NODE.JS", "MONGODB", "INNOVATION"],
    category: "National Ideathon",
    link: "https://eureka-cyan-six.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-02-20",
  },
  {
    id: 7,
    title: "Elevate 3.0",
    batch: "Uniques 4.0",
    description:
      "An official induction and orientation web portal organized for first-year students to inspire, connect, and onboard them into the community.",
    image: "/projects/elevate.webp",
    technologies: ["REACT", "TAILWIND", "FRAMER", "INDUCTION"],
    category: "Induction & Orientation",
    link: "https://elevate-sviet.vercel.app/",
    buttonColor: "#ea384c",
    createdAt: "2026-03-01",
  },
  {
    id: 8,
    title: "Uniques E-Gyan",
    batch: "Uniques 4.0",
    description:
      "A centralized academic platform providing students with PYQs, notes, study materials, and exam-focused resources.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    technologies: ["REACT", "NODE.JS", "MONGODB", "TAILWIND"],
    category: "Academic & Learning",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
    createdAt: "2026-03-10",
  },
  {
    id: 9,
    title: "Uniques Assess",
    batch: "Uniques 4.0",
    description:
      "An online assessment platform for conducting college examinations, managing tests, evaluating students, and tracking performance.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    technologies: ["REACT", "NODE.JS", "MONGODB", "TAILWIND"],
    category: "Assessment & Exams",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
    createdAt: "2026-03-15",
  },
  {
    id: 10,
    title: "Uniques 360",
    batch: "Uniques 1.0",
    description:
      "An all-in-one student platform providing a complete view of academics, activities, performance, and community engagement.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    technologies: ["REACT", "NODE.JS", "MONGODB", "TAILWIND"],
    category: "Analytics & Activities",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
    createdAt: "2026-03-20",
  },
];

export const PROJECT_BATCHES = [
  "Uniques 1.0",
  "Uniques 2.0",
  "Uniques 3.0",
  "Uniques 4.0",
  "Uniques 5.0",
];

export const PROJECT_CATEGORIES = [
  "Support & Mentorship",
  "Digital Library",
  "Student Records & LMS",
  "Workshop & Testing",
  "Hackathon & SIH",
  "National Ideathon",
  "Induction & Orientation",
  "Academic & Learning",
  "Assessment & Exams",
  "Analytics & Activities",
  "Web Application",
  "Mobile Application",
  "AI & ML",
  "Others",
];

const STORAGE_KEY = "tu_community_projects";

export const getStoredProjects = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  } catch (err) {
    console.error("Error reading stored projects:", err);
    return INITIAL_PROJECTS;
  }
};

export const addProject = (projectData) => {
  const existing = getStoredProjects();
  const newProject = {
    ...projectData,
    id: Date.now(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  const updated = [newProject, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("projects-updated", { detail: updated }));
  } catch (err) {
    console.error("Error saving new project:", err);
  }
  return newProject;
};

export const deleteProject = (id) => {
  const existing = getStoredProjects();
  const updated = existing.filter((p) => String(p.id) !== String(id));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("projects-updated", { detail: updated }));
  } catch (err) {
    console.error("Error deleting project:", err);
  }
  return updated;
};

export const getProjectById = (id) => {
  const existing = getStoredProjects();
  return existing.find((p) => String(p.id) === String(id));
};
