import React from "react";

const Select = ({
  label,
  name,
  className = "",
  onChange,
  value,
  required,
  onBlur,
  star,
  disabled = false,
  children,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="block pb-1.5 text-[#213554] text-sm font-semibold mb-1"
        >
          {label}
          {star && <span className="text-[#EE334B] ml-1">{star}</span>}
        </label>
      )}
      <div className="relative">
        <select
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          required={required}
          disabled={disabled}
          className={`w-full border-2 border-gray-200 rounded-lg bg-white text-sm text-[#213554] px-4 py-2.5 outline-none focus:border-[#213554] focus:ring-2 focus:ring-[#213554]/20 transition-all duration-300 shadow-sm hover:border-[#213554]/50 hover:shadow-md disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:border-gray-200 disabled:hover:shadow-sm appearance-none cursor-pointer group ${className}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23213554'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25rem',
            paddingRight: '2.5rem'
          }}
        >
        {placeholder && (
          <option value="" disabled style={{ color: '#9ca3af' }}>
            {placeholder}
          </option>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              style: { 
                color: '#213554',
                backgroundColor: '#ffffff',
                padding: '0.5rem'
              }
            });
          }
          return child;
        })}
      </select>
      {/* Hover indicator */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#213554]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Select;

