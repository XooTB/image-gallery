import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  id: number;
  handleClick: (id: number) => void;
  ref?: any;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  id,
  handleClick,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    index: id,
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleClick(id);
  };

  return (
    <li
      className="rounded overflow-hidden shadow-md border px-2 py-2 first:col-span-2 first:row-span-2 border-gray-300"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="absolute"
      />
      <img className="w-full hover:cursor-pointer" src={imageUrl} alt={title} />
    </li>
  );
};

export default ImageCard;
