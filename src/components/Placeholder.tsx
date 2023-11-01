import React from "react";
import images from "../constants/images";

type Props = {
  id: number;
};

/**
 * Placeholder component for Dragable Componenet that displays an image with a given ID.
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the image to display.
 * @returns {JSX.Element} - The rendered image element.
 */

const Placeholder = ({ id }: Props) => {
  const item = images.filter((el) => el.id === id)[0];
  return <img src={item.src} className="w-48 h-48" />;
};

export default Placeholder;
