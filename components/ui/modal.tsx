const Modal = ({
  open,
  children,
  position = "center",
  overlay,
  onClose,
}: any) => {
  return (
    open && (
      <div
        className={`${
          overlay ? "bg-[#00000080]" : ""
        } fixed top-0 left-0 w-screen h-screen z-[4] `}
      >
        <div
          className={`fixed left-16 z-[5] w-[calc(100%_-_64px)]  outline-0 flex justify-center ${
            position === "center" ? "h-full items-center" : ""
          }`}
        >
          <div className="z-[9] bg-white relative m-auto rounded-lg p-[10px]">
            <button
              onClick={onClose}
              className="cursor-pointer border-0 rounded-[50%] absolute z-[10] top-[-10px] bg-[#475569] h-[26px] w-[26px] right-[-10px] flex items-center justify-center"
            >
              <img src="assets/icons/close-white.svg" alt="close icon" />
            </button>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
