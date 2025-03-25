//ScrollButton.tsx

import { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="fixed bottom-0 right-0">
      <button
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
        className="btn btn-ghost bg-[#242424] mr-8 mt-2 mb-6 rounded-none outline-1 hover:outline-1 hover:scale-125 transition-all duration-100 ease-in"
      >
        ⇧
      </button>
    </div>
  );
};

export default ScrollButton;
