import WordleLogo from "/Wordle-logo.svg";

const Hero = () => {
  return (
    <div className="flex-1 hidden lg:flex min-h-[16rem] p-8 justify-center items-center flex-col gap-5 text-center">
      <img src={WordleLogo} alt="Logo" className="hero-logo w-36 h-36 object-contain" />
      <h2 className="max-w-xl text-3xl font-black text-white text-balance">Word Guessing Game - Unlimited</h2>
    </div>
  );
};

export default Hero;
