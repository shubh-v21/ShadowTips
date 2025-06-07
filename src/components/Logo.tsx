import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const sizeClass = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl lg:text-5xl",
  };

  return (
    <div className="font-black tracking-wider">
      <span className={`${sizeClass[size]} cyberpunk-glow`} style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}>
        <span className="text-cyan-400">SHADOW</span>
        <span className="text-blue-400">TIPS</span>
      </span>
    </div>
  );
};

export default Logo;
