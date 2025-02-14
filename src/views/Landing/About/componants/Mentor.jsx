import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import ankursir from "../../../../assets/img/About/ankursir.jpg";

export default function MentorSection() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-12 p-8 md:p-16 max-w-7xl mx-auto">
      {/* Mentor Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={ankursir}
          alt="Mentor"
          className="w-96 h-96 md:w-[450px] md:h-[450px] object-cover rounded-lg shadow-xl"
        />
      </div>

      {/* Mentor Info */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Our Founder</h2>
        <p className="mt-6 text-sm md:text-sm text-gray-600">
        A distinguished instructional management specialist with an illustrious track record spanning over a decade. His expertise traverses the realms of Academics, Research & Innovation, Administration, Public Relations, Business Strategy, Brand Management, and Corporate Relations.

          <br /><br />
          He stands as the proud Founder of the pioneering IT incubation center within our campus, aptly named UNIQUE ZONE. This incubation center stands as a testament to his commitment to providing a nurturing environment for students, where innovative ideas evolve into practical solutions. Through his transformative leadership, he has fostered an ecosystem that empowers students to transcend boundaries and turn their aspirations into reality.          <br /><br />
          As the Founder of this community, He epitomizes a strategic thinker and a dynamic force in the Corporate & Education Sector. His vision extends beyond conventional boundaries, driving a culture of excellence, creativity, and innovation..
          </p>

        <p className="mt-4 text-sm md:text-sm text-gray-500 font-medium">
          Director of Operations | Ankur Gill
        </p>

        {/* Social Media Icons */}
        <div className="mt-4 flex justify-center md:justify-start gap-6 text-gray-600">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-700 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
