// Modal.tsx
import { createPortal } from "react-dom";

interface ModalProps {
  detail: boolean;
  switchDetail: (value: boolean) => void;
  photo: string;
  changeIndex: (value: number) => void;
  index: number;
}

const Modal: React.FC<ModalProps> = ({
  detail,
  switchDetail,
  photo,
  changeIndex,
  index,
}) => {
  return (
    <div>
      {detail &&
        createPortal(
          <div
            className="modal-backdrop"
            onClick={() => switchDetail(false)}
          />,
          document.getElementById("backdrop-root")!
        )}

      {detail &&
        createPortal(
          <div className="modal">
            <div className="modal-contents">
              <img src={photo} />
              <button
                className="btn btn-primary"
                onClick={() => changeIndex(index - 1)}
              >
                Prev
              </button>
              <button
                className="btn btn-primary"
                onClick={() => changeIndex(index + 1)}
              >
                Next
              </button>
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </div>
  );
};

export default Modal;
