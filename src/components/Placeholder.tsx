import React from "react";
import images from "../constants/images";

type Props = {
  id: number;
};

const Placeholder = ({ id }: Props) => {
  const item = images.filter((el) => el.id === id)[0];
  return <img src={item.src} className="w-48 h-48" />;
};

export default Placeholder;
