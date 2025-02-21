// ImageGallery.tsx
import React from "react";

// Define the type for props
interface ImageGalleryProps {
  photos: { thumbnail: string; fullRes: string }[];
  onImageClick: (src: string, index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {photos ? (
        photos.map((photo, index) => (
          <img
            className="object-cover object-center h-80 w-120 p-4 cursor-pointer hover:scale-105 duration-300"
            key={index}
            src={photo.thumbnail}
            alt={`Photo ${index + 1}`}
            style={{ aspectRatio: "auto" }}
            onClick={() => onImageClick(photo.fullRes, index)}
          />
        ))
      ) : (
        <p>No photos available</p>
      )}
    </div>
  );
};

export default ImageGallery;
