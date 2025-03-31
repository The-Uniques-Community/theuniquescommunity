import BlogCard2 from "@/utils/Card/BlogCard2";

export default function BlogSection() {
  return (
    <section className="mx-auto container bg-white text-black px-6 md:px-16 py-20">
      <div className=" flex flex-col align-middle justify-start">
        <div className="flex mb-5 items-center">
          <span className="border-l-2 border-[#ca0019] h-6 mr-3"></span>
          <h1 className="text-sm md:text-lg font-bold capitalize">
            Our Projects
          </h1>
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold max-w-5xl">
          Crafted with Passion
          <span className="text-[#ca0019] text-2xl md:text-5xl md:py-2 block mb-5">
            Driven by Excellence
          </span>
        </h1>
      </div>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-28">
        {/* Left Column - Base Level */}
        <div className="mt-28 md:mt-28 sm:mt-0 flex flex-col align-middle justify-end">
          <BlogCard2
            title="UX Review Presentations"
            subtitle="Unveiling the Talent Behind Our Success"
            imgSrc="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        {/* Middle Column - Slightly Higher */}
        <div className="mt-10 md:mt-10 sm:mt-0 flex flex-col align-middle justify-start">
          <BlogCard2
            title="Navigating the Migration"
            subtitle="Unveiling the Faces Behind Excellence"
            imgSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        {/* Right Column - Highest */}
        <div className="-mt-10 md:-mt-28 sm:mt-0 flex flex-col align-middle justify-start">
          <BlogCard2
            title="Building a Robust Inventory"
            subtitle="Innovating for a Better Tomorrow"
            imgSrc="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>

    </section>
  );
}
