import React, { useState } from "react";
import Button from "./Button";
import imagesAll from "../constants/images";
import ImageCard from "./ImageCard";
import Placeholder from "./Placeholder";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
interface ImageGalleryProps {
  imagesData: {
    title: string;
    src: string;
    id: number;
  }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({}) => {
  // Component States.
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [images, setImages] = useState(imagesAll);
  const [activeId, setActiveId] = useState<any>(null);

  // Grid Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Click and Drag Handler functions
  //
  // Handles the Image Selection logic.
  const handleImageClick = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((el) => el !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  // Handles the DragStart Event Logic
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
  }

  // Handles the DragEnd Event logic.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((images) => {
        const oldIndex = images.findIndex((el) => el.id === active.id);
        const newIndex = images.findIndex((el) => el.id === over?.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }
  }

  // Handles the Deletion Logic for the Images.
  function handleDelete() {
    setImages(images.filter((img) => !selectedImages.includes(img.id)));
    setSelectedImages([]);
  }

  // Return Image Gallery JSX
  //
  return (
    <div>
      <div className="flex justify-between py-5">
        <h1 className="text-xl">{selectedImages.length} are selected</h1>
        {selectedImages.length ? (
          <Button onClick={handleDelete}>Delete</Button>
        ) : null}
      </div>

      <div className="flex flex-col items-center justify-center">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={images}>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-[900px] list-none border px-8 py-9 rounded-lg ">
              {images.map(({ id, title, src }) => (
                <ImageCard
                  key={id}
                  id={id}
                  title={title}
                  imageUrl={src}
                  handleClick={handleImageClick}
                />
              ))}
            </ul>
            {/* Overlay Placeholder for the Dragable component.*/}
            <DragOverlay>
              {activeId ? <Placeholder id={activeId} /> : null}
            </DragOverlay>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ImageGallery;
