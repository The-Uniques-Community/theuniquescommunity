// src/sections/LatestProjectsSection.jsx
import BlogCard2 from "@/utils/Card/BlogCard2";
import { Typography } from "@mui/material";

export default function BlogSection() {
  return (
    <section className="bg-slate-950 text-white px-6 md:px-16 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div>
          <Typography variant="h3" className="font-bold text-white">
            Latest <br /> Projects
          </Typography>
          <p className="text-slate-400 mt-4">
            Meet Our Exceptional Team! Our diverse talents converge to create a
            dynamic force.
          </p>

          <div className="mt-10">
            <BlogCard2
              title="UX review presentations"
              subtitle="Unveiling the Talent Behind Our Success"
              imgSrc="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col justify-between">
          <BlogCard2
            title="Navigating the Migration"
            subtitle="Unveiling the Faces Behind Excellence"
            imgSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between">
          <BlogCard2
            title="Building a Robust Inventory"
            subtitle="Faces Behind Our Success"
            imgSrc="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </section>
  );
}
