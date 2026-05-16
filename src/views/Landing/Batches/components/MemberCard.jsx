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

  // Format profile image - handle both object reference and direct URL
  const profileImg =
    member.profilePic?.url ||
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
      className="bg-white group hover:cursor-pointer transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-2xl rounded-2xl relative max-w-[280px] w-full overflow-hidden h-full flex flex-col"
      onClick={handleViewProfile}
    >
      {/* Profile Image Wrapper */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={profilePic ? getProxyImageUrl(profilePic?.fileId) : profileImg}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={`${fullName}'s Profile`}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        {/* Batch Badge - Premium Style */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-[#ca0019] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            {batch}
          </span>
        </div>

        {/* Floating Social Media Links - Glassmorphism */}
        <div className="absolute top-4 right-[-50px] group-hover:right-4 transition-all duration-500 flex flex-col gap-2">
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

        {/* Member Name and Position Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold leading-tight mb-1 truncate">
            {fullName}
          </h3>
          <p className="text-gray-300 text-xs font-medium uppercase tracking-wider truncate">
            {position}
          </p>
        </div>
      </div>

      {/* Card Footer Content */}
      <div className="p-5 bg-white border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Skills</span>
            <span className="text-sm font-bold text-gray-900">{formattedSkills.length}</span>
          </div>
          {formattedAchievements.length > 0 && (
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Awards</span>
              <span className="text-sm font-bold text-[#ca0019]">{formattedAchievements.length}</span>
            </div>
          )}
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center group-hover:bg-[#ca0019] group-hover:text-white transition-all duration-300 shadow-inner">
          <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
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
    className="w-8 h-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#ca0019] hover:border-[#ca0019] transition-all duration-300 shadow-xl"
    onClick={(e) => e.stopPropagation()}
  >
    {icon}
  </a>
);

export default MemberCard;
