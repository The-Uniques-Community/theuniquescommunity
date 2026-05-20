import { Code, Storage, People, GitHub } from "@mui/icons-material";

const mernImage = "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5tFVFnkEyKp7vbuh4aZnGcCs8ARDxHFO2LY0S";

const MernTab = () => {
  const features = [
    {
      icon: <Code fontSize="large" style={{ color: "white" }} />,
      title: "Full-Stack Development",
      description:
        "Mastering React, Node.js, Express, and MongoDB to build scalable, production-grade web applications end-to-end.",
    },
    {
      icon: <Storage fontSize="large" style={{ color: "white" }} />,
      title: "Database & API Design",
      description:
        "Building secure REST APIs, handling authentication with JWT, and optimizing MongoDB for high-traffic applications.",
    },
    {
      icon: <People fontSize="large" style={{ color: "white" }} />,
      title: "Client-Oriented Projects",
      description:
        "Working with real clients to build custom dashboards and solve business challenges with modern development stacks.",
    },
    {
      icon: <GitHub fontSize="large" style={{ color: "white" }} />,
      title: "Industry-Level Workflows",
      description:
        "Following GitHub best practices, CI/CD pipelines, Agile methodologies, and version control for team collaboration.",
    },
  ];

  return (
    <div className="container mx-auto px-2 lg:px-4 py-10">
      <div className="grid lg:grid-cols-3 place-items-center md:grid-cols-1 grid-cols-1 gap-x-10">
        {/* Left Section - Image */}
        <div className="lg:col-span-1">
          <img
            src={mernImage}
            className="object-center object-contain w-full min-w-80 max-w-xs mx-auto"
            alt="Development Training"
          />
        </div>

        {/* Right Section - Content */}
        <div className="lg:p-4 md:p-4 p-2 self-center lg:col-span-2">
          <div>
            <h4 className="text-3xl lg:text-4xl font-bold mb-10 text-center lg:text-left">
              Full-Stack Development Training
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start flex-wrap gap-4 bg-gray-100 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-4 rounded-full bg-black flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MernTab;
