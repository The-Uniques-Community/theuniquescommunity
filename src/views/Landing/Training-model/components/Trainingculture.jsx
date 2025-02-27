import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="group relative bg-white transition hover:z-[1] hover:shadow-lg hover:shadow-gray-300">
      <div className="relative space-y-8 py-12 p-8">
        {image}
        <div className="space-y-2">
          <h5 className="text-xl font-semibold text-gray-800 transition group-hover:text-red-600">
            {title}
          </h5>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Trainingculture = () => {
  const features = [
    {
      image: <PersonOutlineIcon fontSize="large"  />,
      title: "Professional Trainer (Mentor Lead)",
      description:
        "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
    },
    {
      image: <SchoolIcon fontSize="large" />,
      title: "Uniques 1.0 - The Pioneers",
      description:
        "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
    },
    {
      image: <MenuBookIcon fontSize="large"/>,
      title: "Uniques 2.0 - The Bridge",
      description:
        "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
    },
    {
      image: <AutoStoriesIcon fontSize="large" />,
      title: "Uniques 3.0 & So-On - The Future Leaders",
      description:
        "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6" id="features">
      <div className="md:w-3/3 mx-auto text-center lg:w-2/2">
        <h2 className="my-8 text-5xl font-bold text-gray-900 md:text-5xl">
          Technical Training Culture
        </h2>
        <h3 className="text-xl lg:text-2xl mb-8">
          Mentorship That Builds Future Leaders
        </h3>
        <p className="text-gray-700">
          At the core of our training culture is a strong mentorship model. Each
          batch builds on the experiences of the previous one, ensuring
          continuous learning, technical excellence, and leadership development.
          Juniors learn from seniors, and in turn, they mentor the next
          generation, creating a cycle of growth and innovation.
        </p>
      </div>
      <div className="mt-16 grid  divide-gray-200 overflow-hidden rounded-3xl   text-gray-800 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Trainingculture;
