import React, { useState } from "react";
import ImageCard from "./ImageCard";
import Button from "./Button";
import {
  DragDropContext,
  Draggable,
  Droppable,
  Direction,
} from "@hello-pangea/dnd";

interface ImageGalleryProps {
  imagesData: {
    title: string;
    src: string;
    id: number;
  }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imagesData }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState(imagesData);

  const handleImageClick = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((el) => el !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);

    setImages(items);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex w-full justify-between py-3 px-5">
        <h1 className="text-xl">{selectedImages.length} Items selected</h1>
        <div className="flex gap-3">
          <Button className="hover:bg-red-500">Delete</Button>
        </div>
      </div>

      <div className="w-4/5 border px-2 py-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="Images" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-5 gap-5"
              >
                {images.map(({ title, src, id }, i) => (
                  <Draggable key={id} draggableId={title} index={i}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="first:col-span-2 first:row-span-2"
                      >
                        <ImageCard
                          title={title}
                          imageUrl={src}
                          handleClick={handleImageClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ImageGallery;
