import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    // Create and inject Botpress iframe
    const createChatbot = () => {
      // Check if already exists
      if (document.getElementById("bp-web-widget-container")) return;

      // Create container
      const container = document.createElement("div");
      container.id = "bp-web-widget-container";
      container.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        width: 400px;
        height: 600px;
        border-radius: 12px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
        overflow: hidden;
        display: none;
      `;

      // Create iframe (placed under a custom header so header won't be hidden)
      const iframe = document.createElement("iframe");
      iframe.src = "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/11/13/20260511131329-JHRNIFEP.json";
      iframe.style.cssText = `
        position: absolute;
        top: 56px; /* leave space for custom header */
        left: 0;
        width: 100%;
        height: calc(100% - 56px);
        border: none;
        border-radius: 0 0 12px 12px;
        z-index: 1;
      `;
      iframe.title = "The Uniques Community Chatbot";

      container.appendChild(iframe);
      document.body.appendChild(container);

      // Create a header bar (keeps controls outside the iframe so Share isn't hidden)
      const header = document.createElement("div");
      header.id = "bp-chat-header";
      header.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        background: linear-gradient(90deg,#ca0019,#e63946);
        color: #ffffff;
        z-index: 10003;
        border-radius: 12px 12px 0 0;
        box-shadow: 0 6px 18px rgba(0,0,0,0.12);
      `;

      const titleWrap = document.createElement("div");
      titleWrap.style.cssText = "display:flex;align-items:center;gap:10px";
      const titleText = document.createElement("div");
      titleText.innerHTML = `<div style='font-weight:700'>The Uniques</div><div style='font-size:12px;opacity:0.9'>Chat Support</div>`;
      titleWrap.appendChild(titleText);

      const closeBtnHeader = document.createElement("button");
      closeBtnHeader.title = "Close";
      closeBtnHeader.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
        z-index: 10004;
        box-shadow: 0 6px 18px rgba(0,0,0,0.12);
        color: #000000;
      `;
      closeBtnHeader.innerText = "✕";
      closeBtnHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        container.style.display = "none";
        if (img) img.style.display = "block";
        button.innerHTML = "";
        button.appendChild(img);
        button.style.fontSize = "inherit";
        button.style.color = "inherit";
        if (label) label.style.display = "flex";
      });

      header.appendChild(titleWrap);
      header.appendChild(closeBtnHeader);
      container.appendChild(header);

      // Create left-side label "I'm here to help"
      const label = document.createElement("div");
      label.id = "bp-chat-label";
      label.style.cssText = `
        position: fixed;
        bottom: 38px;
        left: 110px;
        z-index: 9997;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 14px;
        background: #ffffff;
        color: #111827;
        border-radius: 20px;
        font-weight: 600;
        box-shadow: 0 4px 18px rgba(0,0,0,0.12);
        cursor: default;
        user-select: none;
        white-space: nowrap;
      `;
      label.textContent = "I'm here to help";
      document.body.appendChild(label);

      // Create toggle button using provided PNG and red background
      const button = document.createElement("button");
      button.id = "bp-chat-toggle";
      button.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: #dc143c; /* red background */
        color: white;
        border: none;
        cursor: pointer;
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.18s ease;
        padding: 6px;
      `;

      // Use the user-provided PNG as the icon inside the button
      const img = document.createElement("img");
      img.src = "https://www.jalaitech.com/floating/Aibot.png";
      img.alt = "Chatbot";
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        display: block;
      `;

      // Add simple hover effect
      button.addEventListener("mouseover", () => {
        button.style.transform = "scale(1.06)";
      });

      button.addEventListener("mouseout", () => {
        button.style.transform = "scale(1)";
      });

      // Toggle iframe visibility and swap icon to close mark when open
      button.addEventListener("click", () => {
        const isVisible = container.style.display === "flex";
        container.style.display = isVisible ? "none" : "flex";
        if (!isVisible) {
          // opening: hide image, show close mark, hide label
          img.style.display = "none";
          button.innerHTML = "✕";
          button.style.fontSize = "28px";
          button.style.color = "#fff";
          if (label) label.style.display = "none";
        } else {
          // closing: restore image and label
          button.innerHTML = "";
          button.appendChild(img);
          img.style.display = "block";
          button.style.fontSize = "inherit";
          button.style.color = "inherit";
          if (label) label.style.display = "flex";
        }
      });

      button.appendChild(img);
      document.body.appendChild(button);
    };

    // Create chatbot when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createChatbot);
    } else {
      createChatbot();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", createChatbot);
    };
  }, []);

  return null;
};

export default ChatBot;
