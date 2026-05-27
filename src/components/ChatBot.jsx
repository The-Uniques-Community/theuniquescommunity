import React, { useState } from "react";
import { motion } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setHasDragged(true)}
      onDragEnd={() => {
        // Small delay to prevent click event right after drag ends
        setTimeout(() => setHasDragged(false), 50);
      }}
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        // Improve dragging on mobile
        touchAction: "none"
      }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 20,
          scale: isOpen ? 1 : 0.95,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: 400,
          height: 600,
          borderRadius: 12,
          boxShadow: "0 5px 40px rgba(0, 0, 0, 0.16)",
          overflow: "hidden",
          marginBottom: 20,
          backgroundColor: "white",
          position: "relative",
          display: "block",
          // Prevent interactions when closed
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            background: "linear-gradient(90deg,#ca0019,#e63946)",
            color: "#ffffff",
            borderRadius: "12px 12px 0 0",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            cursor: "grab",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700 }}>The Uniques</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Chat Support</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              color: "#000000",
            }}
          >
            ✕
          </button>
        </div>

        {/* Iframe */}
        <iframe
          src="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/11/13/20260511131329-JHRNIFEP.json"
          title="The Uniques Community Chatbot"
          style={{
            width: "100%",
            height: "calc(100% - 56px)",
            border: "none",
            borderRadius: "0 0 12px 12px",
            // Need pointer events on iframe for chat interactions
            pointerEvents: "auto",
          }}
        />
      </motion.div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.9 : 1 }}
          style={{
            padding: "10px 14px",
            background: "#ffffff",
            color: "#111827",
            borderRadius: 20,
            fontWeight: 600,
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
            cursor: "grab",
            userSelect: "none",
            whiteSpace: "nowrap",
            pointerEvents: isOpen ? "none" : "auto",
          }}
        >
          I'm here to help
        </motion.div>

        <div
          role="button"
          onClick={(e) => {
            if (!hasDragged) {
              setIsOpen(!isOpen);
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#dc143c",
            color: "white",
            border: "none",
            cursor: "grab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.18s ease",
            transform: isHovered && !hasDragged ? "scale(1.06)" : "scale(1)",
            padding: 6,
          }}
        >
          {!isOpen ? (
            <img
              src="https://www.jalaitech.com/floating/Aibot.png"
              alt="Chatbot"
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
                pointerEvents: "none",
              }}
            />
          ) : (
            <span style={{ fontSize: 28, pointerEvents: "none" }}>✕</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBot;
