import React from 'react';
import Mission from "@/assets/img/About/MISSION.png"
import Vision from "@/assets/img/About/VISION.png"

const VisionMission = () => {
  return (
    <section className="py-10  sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Our Vision & Mission
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Empowering individuals to thrive in the rapidly evolving landscape of technology and entrepreneurship.
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:mt-20">
          <div className="flex flex-col items-center lg:flex-row lg:space-x-12">
            <div className="flex-shrink-0">
              <img
                className="w-16 h-16"
                src={Vision}
                alt="Vision Icon"
              />
            </div>
            <div className="mt-6 lg:mt-0">
              <h3 className="text-2xl font-semibold text-black">Our Vision</h3>
              <p className="mt-4 text-base text-gray-600">
                To bridge the gap between academia and industry, fostering meaningful connections and uplifting educational standards globally.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center lg:flex-row lg:space-x-12">
            <div className="flex-shrink-0">
              <img
                className="w-20 h-16"
                src={Mission}
                alt="Mission Icon"
              />
            </div>
            <div className="mt-6 lg:mt-0">
              <h3 className="text-2xl font-semibold text-black">Our Mission</h3>
              <p className="mt-4 text-base text-gray-600">
                To provide an educational platform accessible to everyone, everywhere, transforming students into skilled business consultants and entrepreneurs through practical learning and industry collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
