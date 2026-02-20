import React from "react";

const Button = ({
  type = "button",
  label,
  disabled = false,
  className = "",
  onClick,
  Icons,
  rIcons,
  variant = "primary", // "primary", "outline", "ghost", "red"
  size = "md", // "sm", "md", "lg"
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  const variantClasses =
    variant === "outline"
      ? "border-2 border-[#213554] text-[#213554] bg-transparent hover:bg-[#213554] hover:text-white relative overflow-hidden group"
      : variant === "ghost"
      ? "text-[#213554] bg-[#EE334B] hover:bg-[#213554]/5 relative overflow-hidden group"
      : variant === "red"
      ? "bg-gradient-to-r from-[#EE334B] to-[#EE334B]/90 text-white shadow-md hover:from-[#EE334B] hover:to-[#EE334B]/80 hover:shadow-lg hover:text-white relative overflow-hidden group"
      : // primary (default)
        "bg-gradient-to-r from-[#213554] to-[#213554]/90 text-white shadow-md hover:from-[#EE334B] hover:to-[#EE334B]/90 hover:shadow-lg hover:text-white relative overflow-hidden group";

  // Ensure white text for primary and red variants even if className overrides
  const buttonStyle = (variant === "primary" || variant === "red") ? { color: "#ffffff" } : {};
  
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClasses} cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      style={buttonStyle}
    >
      {/* Animated background effect - left to right */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icons && <span className="text-lg" style={(variant === "primary" || variant === "red") ? { color: "#ffffff" } : {}}>{Icons}</span>}
        <span style={(variant === "primary" || variant === "red") ? { color: "#ffffff" } : {}}>{label}</span>
        {rIcons && <span className="text-lg" style={(variant === "primary" || variant === "red") ? { color: "#ffffff" } : {}}>{rIcons}</span>}
      </span>
    </button>
  );
};

export default Button;
