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

/**
 * ImageCard component displays an image with a checkbox and a title.
 * It also allows the user to drag and drop the image to reorder it.
 * @param imageUrl - The URL of the image to display.
 * @param title - The title of the image.
 * @param id - The unique identifier of the image.
 * @param handleClick - The function to call when the checkbox is clicked.
 */

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

  /**
   * Toggles the state of the checkbox and calls the handleClick function.
   */
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
