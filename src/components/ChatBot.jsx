import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleChat = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}
    >
      {/* Chat Window - Sits directly at bottom right when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              width: "min(390px, calc(100vw - 32px))",
              height: "min(580px, calc(100dvh - 36px))",
              borderRadius: 16,
              boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.3), 0 8px 24px -4px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px",
                background: "linear-gradient(135deg, #ca0019 0%, #980013 100%)",
                color: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="https://www.jalaitech.com/floating/Aibot.png"
                    alt="Bot Avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.2 }}>The Uniques</div>
                  <div style={{ fontSize: 11, opacity: 0.9, display: "flex", alignItems: "center", gap: 5 }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                        display: "inline-block",
                      }}
                    />
                    Online Support
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleChat}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  cursor: "pointer",
                  color: "#ffffff",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>

            {/* Iframe */}
            <div style={{ flex: 1, position: "relative", width: "100%", height: "calc(100% - 52px)" }}>
              <iframe
                src="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/11/13/20260511131329-JHRNIFEP.json"
                title="The Uniques Community Chatbot"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                  pointerEvents: "auto",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button & Tooltip (Shown ONLY when closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 12, pointerEvents: "auto" }}
          >
            <div
              style={{
                padding: "8px 14px",
                background: "#ffffff",
                color: "#1f2937",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                userSelect: "none",
                whiteSpace: "nowrap",
                border: "1px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
              onClick={toggleChat}
            >
              👋 Need help? Chat with us!
            </div>

            <motion.button
              type="button"
              onClick={toggleChat}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                backgroundColor: "#ca0019",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 20px rgba(202, 0, 25, 0.35)",
                padding: 0,
                outline: "none",
                position: "relative",
              }}
              aria-label="Open chatbot"
            >
              <img
                src="https://www.jalaitech.com/floating/Aibot.png"
                alt="Chatbot"
                draggable="false"
                style={{
                  width: 44,
                  height: 44,
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
