import React, { useState, useMemo } from "react";
import CelebrationComponent from "@/utils/Header";
import { ArrowUpRight, Search, Code2, ChevronDown } from "lucide-react";

export const BATCHES = [
  "Uniques 1.0",
  "Uniques 2.0",
  "Uniques 3.0",
  "Uniques 4.0",
];

export const PROJECTS_DATA = [
  // ── Uniques 1.0 Projects ──
  {
    id: 1,
    title: "UniPortal - Student Community LMS",
    batch: "Uniques 1.0",
    description:
      "A centralized platform for The Uniques Community managing enrollments, training roadmaps, batch assignments, and real-time attendance.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    technologies: ["REACT", "NODE.JS", "MONGODB", "TAILWIND"],
    category: "Web & Full Stack",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },
  {
    id: 2,
    title: "CampusConnect - Hackathon & Team Finder",
    batch: "Uniques 1.0",
    description:
      "Mobile-first community platform enabling students to discover hackathon teams, showcase member portfolios, and organize meetups.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    technologies: ["REACT NATIVE", "FIREBASE", "REDUX", "UI/UX"],
    category: "Mobile & Apps",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },

  // ── Uniques 2.0 Projects ──
  {
    id: 3,
    title: "AI Resume & Skill Gap Analyzer",
    batch: "Uniques 2.0",
    description:
      "Smart NLP pipeline that parses resumes, assesses skill gaps against live tech job postings, and recommends curated learning roadmaps.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    technologies: ["PYTHON", "FASTAPI", "PYTORCH", "NLP"],
    category: "AI / ML & Data",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },
  {
    id: 4,
    title: "CodeSync - Realtime Pair Programming IDE",
    batch: "Uniques 2.0",
    description:
      "Browser-based code workspace with multi-cursor collaboration, live syntax linting, integrated video call, and terminal execution.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    technologies: ["NEXT.JS", "WEBSOCKETS", "MONACO", "DOCKER"],
    category: "Web & Full Stack",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },

  // ── Uniques 3.0 Projects ──
  {
    id: 5,
    title: "PlacementPulse - Hiring & Contest Tracker",
    batch: "Uniques 3.0",
    description:
      "Analytical dashboard tracking competitive coding milestones, LeetCode ratings, and recruitment rounds for graduating batches.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    technologies: ["TYPESCRIPT", "CHART.JS", "POSTGRESQL", "EXPRESS"],
    category: "Web & Full Stack",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },
  {
    id: 6,
    title: "SmartLab - IoT Lab Energy & Access Guard",
    batch: "Uniques 3.0",
    description:
      "Telemetry and automation hardware setup for university computer labs, optimizing power consumption and monitoring lab access via RFID cards.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    technologies: ["C++", "ESP32", "MQTT", "NODE.JS"],
    category: "Cloud & IoT",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },

  // ── Uniques 4.0 Projects ──
  {
    id: 7,
    title: "CloudOps - Automated DevOps Pipeline",
    batch: "Uniques 4.0",
    description:
      "Zero-config CI/CD build runner and deployment orchestrator developed for student open-source repositories.",
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    technologies: ["DOCKER", "KUBERNETES", "GO", "GITHUB ACTIONS"],
    category: "Cloud & DevOps",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },
  {
    id: 8,
    title: "NeuroCraft - Realtime Focus & EEG Tracker",
    batch: "Uniques 4.0",
    description:
      "Real-time EEG signal processing neural net detecting cognitive focus and mental fatigue in computer science labs.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80",
    technologies: ["PYTHON", "TENSORFLOW", "NUMPY", "FLASK"],
    category: "AI & NeuroTech",
    link: "https://github.com/theuniquesofflicial",
    buttonColor: "#ea384c",
  },
];

const Projects = () => {
  const [selectedBatch, setSelectedBatch] = useState("Uniques 1.0");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PROJECTS_DATA.filter((project) => {
      const matchesBatch = project.batch === selectedBatch;
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((tag) => tag.toLowerCase().includes(q));
      return matchesBatch && matchesSearch;
    });
  }, [selectedBatch, searchQuery]);

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300 pb-24">
      {/* Header with standard celebration component */}
      <CelebrationComponent title="Projects → Innovation & Impact ✦" />

      {/* Main Container - Centered and proportional */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Top Bar: Batch Dropdown on Left & Search Input on Right */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Left Side: Batch Selector Dropdown */}
          <div className="flex items-center gap-2.5">
            <label
              htmlFor="batch-select"
              className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap"
            >
              Batch:
            </label>
            <div className="relative min-w-[190px] sm:w-56">
              <select
                id="batch-select"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ea384c]/30 focus:border-[#ea384c] shadow-sm cursor-pointer"
              >
                {BATCHES.map((batch) => (
                  <option
                    key={batch}
                    value={batch}
                    className="bg-white dark:bg-[#161618] text-slate-900 dark:text-white py-1.5"
                  >
                    {batch}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right Side: Search Bar */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ea384c]/30 focus:border-[#ea384c]"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-[#161618] rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 my-8">
            <Code2 className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
              No projects found for {selectedBatch}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try searching with another keyword or select another batch.
            </p>
          </div>
        ) : (
          /* EXACTLY 2 Project Cards per row on desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() =>
                  window.open(project.link, "_blank", "noopener,noreferrer")
                }
                className="group cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Image with Rounded Corners & Cutout Circular Arrow Button */}
                <div className="relative rounded-[26px] overflow-hidden aspect-[16/10] bg-slate-200 dark:bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Single Smooth Cutout Notch for Circular Button */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-10">
                    <svg
                      viewBox="0 0 96 96"
                      className="w-full h-full text-[#f8f9fa] dark:text-[#0a0a0a]"
                      fill="currentColor"
                      preserveAspectRatio="none"
                    >
                      <path d="M 96 0 L 96 12 C 96 24, 84 34, 72 34 A 38 38 0 0 0 34 72 C 34 84, 24 96, 12 96 L 96 96 Z" />
                    </svg>

                    {/* Clickable Circular Arrow Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          project.link,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="pointer-events-auto absolute bottom-0 right-0 w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#ea384c] hover:bg-[#ca0019] shadow-md shadow-red-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-45 cursor-pointer"
                      title={`Open ${project.title}`}
                      aria-label={`Open ${project.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Project Details Below Image */}
                <div className="pt-4 flex flex-col">
                  {/* Clean Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight group-hover:text-[#ea384c] transition-colors">
                    {project.title}
                  </h3>

                  {/* Muted Short Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3.5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Pill-shaped Technology & Category Tags (Website Color Palette) */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Batch Tag (Brand Accent) */}
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-red-50 text-[#ea384c] border border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40">
                      {project.batch}
                    </span>

                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
