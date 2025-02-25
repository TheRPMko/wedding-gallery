// ImageGallery.tsx
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Define the type for props
interface ImageGalleryProps {
  photos: { thumbnail: string; fullRes: string }[];
  onImageClick: (src: string, index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  const [visiblePhotos, setVisiblePhotos] = useState(photos.slice(0, 20));
  const [hasMore, setHasMore] = useState(photos.length > 20);

  // Provide more photos to load
  const fetchMoreData = () => {
    const nextBatch = photos.slice(
      visiblePhotos.length,
      visiblePhotos.length + 20
    );
    setVisiblePhotos((prev) => [...prev, ...nextBatch]);

    if (visiblePhotos.length + 20 >= photos.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="flex flex-row flex-wrap justify-center">
      <InfiniteScroll
        dataLength={visiblePhotos.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h2>Loading more images...</h2>}
        className="flex flex-row flex-wrap justify-center"
      >
        {photos ? (
          visiblePhotos.map((photo, index) => (
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
      </InfiniteScroll>
    </div>
  );
};

export default ImageGallery;
