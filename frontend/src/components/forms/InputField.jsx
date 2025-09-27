import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "Name",
  required = false,
  className = "",
  ...rest 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 relative">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        // Add right padding to prevent text from going under the icon
        className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      />
      {/* Conditionally render the button only for password inputs */}
      {type === "password" && (
        <button
          type="button"
          onClick={toggleShowPassword}
          // Position the button absolutely within the relative container
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default InputField;