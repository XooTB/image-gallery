import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

/**
 * A reusable button component with customizable onClick function, children, and className.
 * @param onClick - The function to be executed when the button is clicked.
 * @param children - The content to be displayed inside the button.
 * @param className - The additional class name(s) to be applied to the button.
 * @returns A button element with the specified properties.
 */

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
