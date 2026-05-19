import React, { useState } from "react";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Globe,
} from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config";
import { motion } from "framer-motion";

const MemberCard = ({ member }) => {
  const navigate = useNavigate();

  // Extract member properties
  const {
    _id,
    fullName,
    batch,
    course = "Member",
    skills = [],
    achievements = [],
    projects = [],
    profilePic
  } = member;

  // Format position (displayed role/status)
  const position = member.isPlaced
    ? `Placed - ${course || ""}`
    : course || "Member";

  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Format profile image - handle both object reference and direct URL
  const profileImg =
    member.profilePic?.fileUrl || member.profilePic?.url ||
    (typeof member.profilePic === "string"
      ? member.profilePic
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`);

  // Format social links
  const socialLinks = {
    github: member.githubProfile || null,
    linkedin: member.linkedinProfile || null,
    twitter: member.twitterProfile || null,
    instagram: member.instagramProfile || null,
    website: member.personalWebsite || null,
  };

  // Format achievements for display
  const formattedAchievements = Array.isArray(achievements)
    ? achievements.map((achievement, index) => ({
      id: achievement.id || index,
      title: achievement.title || achievement.name || achievement,
      description: achievement.description || "",
      date: achievement.date || "",
      color: achievement.color || "bg-gray-700",
      icon: achievement.icon || null,
    }))
    : [];

  // Format projects for display
  const formattedProjects = Array.isArray(projects)
    ? projects.map((project, index) => ({
      id: project.id || index,
      title: project.title || project.name || "Project",
      description: project.description || "",
      link: project.link || project.url || null,
      imageUrl: project.imageUrl || project.image || null,
      technologies: Array.isArray(project.technologies)
        ? project.technologies
        : project.tech
          ? [project.tech]
          : [],
    }))
    : [];

  // Format skills as objects if they're strings
  const formattedSkills = Array.isArray(skills)
    ? skills.map((skill, index) => {
      if (typeof skill === "object") return skill;
      return { name: skill, id: index };
    })
    : [];

  const getProxyImageUrl = (fileId) => {
    if (!fileId) return '/placeholder.svg'; // Fallback image
    return `${BASE_URL}/api/image-proxy/${fileId}`;
  };

  // Handle navigation to profile page
  const handleViewProfile = () => {
    navigate(`/profile/${_id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#e5e5e5] dark:bg-zinc-800 group hover:cursor-pointer transition-all duration-500 shadow-md hover:shadow-2xl rounded-[1.5rem] relative max-w-[280px] w-full aspect-[2/3] overflow-hidden flex flex-col"
      onClick={handleViewProfile}
    >
      {/* Lanyard Hole */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
        <div className="w-12 h-2.5 bg-black/15 dark:bg-black/40 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-black/5 dark:border-black/20"></div>
      </div>

      {/* Profile Image */}
      <img
        src={profilePic?.fileId ? getProxyImageUrl(profilePic.fileId) : profileImg}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        alt={`${fullName}'s Profile`}
      />

      {/* Optional Batch Badge - top left */}
      <div className="absolute top-5 left-4 z-20">
        <span className="bg-black/20 dark:bg-black/40 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-white/10 dark:border-white/5">
          {batch}
        </span>
      </div>

      {/* Floating Social Media Links - Top Right */}
      <div className="absolute top-5 right-[-50px] group-hover:right-4 transition-all duration-500 flex flex-col gap-2 z-20">
        {socialLinks.github && (
          <SocialIcon href={socialLinks.github} icon={<FaGithub size={14} />} />
        )}
        {socialLinks.linkedin && (
          <SocialIcon href={socialLinks.linkedin} icon={<FaLinkedinIn size={14} />} />
        )}
        {socialLinks.twitter && (
          <SocialIcon href={socialLinks.twitter} icon={<FaXTwitter size={14} />} />
        )}
      </div>

      {/* White Overlay Base (SVG + Content) */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] z-10 flex flex-col justify-end">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full text-white dark:text-[#161616]"
        >
          <path d="M0,0 L50,0 C65,0 75,40 100,40 L100,100 L0,100 Z" fill="currentColor" />
        </svg>
        
        {/* Card Content inside white area */}
        <div className="relative z-20 h-full px-6 py-5 flex flex-col">
          {/* Name */}
          <div className="mt-1">
            <h3 className="text-[22px] font-medium text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              {firstName}
              {lastName && <><br />{lastName}</>}
            </h3>
          </div>
          
          {/* Bottom row: Position */}
          <div className="mt-auto flex pb-1">
             <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">{position}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialIcon = ({ href, icon }) => (
    <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ca0019] dark:hover:bg-[#ca0019] hover:border-[#ca0019] transition-all duration-300 shadow-xl"
    onClick={(e) => e.stopPropagation()}
  >
    {icon}
  </a>
);

export default MemberCard;
