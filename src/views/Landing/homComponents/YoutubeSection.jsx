import React, { useState } from "react";
import { Play, Youtube, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const YoutubeSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = "Ay47OixDr2M";
  const channelUrl = "https://www.youtube.com/@TheUniquesOfficial";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#ca0019]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#ca0019]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="border-l-2 border-[#ca0019] h-6" />
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ca0019]">
              Our Channel
            </p>
            <span className="border-r-2 border-[#ca0019] h-6" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            The Uniques Community{" "}
            <span className="text-[#ca0019] relative inline-block">
              is Live
            </span>{" "}
            on YouTube
          </h2>

          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Watch our story, events, and community moments — all captured and shared live on our YouTube channel.
          </p>
        </div>

        {/* Main Content: Video + Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Video Player — 3/5 width */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group bg-black aspect-video">
              {isPlaying ? (
                <iframe
                  src={embedUrl}
                  title="The Uniques Community YouTube Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Thumbnail */}
                  <img
                    src={thumbnailUrl}
                    alt="The Uniques Community Video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />

                  {/* Play Button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 rounded-full bg-[#ca0019] flex items-center justify-center shadow-[0_0_40px_rgba(202,0,25,0.5)] group-hover:shadow-[0_0_60px_rgba(202,0,25,0.7)] transition-shadow duration-300"
                    >
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </motion.div>
                  </button>

                  {/* YouTube badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span>YouTube</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Side Panel — 2/5 width */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Channel Identity Card */}
            <div className="rounded-2xl p-6 bg-white dark:bg-[#424D53] border border-gray-100 dark:border-gray-700 shadow-md">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#ca0019] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Youtube className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">The Uniques Official</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@TheUniquesOfficial</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Subscribe to our channel for event highlights, tech talks, member stories, and behind-the-scenes community moments.
              </p>
            </div>

            {/* Feature Highlights */}
            {[
              { emoji: "🎥", title: "Event Recaps", desc: "Relive every seminar, hackathon, and workshop." },
              { emoji: "💡", title: "Tech Talks", desc: "Insights from industry experts and community leaders." },
              { emoji: "❤️", title: "Community Stories", desc: "Real journeys from real Uniques members." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#424D53] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <motion.a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-[#ca0019] hover:bg-[#a80015] text-white font-semibold text-sm shadow-lg shadow-[#ca0019]/30 transition-colors"
            >
              <Youtube className="w-5 h-5" />
              Visit Our Channel
              <ExternalLink className="w-4 h-4 opacity-80" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;
