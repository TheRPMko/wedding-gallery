// Intro.tsx

const Intro: React.FC = () => {
  return (
    <div className="welcome-container">
      <img
        src="/invite_top_left.svg"
        className="absolute h-[100vh] left-0 top-5 pointer-events-none"
      />
      <img
        src="/main-optimized.svg"
        className="absolute h-[80vh] pointer-events-none"
      />
      <img
        src="/invite_top_right.svg"
        className="absolute h-[100vh] right-0 -top-55 pointer-events-none"
      />
    </div>
  );
};

export default Intro;
