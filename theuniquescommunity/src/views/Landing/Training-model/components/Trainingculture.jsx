import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useThemeContext } from "@/theme/ThemeProvider";

const FeatureCard = ({ image, title, description, isDarkMode }) => {
  return (
    <div className={`group relative transition hover:z-[1] hover:shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-[#424D53]/20 hover:shadow-white/5 border border-white/5' : 'bg-white hover:shadow-gray-300 border-gray-100'}`}>
      <div className="relative space-y-8 py-12 p-8">
        <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>
          {image}
        </div>
        <div className="space-y-2">
          <h5 className={`text-xl font-semibold transition group-hover:text-red-600 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h5>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
        </div>
      </div>
    </div>
  );
};

const Trainingculture = () => {
  const { isDarkMode } = useThemeContext();
  const features = [
    {
      image: <PersonOutlineIcon fontSize="large" className="transition group-hover:scale-110   group-hover:text-[#ca0019]"  />,
      title: "Professional Trainer (Mentor Lead)",
      description:
        "Experienced mentors guiding the next generation of learners.",
    },
    {
      image: <SchoolIcon fontSize="large" className="transition group-hover:scale-110  group-hover:text-[#ca0019]" />,
      title: "Uniques 1.0 - The Pioneers",
      description:
        "The first batch, setting the foundation for knowledge sharing.",
    },
    {
      image: <MenuBookIcon fontSize="large" className="transition group-hover:scale-110  group-hover:text-[#ca0019]" />,
      title: "Uniques 2.0 - The Bridge",
      description:
        "Learning from pioneers and mentoring the next generation.",
    },
    {
      image: <AutoStoriesIcon fontSize="large" className="transition group-hover:scale-110  group-hover:text-[#ca0019]" />,
      title: "Uniques 3.0 & So-On - The Future Leaders",
      description:
        "Carrying forward the culture of mentorship and innovation.",
    },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 xl:px-6 transition-colors duration-500 py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}  id="features">
      <div className="md:w-3/3 mx-auto text-center lg:w-2/2">
        <h2 className={`my-8 text-5xl font-bold md:text-5xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Technical Training Culture
        </h2>
        <h3 className={`text-xl lg:text-2xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Mentorship That Builds Future Leaders
        </h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'} leading-relaxed`}>
          At the core of our training culture is a strong mentorship model. Each
          batch builds on the experiences of the previous one, ensuring
          continuous learning, technical excellence, and leadership development.
          Juniors learn from seniors, and in turn, they mentor the next
          generation, creating a cycle of growth and innovation.
        </p>
      </div>
      <div className={`mt-16 grid overflow-hidden rounded-3xl border ${isDarkMode ? 'border-white/10 divide-white/10' : 'divide-gray-200 border-gray-100'} sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4`}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
};

export default Trainingculture;
