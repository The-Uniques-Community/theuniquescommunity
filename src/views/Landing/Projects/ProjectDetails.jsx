import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Share2,
  Check,
  Copy,
  Calendar,
  Layers,
  Target,
  Lightbulb,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { toast } from "react-toastify";
import CallToAction from "../homComponents/CallToAction";
import { getProjectById, fetchProjects } from "@/utils/project/projectsData";

const getNameInitials = (name) => {
  if (!name) return "TU";
  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
};

const ProjectDetails = () => {
  const { projectId, id } = useParams();
  const currentId = projectId || id;
  const navigate = useNavigate();

  const [project, setProject] = useState(() => getProjectById(currentId));
  const [loading, setLoading] = useState(!project);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentId]);

  useEffect(() => {
    // If not found in memory/localStorage, attempt to fetch latest projects
    if (!project) {
      setLoading(true);
      fetchProjects()
        .then(() => {
          const found = getProjectById(currentId);
          setProject(found || null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentId, project]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Project link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.title || "The Uniques Community Project",
          text: project?.description || "Check out this project on The Uniques Community!",
          url: window.location.href,
        })
        .catch(() => handleCopyLink());
    } else {
      handleCopyLink();
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen text-slate-800 dark:text-slate-200 flex items-center justify-center py-24">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ca0019]"></div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!project) {
    return (
      <div className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen text-slate-800 dark:text-slate-200 py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 text-[#ca0019] dark:text-red-400 flex items-center justify-center mx-auto mb-5">
            <Code2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
            The project you are looking for does not exist or may have been updated.
          </p>
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 bg-[#ea384c] hover:bg-[#ca0019] text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-red-500/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>
    );
  }

  // Fallbacks for data fields
  const title = project.title || "Project Title";
  const image = project.image || "/projects/unicare.webp";
  const batch = project.batch || "The Uniques Community";
  const category = project.category || "Web Application";
  const overview =
    project.overview ||
    project.description ||
    "An innovative project engineered and built by members of The Uniques Community.";
  const detailedDescription =
    project.detailedDescription ||
    project.description ||
    "A full-stack, user-centric solution built to empower students and foster collaborative innovation within the academic ecosystem.";
  const problemStatement =
    project.problemStatement ||
    "Students and community members frequently encounter communication, resource, or tracking friction without a centralized, automated platform designed for their needs.";
  const solution =
    project.solution ||
    "An end-to-end engineered application utilizing modern architecture to streamline processes, deliver timely intervention, and provide an intuitive user experience.";
  const features =
    Array.isArray(project.features) && project.features.length > 0
      ? project.features
      : [
          "Interactive and responsive interface built for modern devices",
          "Real-time state synchronization and automated workflows",
          "Role-based access and data security standards",
          "Seamless community integration and verified tracking",
        ];
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : ["REACT", "NODE.JS", "TAILWIND"];
  const status = project.status || "Completed";

  const liveUrl =
    project.liveUrl ||
    (project.link && !project.link.includes("github.com") && project.link !== "#"
      ? project.link
      : null);
  const githubUrl =
    project.githubUrl ||
    (project.link && project.link.includes("github.com")
      ? project.link
      : "https://github.com/theuniquesofflicial");

  const team =
    Array.isArray(project.team) && project.team.length > 0
      ? project.team
      : [
          {
            name: batch,
            role: "Organizers & Lead Developers",
            initials: "TU",
          },
        ];

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white/80 dark:bg-[#121214]/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#ea384c] dark:hover:text-[#ea384c] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-[#1c1c20] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title="Share project"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="hidden sm:inline text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
        {/* Large Project Image Banner */}
        <div className="relative w-full rounded-[26px] overflow-hidden aspect-[16/10] bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8 flex items-center justify-center group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";
            }}
          />
        </div>

        {/* Project Header Info */}
        <div className="mb-8 sm:mb-10">
          {/* Category & Batch Tags Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-red-50 text-[#ea384c] border border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40">
              {batch}
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60">
              {category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {overview}
          </p>
        </div>

        {/* Two-Column Grid Layout: Main Details (Left) + Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left Column: Deep Project Details */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            {/* About / Detailed Description */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#ea384c]" />
                <span>About This Project</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {detailedDescription}
              </p>
            </div>

            {/* Problem Statement Card */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#ea384c] dark:text-red-400 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Problem Statement
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-12">
                {problemStatement}
              </p>
            </div>

            {/* Solution Card */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  The Solution
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pl-0 sm:pl-12">
                {solution}
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ea384c]" />
                <span>Key Features</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1c1c20] border border-slate-100 dark:border-slate-800/80"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-100 text-[#ea384c] dark:bg-red-950/60 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-[#ea384c]" />
                <span>Technologies & Tech Stack</span>
              </h2>
              <div className="flex flex-wrap items-center gap-2.5">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs sm:text-sm font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Clear Bottom "Back to Projects" Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161618] hover:bg-slate-50 dark:hover:bg-[#1c1c20] text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all shadow-sm cursor-pointer hover:border-[#ea384c]/40"
              >
                <ArrowLeft className="w-4 h-4 text-[#ea384c]" />
                <span>Back to Projects</span>
              </button>
            </div>
          </div>

          {/* Right Column: Project Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Links / Action Card */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Project Links
              </h3>

              <div className="space-y-3">
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#ea384c] hover:bg-[#ca0019] text-white font-semibold text-sm transition-all shadow-md shadow-red-500/20 group cursor-pointer"
                  >
                    <span>Visit Live Demo</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
                  </a>
                ) : null}

                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1c1c20] hover:bg-slate-100 dark:hover:bg-[#222226] text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-400" />
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 hover:border-[#ea384c]/50 text-slate-600 dark:text-slate-400 hover:text-[#ea384c] dark:hover:text-[#ea384c] text-sm font-medium transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Link Copied!" : "Copy Project Link"}</span>
                </button>
              </div>
            </div>

            {/* Project Metadata Card */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Project Overview
              </h3>

              <div className="space-y-4">
                {/* Status */}
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1">
                    Project Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {status}
                  </span>
                </div>

                {/* Batch */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1">
                    Batch
                  </span>
                  <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                    {batch}
                  </span>
                </div>

                {/* Category */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1">
                    Category
                  </span>
                  <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                    {category}
                  </span>
                </div>

                {/* Date */}
                {project.createdAt && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1">
                      Initiated
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 font-semibold">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{project.createdAt}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Team / Community Leadership (Matches Screenshot 2 Style) */}
            <div className="bg-white dark:bg-[#161618] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Community Leaders
              </h3>

              <div className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ca0019] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                      {member.initials || getNameInitials(member.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {member.role || "Organizer"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action Banner (Join Us Today - Honeycomb pattern from Screenshot 3) */}
      <CallToAction />
    </div>
  );
};

export default ProjectDetails;
