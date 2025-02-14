import React from "react";
import { useTheme } from "@mui/material/styles";
import Footer from "@/utils/Footer/Footer";
import BlogCard from "@/utils/Card/BlogCard";
import { blogData } from "@/assets/dummyData/blogData";
import { reviews } from "@/assets/dummyData/reviewData";
import tu from "@/assets/logos/theuniquesCommunity.png";
import CallToAction from "./homComponents/CallToAction";
import LandingStats from "./homComponents/LandingStats";
import AboutSection from "./homComponents/AboutSection";
import TrainingTabs from "./homComponents/TrainingTabs";
import ReviewCard from "@/utils/Card/ReviewCard";
// import ShapedCard from "@/utils/Card/ShapedCard";
import CorporateCultureSection from "./homComponents/CorporateCultureSection";
const index = () => {
  const theme = useTheme();
  return (
    <div>
      {/* <Navbar /> */}
      <section>
        <div className="">
          <section className="relative lg:h-screen bg-gray-50">
            <div className="px-4 py-12 sm:py-16 sm:px-6 lg:px-0 lg:max-w-7xl lg:mx-auto lg:py-24 xl:py-36 lg:grid lg:grid-cols-2">
              <div className="lg:pr-8">
                <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                  <img src={tu} className="mb-5 w-full object-center" alt="" />
                  <h1 className="text-xl font-medium text-gray-900 sm:text-xl lg:text-xl">
                    Community of designers{" "}
                    <span className="inline">
                      <img
                        className="inline w-auto h-5 sm:h-7 lg:h-8"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-1.svg"
                        alt="shape-1"
                      />
                    </span>{" "}
                    made by designers
                    <span className="inline">
                      <img
                        className="inline w-auto h-5 sm:h-7 lg:h-8"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-2.svg"
                        alt="shape-2"
                      />
                    </span>
                  </h1>
                  <p className="mt-6 text-base font-normal leading-7 text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vehicula massa in enim luctus. Rutrum arcu.
                  </p>
                  <svg
                    className="w-auto h-4 mt-8 text-gray-300"
                    viewbox="0 0 172 16"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
                    ></line>
                  </svg>
                  <p className="mt-8 text-base font-bold text-gray-900">
                    Join to get free updates every week
                  </p>
                  <form action="#" method="post" className="relative mt-4">
                    <div className="absolute transitiona-all duration-1000 opacity-30 inset-0 bg-gradient-to-r from-black via-[#FF44EC] to-[#ca0019] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                    <div className="relative space-y-4 sm:flex sm:space-y-0 sm:items-end">
                      <div className="flex-1">
                        <label for="" className="sr-only">
                          Email address
                        </label>
                        <div>
                          <input
                            type="email"
                            name=""
                            id=""
                            className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        Join Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col items-center justify-center overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div
                  className="flex justify-start w-full gap-6 pb-8 overflow-x-auto [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-200
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400 snap-x"
                >
                  {blogData.slice(0, 3).map((blog, index) => (
                    <BlogCard
                      key={index}
                      title={blog.title}
                      description={blog.description}
                      category={blog.category}
                      readTime={blog.readTime}
                      image={blog.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="spacer py-10"></div>
      <section>
        <AboutSection />
      </section>
      <div className="spacer py-10"></div>
      <section>
        <CorporateCultureSection />
      </section>
      <div className="spacer py-10"></div>
      <section>
        <LandingStats />
      </section>
      <div className="spacer py-10"></div>
      <section>
        <TrainingTabs />
      </section>
      <div className="spacer py-10"></div>
      <div>
        <div className="lg:ps-16 px-6">
          <h4 className="text-sm uppercase text-center text-gray-600 mb-2">
            About Our training
          </h4>
          <h2 className="text-3xl text-center lg:text-4xl font-bold mb-8">
            A new way to manage your
            <br />
            online money.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 lg:px-16 px-6 py-4 lg:py-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
      <div className="spacer py-10"></div>
      <div className="my-6">
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default index;
