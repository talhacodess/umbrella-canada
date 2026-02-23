import React from "react";

const Button = ({
  type = "button",
  label,
  disabled = false,
  className = "",
  onClick,
  Icons,
  rIcons,
  variant = "primary", // "primary", "outline", "ghost", "red", "white"
  size = "md",         // "sm", "md", "lg"
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden group btn-base";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  const variantClasses = {
    primary: "bg-gradient-to-br from-[#192133] to-[#0f1622] text-white shadow-md focus:ring-[#192133] btn-primary",
    outline:  "border-2 border-[#192133] text-[#192133] bg-transparent focus:ring-[#192133] btn-outline",
    ghost:    "text-[#192133] bg-transparent focus:ring-[#192133] btn-ghost",
    red:      "bg-gradient-to-br from-[#AC292A] to-[#8B1F20] text-white shadow-md focus:ring-[#AC292A] btn-red",
    white:    "border-2 border-white text-white bg-transparent focus:ring-white btn-white",
  }[variant] ?? "";

  const forceWhite = variant === "primary" || variant === "red" || variant === "white";

  return (
    <>
      <style>{`
        /* ── Shared ── */
        .btn-base { transition: transform 0.15s ease, box-shadow 0.3s ease; }
        .btn-base:not(:disabled):active { transform: scale(0.95); }

        /* ── Primary: maroon radial ripple from center ── */
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 50%, #AC292A 0%, #8B1F20 100%);
          transform: scale(0);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }
        .btn-primary:not(:disabled):hover::before {
          transform: scale(2.8);
          opacity: 1;
        }
        /* shimmer after-pass */
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -70%;
          width: 45%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-15deg);
          transition: left 0s;
        }
        .btn-primary:not(:disabled):hover::after {
          left: 140%;
          transition: left 0.65s ease 0.1s;
        }
        .btn-primary:not(:disabled):hover {
          box-shadow: 0 8px 26px rgba(172,41,42,0.4);
        }

        /* ── Red: diagonal stripe wipe ── */
        .btn-red::before {
          content: '';
          position: absolute;
          top: -10%; left: -110%;
          width: 100%; height: 120%;
          background: linear-gradient(105deg, #8B1F20 40%, #6b1618 100%);
          transform: skewX(-10deg);
          transition: left 0.42s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-red:not(:disabled):hover::before { left: 10%; }
        .btn-red:not(:disabled):hover {
          box-shadow: 0 8px 26px rgba(172,41,42,0.4);
        }

        /* ── Outline: fill slides up from bottom ── */
        .btn-outline::before {
          content: '';
          position: absolute;
          left: 0; bottom: -101%;
          width: 100%; height: 100%;
          background: #192133;
          transition: bottom 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-outline:not(:disabled):hover::before { bottom: 0; }
        .btn-outline:not(:disabled):hover {
          color: #ffffff !important;
          box-shadow: 0 6px 18px rgba(25,33,51,0.25);
        }

        /* ── Ghost: expanding spotlight glow + color shift ── */
        .btn-ghost::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 50%, rgba(172,41,42,0.13) 0%, transparent 70%);
          transform: scale(0.6);
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.3s ease;
        }
        .btn-ghost:not(:disabled):hover::before {
          transform: scale(1.6);
          opacity: 1;
        }
        .btn-ghost:not(:disabled):hover { color: #AC292A !important; }

        /* ── White: maroon fill slides in from left ── */
        .btn-white::before {
          content: '';
          position: absolute;
          top: 0; left: -101%;
          width: 100%; height: 100%;
          background: #AC292A;
          transition: left 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-white:not(:disabled):hover::before { left: 0; }
        .btn-white:not(:disabled):hover {
          border-color: #AC292A !important;
          box-shadow: 0 8px 24px rgba(172,41,42,0.35);
        }

        /* Inner content color transition for outline / ghost */
        .btn-outline .btn-inner,
        .btn-ghost .btn-inner {
          transition: color 0.3s ease;
        }
      `}</style>

      <button
        onClick={onClick}
        type={type}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
        disabled={disabled}
        style={forceWhite ? { color: "#ffffff" } : {}}
      >
        <span className="btn-inner relative z-10 flex items-center justify-center gap-2">
          {Icons  && <span className="text-lg">{Icons}</span>}
          <span>{label}</span>
          {rIcons && <span className="text-lg">{rIcons}</span>}
        </span>
      </button>
    </>
  );
};

export default Button;