import { useState } from "react";
import "./App.css";

import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";

import photoList from "./assets/photoList.json";

function App() {
  const photoArray: { thumbnail: string; fullRes: string }[] = [];

  const [photo, setPhoto] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [detail, setDetail] = useState<boolean>(false);

  // Parse photo list into src
  for (const photo in photoList) {
    photoArray.push({
      thumbnail: `/photos/thumbnails/${photoList[photo]} (Phone).jpg`,
      fullRes: `/photos/1080p/${photoList[photo]} (Large).jpg`,
    });
  }

  return (
    <>
      <ImageGallery
        photos={photoArray}
        onImageClick={(photo, index) => {
          setDetail(true);
          setPhoto(photo);
          setIndex(index);
        }}
      />
      <Modal
        detail={detail}
        switchDetail={setDetail}
        photo={photo}
        changeIndex={setIndex}
        index={index}
      />
    </>
  );
}

export default App;
