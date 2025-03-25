/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";

import Intro from "./components/Intro";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import ScrollButton from "./components/ScrollButton";

import photoList from "./assets/photoList.json";

function App() {
  const photoArray: { thumbnail: string; fullRes: string }[] = [];

  const [index, setIndex] = useState<number>(0);
  const [detail, setDetail] = useState<boolean>(false);

  // Trigger URL parameter photo display
  useEffect(() => {
    const params = new URLSearchParams(document.location.search);

    if (params) {
      const query: number | null = Number(params.get("i"));
      if (query) {
        openPhoto(query);
      }
    }
  }, []);

  // Parse photo list into src
  for (const photo in photoList) {
    photoArray.push({
      thumbnail: `/photos/thumbnails/${photoList[photo]} (Phone).jpg`,
      fullRes: `/photos/1080p/${photoList[photo]} (Large).jpg`,
    });
  }

  // Handle opening photo detail
  const openPhoto = (index: number) => {
    setDetail(true);
    if (index > -1 && index < photoArray.length) {
      setIndex(index);
      history.pushState({}, "", `?i=${index}`);
    }
  };

  return (
    <>
      <Intro />
      <ImageGallery
        photos={photoArray}
        onImageClick={(_photo, index) => {
          openPhoto(index);
        }}
      />
      <Modal
        detail={detail}
        switchDetail={setDetail}
        photo={photoArray[index]?.fullRes}
        changeIndex={openPhoto}
        index={index}
      />
      <ScrollButton />
    </>
  );
}

export default App;
