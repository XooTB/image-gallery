import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

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
