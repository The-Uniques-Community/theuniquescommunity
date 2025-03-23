import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTwitter, FaEnvelope, FaTimes } from "react-icons/fa";
import ankurImg from "../../../../assets/img/About/ankur.png"; // Ensure this path is correct

// Reusable Modal component using portals with a close button
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        >
          <FaTimes size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const ProfileCard = ({ isOpen, onClose }) => {
  // Default to step 2 (Copy The Snippet) if desired
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Modal isOpen={isOpen} sx={{marginTop:"40px"}} onClose={onClose}>
      <div className="bg-gray-50  w-[90%]  rounded-xl max-h-[78vh] mx-auto overflow-auto">
        <div className="p-6 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6 relative mx-auto">
          {/* Left Section - Clipped Image & Icons */}
          <div className="relative w-full lg:w-1/2 h-80 flex justify-center">
            <div className="w-full">
              {/* Animated Image */}
              <motion.svg
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                width="100%"
                height="auto"
                viewBox="0 0 342 265"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="aboutClip">
                    <path d="M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z" />
                  </clipPath>
                </defs>
                <image
                  href={ankurImg}
                  width="342"
                  height="265"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#aboutClip)"
                />
              </motion.svg>

              {/* Animated Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-2 left-28 flex space-x-3 p-2"
              >
                {[FaInstagram, FaLinkedin, FaTwitter, FaEnvelope].map(
                  (Icon, index) => (
                    <button
                      key={index}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <Icon className="text-gray-700" />
                    </button>
                  )
                )}
              </motion.div>
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="flex-grow space-y-3 text-center lg:text-left">
  <h2 className="text-2xl font-semibold">Ankur Gill</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-base">
    <p>Founder - The Uniques Community</p>
    <p>100+ Student Mentorship</p>
    <p>2118 Thornridge Cir, Syracuse, CT</p>
    <p>(205) 555-0100</p>
    <p>michelle.rivera@example.com</p>
  </div>
</div>  

          {/* Manager Info */}
          <motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7, delay: 1 }}
  className="absolute top-0 right-0 m-10 bg-white rounded-full shadow-md px-6 py-1 text-xs font-semibold"
>
  Founder
</motion.div>
        </div>
        <div className="bg-gray-200 w-40 h-12 rounded-t-3xl flex items-center justify-center ml-28">
          <h3 className="text-lg font-semibold">Startup</h3>
        </div>
        <section className="bg-gray-200 rounded-t-[10%] relative overflow-hidden z-[1] px-4 py-8">
  <div className="container relative">
    <div className="grid grid-cols-12 relative">
      <div className="col-span-12 md:col-start-3 md:col-span-10 lg:col-start-4 lg:col-span-6"></div>
    </div>
    <div className="grid grid-cols-12 mt-20">
      <div className="col-span-12 lg:col-span-5">
        <ul className="relative z-[1] sm:pl-[125px] before:bg-gradient-to-b before:from-[rgba(0,0,0,0.19)] dark:before:from-slate-700 before:to-80% before:to-transparent before:left-0 before:-top-[8px] before:w-[77px] before:h-full before:rounded-full">
          <li
            className={`relative cursor-pointer ${activeStep === 1 ? "opacity-100" : "opacity-50"}`}
            onMouseEnter={() => setActiveStep(1)}
            onClick={() => setActiveStep(1)}
            onTouchStart={() => setActiveStep(1)}
          >
            <span className="hidden sm:flex justify-center items-center absolute w-[60px] h-[60px] -left-[117px] top-0 bg-black rounded-full text-[20px] text-white font-display shadow-[3px_0_0_#6e36c9]">
              <span>01</span>
            </span>
            <h4 className="display-xs-medium md:display-s-medium font-display">
              godigitify Nexus
            </h4>
            <p className="text-sm-regular mt-3">
              A company providing innovative digital solutions to transform businesses.
            </p>
          </li>
          <li
            className={`relative cursor-pointer mt-12 ${activeStep === 2 ? "opacity-100" : "opacity-50"}`}
            onMouseEnter={() => setActiveStep(2)}
            onClick={() => setActiveStep(2)}
            onTouchStart={() => setActiveStep(2)}
          >
            <span className="hidden sm:flex justify-center items-center absolute w-[60px] h-[60px] -left-[117px] top-0 bg-black rounded-full text-[20px] text-white font-display shadow-[3px_0_0_#6e36c9]">
              <span>02</span>
            </span>
            <h4 className="display-xs-medium md:display-s-medium font-display">
              Techlearns Academy
            </h4>
            <p className="text-sm-regular mt-3">
              A startup dedicated to enhancing student careers through innovative learning solutions.
            </p>
          </li>
          <li
            className={`relative cursor-pointer mt-12 ${activeStep === 3 ? "opacity-100" : "opacity-50"}`}
            onMouseEnter={() => setActiveStep(3)}
            onClick={() => setActiveStep(3)}
            onTouchStart={() => setActiveStep(3)}
          >
            <span className="hidden sm:flex justify-center items-center absolute w-[60px] h-[60px] -left-[117px] top-0 bg-black rounded-full text-[20px] text-white font-display shadow-[3px_0_0_#6e36c9]">
              <span>03</span>
            </span>
            <h4 className="display-xs-medium md:display-s-medium font-display">
              Click Master
            </h4>
            <p className="text-sm-regular mt-3">
              A startup empowering local photographers to showcase their creativity and grow their business.
            </p>
          </li>
        </ul>
      </div>
      <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex items-center relative mt-8 lg:mt-0">
        <div className="relative w-full">
          {activeStep === 1 && (
            <img
              src="https://assets.easyfrontend.com/tailwind/images/resources-easyfrontend.png"
              alt="godigitify Nexus Digital Solutions"
              className="w-full rounded-lg shadow-3xl"
            />
          )}
          {activeStep === 2 && (
            <img
              src="https://assets.easyfrontend.com/tailwind/images/copy-code-easyfrontend.png"
              alt="Techlearns Academy Career Enhancement"
              className="w-full rounded-lg shadow-3xl"
            />
          )}
          {activeStep === 3 && (
            <img
              src="https://assets.easyfrontend.com/tailwind/images/use-code-easyfrontend.png"
              alt="Click Master Empowering Photographers"
              className="w-full rounded-lg shadow-3xl"
            />
          )}
        </div>
      </div>
    </div>
  </div>
</section>

      </div>
    </Modal>
  );
};

export default ProfileCard;
