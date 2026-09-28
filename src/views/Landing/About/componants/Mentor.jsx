import { useState } from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import ankursir from "../../../../assets/img/About/ankursir.webp";
import Button from "../../../../utils/Buttons/HoverButton";
import ProfileCard from "./Ankur1";
import { useThemeContext } from "../../../../theme/ThemeProvider";

export default function MentorSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isDarkMode } = useThemeContext();

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? "bg-[#161616] text-white" : "bg-white text-gray-900"}`}>
      <div className="w-[85%] max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col justify-start">
          <div className="flex mb-3 items-center">
            <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
              OUR FOUNDER
            </h2>
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Visionary Leadership,
            <span className="text-[#ca0019] text-2xl md:text-5xl md:py-2 block">
              Inspiring Generations
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mt-6">
          {/* Mentor Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={ankursir}
              alt="Mentor"
              loading="lazy"
              decoding="async"
              className="w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] object-cover rounded-2xl shadow-xl border border-black/5 dark:border-white/10"
            />
          </div>

          {/* Mentor Info */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              A distinguished instructional management specialist with an illustrious track record spanning over a decade. His expertise traverses the realms of Academics, Research & Innovation, Administration, Public Relations, Business Strategy, Brand Management, and Corporate Relations.
              <br />
              <br />
              He stands as the proud Founder of the pioneering IT incubation center within our campus, aptly named UNIQUE ZONE. This incubation center stands as a testament to his commitment to providing a nurturing environment for students, where innovative ideas evolve into practical solutions.
              <br />
              <br />
              As the Founder of this community, he epitomizes a strategic thinker and a dynamic force in the Corporate & Education Sector, driving a culture of excellence, creativity, and innovation.
            </p>

            {/* Social Links & Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  Director of Operations | Ankur Gill
                </p>
                <div className="mt-3 flex justify-center md:justify-start gap-5 text-gray-600 dark:text-gray-300">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ca0019] transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ca0019] transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ca0019] transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>

              <div>
                <Button className="px-5 py-2.5 text-xs font-bold" onClick={() => setModalOpen(true)}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <ProfileCard isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
