import React, { useState } from "react";

const Input = ({
  label,
  placeholder,
  name,
  type = "text",
  className = "",
  onChange,
  value,
  Icon,
  required,
  onBlur,
  star,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
  

        .input-field {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #192133;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(25, 33, 51, 0.04);
        }

        .input-field::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .input-field:hover:not(:disabled) {
          border-color: #192133;
          box-shadow: 0 1px 4px rgba(25, 33, 51, 0.08);
        }

        .input-field:focus {
          border-color: #192133;
          box-shadow: 0 0 0 3px rgba(25, 33, 51, 0.1);
        }

        .input-field:disabled {
          background: #f9fafb;
          color: #9ca3af;
          cursor: not-allowed;
          border-color: #e5e7eb;
        }

        .input-field.has-icon {
          padding-right: 44px;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #192133;
          margin-bottom: 6px;
          letter-spacing: 0.01em;
        }

        .input-star {
          color: #AC292A;
          margin-left: 3px;
        }

        .input-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .input-field:focus ~ .input-icon {
          color: #192133;
        }

        
      `}</style>

      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {star && <span className="input-star">{star}</span>}
        </label>
      )}

      <div className="relative">
        <input
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={name}
          type={type}
          required={required}
          disabled={disabled}
          className={`input-field ${Icon ? "has-icon" : ""} ${className}`}
        />
        <div className="focus-bar" />
        {Icon && (
          <div className="input-icon">
            {Icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;