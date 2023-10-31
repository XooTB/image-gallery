import React, { useState } from "react";
import ImageCard from "./ImageCard";
import Button from "./Button";

interface ImageGalleryProps {
  images: {
    title: string;
    src: string;
  }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageClick = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((el) => el !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between py-3 px-5">
        <h1 className="text-xl">{selectedImages.length} Items selected</h1>
        <div className="flex gap-3">
          <Button className="hover:bg-red-500">Delete</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5 px-20 py-5">
        {images.map((image, i) => (
          <ImageCard
            title={image.title}
            imageUrl={image.src}
            key={i}
            handleClick={handleImageClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
