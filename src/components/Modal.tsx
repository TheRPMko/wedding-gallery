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
              <div className="flex flex-row flex-wrap">
                <button
                  className="btn btn-ghost mr-40 mt-2 mb-2 rounded-none hover:outline-1"
                  onClick={() => changeIndex(index - 1)}
                >
                  &lt;
                </button>
                <button
                  className="btn btn-ghost ml-40 mt-2 mb-2 rounded-none hover:outline-1"
                  onClick={() => changeIndex(index + 1)}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </div>
  );
};

export default Modal;
