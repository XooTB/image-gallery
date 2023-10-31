import React, { useState } from "react";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  handleClick: (image: string) => void;
  ref?: any;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  handleClick,
  ref,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleClick(imageUrl);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg border  px-2 py-2"
      ref={ref}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="absolute"
      />
      <img
        className="w-full hover:cursor-pointer"
        src={imageUrl}
        alt={title}
        onClick={handleCheckboxChange}
      />
    </div>
  );
};

export default ImageCard;
