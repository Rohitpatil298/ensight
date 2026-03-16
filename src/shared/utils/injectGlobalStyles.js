/**
 * Injects global styles for keyframes and custom classes
 * This prevents duplication across multiple components
 */
export const injectGlobalStyles = () => {
  // Check if styles are already injected
  if (document.head.querySelector("[data-survey-styles]")) {
    return;
  }

  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-survey-styles", "");
  styleTag.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(229,57,53,0.35); }
      70%  { box-shadow: 0 0 0 8px rgba(229,57,53,0); }
      100% { box-shadow: 0 0 0 0 rgba(229,57,53,0); }
    }
    @keyframes rowIn {
      from { opacity: 0; transform: translateX(-12px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slowDrift {
      0%   { transform: scale(1)   translate(0px, 0px); }
      33%  { transform: scale(1.04) translate(-8px, 6px); }
      66%  { transform: scale(1.02) translate(6px, -4px); }
      100% { transform: scale(1)   translate(0px, 0px); }
    }
    .survey-row {
      animation: rowIn 0.35s ease forwards;
    }
    .tab-btn {
      position: relative;
      overflow: hidden;
      transition: all 0.25s ease !important;
    }
    .tab-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.12);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .tab-btn:hover::after { opacity: 1; }
    .icon-btn-hover {
      transition: transform 0.2s ease, color 0.2s ease !important;
    }
    .icon-btn-hover:hover {
      transform: scale(1.2) !important;
    }
  `;
  
  document.head.appendChild(styleTag);
};
