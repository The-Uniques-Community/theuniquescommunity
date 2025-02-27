import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import UniquesFormation from "@/assets/img/HowItStarted/1.jpg";
import FirstBatch from "@/assets/img/HowItStarted/2.jpg";
import Naveen from "@/assets/img/HowItStarted/3.jpeg";
import Praveen from "@/assets/img/HowItStarted/3-1.jpeg";
import Uniques2 from "@/assets/img/HowItStarted/4.jpeg";
import ICTA from "@/assets/img/HowItStarted/5.jpeg";

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

const trainingTimeline = [
  {
    title: "First Year",
    subtitle: "Technical & Soft Skills (Second Semester)",
    content: (
      <>
        <strong>Technical Focus:</strong>
        <ul>
          <li>Advanced image editing (Photoshop, Illustrator)</li>
          <li>Responsive front-end development</li>
          <li>Digital marketing strategies</li>
          <li>UI/UX design (user-friendly interfaces, prototype creation)</li>
        </ul>
        <strong>Soft Skills:</strong>
        <ul>
          <li>Communication & personality development</li>
          <li>Mock interviews and group discussions</li>
          <li>Regular assessments to ensure mastery</li>
        </ul>
        <strong>Designing Curriculum (2nd Semester):</strong>
        <ul>
          <li>Unlocking creative potential through design</li>
          <li>Mastering design principles and visual storytelling</li>
          <li>Encouraging innovative and fresh problem-solving approaches</li>
        </ul>
      </>
    ),
  },
  {
    title: "Second Year",
    subtitle: "Programming & Data Management",
    content: (
      <>
        <strong>Backend Development:</strong>
        <ul>
          <li>Designing robust server-side logic</li>
          <li>Database management (SQL/NoSQL) and API creation</li>
        </ul>
        <strong>Advanced Data Structures & Algorithms:</strong>
        <ul>
          <li>In-depth study for efficient data handling</li>
        </ul>
        <strong>Core Languages:</strong>
        <ul>
          <li>Mastery in Core Java and Core Python for enhanced problem-solving</li>
        </ul>
        <strong>3rd Semester Specialization (Split Training):</strong>
        <ul>
          <li>Digital Marketing Training (2 Months) - SEO, social media, and ads</li>
          <li>Java programming under L&T Courses</li>
        </ul>
        <strong>4th Semester (4 Months | ~360 Hours):</strong>
        <ul>
          <li>Advanced Backend & Security: RESTful API design, security best practices</li>
          <li>Tools & Frameworks: Django/Express.js, OAuth, JWT</li>
          <li>Deployment & Cloud: Docker, AWS</li>
          <li>Emphasis on scalable architectures (microservices)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Third Year",
    subtitle: "Cutting-Edge Technologies",
    content: (
      <>
        <strong>Application Development:</strong>
        <ul>
          <li>Designing scalable, efficient, and user-friendly applications</li>
          <li>Hands-on projects and collaborative learning to solve real-world challenges</li>
        </ul>
        <em>Note: Machine Learning and Microsoft Power BI modules are now featured under L&T Courses.</em>
      </>
    ),
  },
  {
    title: "Fourth Year",
    subtitle: "Professional Readiness & Emerging Tech",
    content: (
      <>
        <strong>Career Preparation:</strong>
        <ul>
          <li>Intensive mock interview rounds and online assessments</li>
          <li>Personality Development Program (PDP) with group discussions and public speaking sessions</li>
          <li>Aptitude tests to sharpen problem-solving skills</li>
        </ul>
        <strong>Emerging Technologies:</strong>
        <ul>
          <li>Deep dive into Blockchain development, smart contracts, and decentralized applications (DApps)</li>
          <li>Focus on real-world applications in finance, healthcare, and supply chain management</li>
        </ul>
      </>
    ),
  },
  {
    title: "L&T Courses",
    subtitle: "Industry-Specific Training",
    content: (
      <>
        <ul>
          <li><strong>Machine Learning Fundamentals</strong> - Duration: 1 Month</li>
          <li><strong>Java Programming & Spring Development</strong> - Duration: 1 Month</li>
          <li><strong>Blockchain Legal Consultant</strong> - Duration: 1 Month</li>
          <li><strong>Microsoft Power BI</strong> - Duration: 1 Month</li>
        </ul>
      </>
    ),
  },
];


export default function TrainingTimeLine() {
  return (
    <Timeline
      title="My Developer Journey"
      description="A timeline of key milestones in my development career."
      data={trainingTimeline}
    />
  );
}
