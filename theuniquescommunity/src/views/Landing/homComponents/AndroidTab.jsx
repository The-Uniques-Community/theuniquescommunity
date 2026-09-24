import { AccountTree, Sort, Memory, Speed } from "@mui/icons-material";

const img = "https://1kga789wdc.ufs.sh/f/lJZn16SaUVX5Y6o9N9kdqrAaPiXWyjJwRgVxh49pENQmO51K";

const AndroidTab = () => {
  const features = [
    {
      icon: <AccountTree fontSize="large" style={{ color: "white" }} />,
      title: "Core Data Structures",
      description:
        "Mastering arrays, linked lists, stacks, queues, trees, heaps, and graphs — the building blocks of efficient software.",
    },
    {
      icon: <Sort fontSize="large" style={{ color: "white" }} />,
      title: "Sorting & Searching Algorithms",
      description:
        "Deep understanding of bubble, merge, quick, and heap sort along with binary search and its real-world applications.",
    },
    {
      icon: <Memory fontSize="large" style={{ color: "white" }} />,
      title: "Dynamic Programming",
      description:
        "Solving complex optimization problems using memoization and tabulation techniques with pattern-based problem solving.",
    },
    {
      icon: <Speed fontSize="large" style={{ color: "white" }} />,
      title: "Time & Space Complexity",
      description:
        "Analysing algorithm efficiency with Big-O notation, optimizing code performance, and preparing for technical interviews.",
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
            alt="DSA Training"
          />
        </div>

        {/* Right Section - Content */}
        <div className="lg:p-4 md:p-4 p-2 self-center lg:col-span-2">
          <div>
            <h4 className="text-3xl lg:text-4xl font-bold mb-10 text-center lg:text-left">
              Data Structures & Algorithms
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

export default AndroidTab;
