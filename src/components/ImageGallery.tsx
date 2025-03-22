// ImageGallery.tsx
import React, { useEffect, useRef, useState } from "react";
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
  const [isReady, setIsReady] = useState(document.readyState === "complete");

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

  const targetImageRef = useRef(null);

  // Make sure we only add observers once the DOM is loaded
  useEffect(() => {
    const onReady = () => {
      if (document.readyState === "complete") {
        setIsReady(true);
      }
    };

    document.addEventListener("readystatechange", onReady);

    if (document.readyState === "complete") {
      setIsReady(true);
    }

    return () => document.removeEventListener("readystatechange", onReady);
  }, []);

  // IntersectionObserver, refreshed when DOM is ready + when InfiniteLoader adds photos (to catch the index once it exists)
  useEffect(() => {
    if (!isReady || !targetImageRef.current) return;

    // Add smooth transition to the background color
    document.body.style.transition = "background-color 1s ease-in-out";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].boundingClientRect.y < 0) {
          document.body.style.backgroundColor = "#242424"; // Change to dark
        } else {
          document.body.style.backgroundColor = ""; // Reset to default
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(targetImageRef.current);

    return () => observer.disconnect();
  }, [isReady, visiblePhotos]);

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
              ref={index === 253 ? targetImageRef : null}
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
