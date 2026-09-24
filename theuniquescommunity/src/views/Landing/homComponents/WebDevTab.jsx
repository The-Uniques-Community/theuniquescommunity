import { Code, Memory, DataObject, Science } from "@mui/icons-material";

const img = "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5t7JDNfEyKp7vbuh4aZnGcCs8ARDxHFO2LY0S";

const WebDevTab = () => {
  const features = [
    {
      icon: <Code fontSize="large" style={{ color: "white" }} />,
      title: "Advanced Python Concepts",
      description:
        "Deep dive into Python's advanced features — decorators, generators, context managers, metaclasses, and concurrency with asyncio.",
    },
    {
      icon: <Memory fontSize="large" style={{ color: "white" }} />,
      title: "Data Structures & File Handling",
      description:
        "Mastering complex data structures, file I/O operations, JSON/CSV processing, and efficient memory management techniques.",
    },
    {
      icon: <Science fontSize="large" style={{ color: "white" }} />,
      title: "Libraries & Frameworks",
      description:
        "Hands-on with NumPy, Pandas, Matplotlib, and Flask to build data pipelines and lightweight web services.",
    },
    {
      icon: <DataObject fontSize="large" style={{ color: "white" }} />,
      title: "Real-World Python Projects",
      description:
        "Building automation scripts, REST APIs, and data analysis dashboards to simulate real industry scenarios.",
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
            alt="Advanced Python Training"
          />
        </div>

        {/* Right Section - Content */}
        <div className="lg:p-4 md:p-4 p-2 self-center lg:col-span-2">
          <div>
            <h4 className="text-3xl lg:text-4xl font-bold mb-10 text-center lg:text-left">
              Advanced Python Programming
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

export default WebDevTab;
