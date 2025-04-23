import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
// import UniquesFormation from "@/assets/img/HowItStarted/1.jpg";
// import FirstBatch from "@/assets/img/HowItStarted/2.jpg";
// import Naveen from "@/assets/img/HowItStarted/3.jpeg";
// import Praveen from "@/assets/img/HowItStarted/3-1.jpeg";
// import Uniques2 from "@/assets/img/HowItStarted/4.jpeg";
// import ICTA from "@/assets/img/HowItStarted/5.jpeg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white  font-sans md:px-10" ref={containerRef}>
      {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-lg md:text-4xl font-semibold mb-4 text-black  max-w-4xl">
                    Sparking Success: The Uniques’ Odyssey from Idea to Impact
                </h2>
                <p className="text-neutral-700  text-sm md:text-base max-w-sm">

                </p>
            </div> */}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-black  ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="text-4xl mb-4 text-left font-bold text-black ">
                {item.subtitle}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-red-500 via-red-300 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// ...existing code...

const trainingTimeline = [
  {
    title: "First Year",
    subtitle: "Technical & Soft Skills Development",
    content: (
      <>
        <strong>Key Skills Developed:</strong>
        <ul>
          <li>Advanced image editing (Photoshop, Illustrator)</li>
          <li>Responsive front-end development</li>
          <li>UI/UX design principles</li>
          <li>Digital marketing strategies</li>
        </ul>
        <strong>Client Projects:</strong>
        <ul>
          <li>4 local businesses - Website design & development</li>
          <li>2 startups - Brand identity creation</li>
          <li>3 e-commerce stores - UI/UX redesign</li>
        </ul>
        <strong>Revenue Generated:</strong>
        <ul>
          <li>₹85,000 from design projects</li>
          <li>₹35,000 from front-end development</li>
          <li><strong>Total: ₹1,20,000</strong></li>
        </ul>
      </>
    ),
  },
  {
    title: "Second Year",
    subtitle: "Programming & Data Management Solutions",
    content: (
      <>
        <strong>Key Skills Developed:</strong>
        <ul>
          <li>Backend development (Node.js, Express)</li>
          <li>Database management (SQL/NoSQL)</li>
          <li>API design and implementation</li>
          <li>Data structures & algorithms</li>
        </ul>
        <strong>Client Projects:</strong>
        <ul>
          <li>2 medium enterprises - Custom CRM solutions</li>
          <li>3 startups - Full-stack web applications</li>
          <li>1 educational institution - Student management system</li>
        </ul>
        <strong>Revenue Generated:</strong>
        <ul>
          <li>₹70,000 from backend development</li>
          <li>₹45,000 from database solutions</li>
          <li><strong>Total: ₹1,15,000</strong></li>
        </ul>
      </>
    ),
  },
  {
    title: "Third Year",
    subtitle: "Advanced Technology Solutions",
    content: (
      <>
        <strong>Key Skills Applied:</strong>
        <ul>
          <li>Scalable application architecture</li>
          <li>Cloud deployment (AWS, Azure)</li>
          <li>DevOps integration</li>
          <li>Mobile-responsive frameworks</li>
        </ul>
        <strong>Client Projects:</strong>
        <ul>
          <li>1 fintech company - Payment gateway integration</li>
          <li>2 e-commerce businesses - Inventory management systems</li>
          <li>1 healthcare provider - Patient management portal</li>
        </ul>
        <strong>Revenue Generated:</strong>
        <ul>
          <li>₹60,000 from system integration</li>
          <li>₹40,000 from custom application development</li>
          <li><strong>Total: ₹1,00,000</strong></li>
        </ul>
      </>
    ),
  },
  {
    title: "Fourth Year",
    subtitle: "Enterprise Solutions & Emerging Tech",
    content: (
      <>
        <strong>Key Skills Applied:</strong>
        <ul>
          <li>Blockchain development</li>
          <li>Smart contract implementation</li>
          <li>Enterprise system integration</li>
          <li>Advanced security protocols</li>
        </ul>
        <strong>Client Projects:</strong>
        <ul>
          <li>1 supply chain company - Blockchain tracking solution</li>
          <li>2 financial institutions - Secure transaction systems</li>
          <li>1 government agency - Data security consultation</li>
        </ul>
        <strong>Revenue Generated:</strong>
        <ul>
          <li>₹45,000 from blockchain implementation</li>
          <li>₹20,000 from security consulting</li>
          <li><strong>Total: ₹65,000</strong></li>
        </ul>
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <strong className="text-xl text-[#ca0019]">Total Revenue To Date: ₹4,00,000+</strong>
          <p className="text-sm text-gray-600 mt-1">From 21 client projects across various industries</p>
        </div>
      </>
    ),
  },
  {
    title: "Specialized Services",
    subtitle: "High-Value Industry Solutions",
    content: (
      <>
        <strong>Specialized Expertise:</strong>
        <ul>
          <li>Machine Learning & AI implementation</li>
          <li>Enterprise Java & Spring solutions</li>
          <li>Blockchain legal consulting</li>
          <li>Advanced data analytics with Power BI</li>
        </ul>
        <strong>Current Client Portfolio:</strong>
        <ul>
          <li>2 enterprise clients - ML implementation</li>
          <li>3 legal firms - Blockchain consultation</li>
          <li>2 corporations - Business intelligence dashboards</li>
        </ul>
        <strong>Ongoing Projects Value:</strong>
        <ul>
          <li>Multiple long-term contracts</li>
          <li>Recurring maintenance and support agreements</li>
          <li>Training and workshop services</li>
        </ul>
      </>
    ),
  },
];

// ...existing code...


export default function TrainingTimeLine() {
  return (
    <Timeline
      title="My Developer Journey"
      description="A timeline of key milestones in my development career."
      data={trainingTimeline}
    />
  );
}
