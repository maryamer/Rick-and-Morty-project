import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, onOpen, open }) {
  if (!open) return null;
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 overflow-hidden">
      <div
        className="backdrop fixed top-0 bottom-0 right-0 left-0 overflow-hidden"
        onClick={() => onOpen(false)}
      ></div>
      ;
      <div className="modal z-50">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
