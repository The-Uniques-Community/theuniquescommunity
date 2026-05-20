import { Cloud, Business, Sync, TrendingUp } from "@mui/icons-material";

const img = "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5hyCPAUNdx4bWp0UlI1ZKuzEFvVsLw7JfMokX";

const GenAiTab = () => {
  const features = [
    {
      icon: <Cloud fontSize="large" style={{ color: "white" }} />,
      title: "Salesforce Platform Fundamentals",
      description:
        "Understanding the Salesforce ecosystem, navigating the platform, managing objects, fields, and using the App Builder.",
    },
    {
      icon: <Business fontSize="large" style={{ color: "white" }} />,
      title: "CRM & Sales Cloud",
      description:
        "Managing leads, contacts, accounts, and opportunities — automating the entire sales pipeline for business efficiency.",
    },
    {
      icon: <Sync fontSize="large" style={{ color: "white" }} />,
      title: "Automation with Flows",
      description:
        "Building powerful no-code automations with Salesforce Flow, Process Builder, and Approval Processes to streamline operations.",
    },
    {
      icon: <TrendingUp fontSize="large" style={{ color: "white" }} />,
      title: "Reports, Dashboards & Certification",
      description:
        "Creating insightful reports and dashboards, and preparing for Salesforce Administrator & Platform Developer certifications.",
    },
  ];

  return (
    <div className="container mx-auto px-2 lg:px-4 py-10">
      <div className="grid lg:grid-cols-3 place-items-center md:grid-cols-1 grid-cols-1 gap-x-10">
        {/* Left Section - Image */}
        <div className="lg:col-span-1">
          <img
            src={img}
            className="object-center object-contain w-full min-w-80 max-w-xs mx-auto"
            alt="Salesforce Training"
          />
        </div>

        {/* Right Section - Content */}
        <div className="lg:p-4 md:p-4 p-2 self-center lg:col-span-2">
          <div>
            <h4 className="text-3xl lg:text-4xl font-bold mb-10 text-center lg:text-left">
              Salesforce CRM & Platform Training
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

export default GenAiTab;
