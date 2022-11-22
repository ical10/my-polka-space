type EditSpaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditSpaceModal = ({ isOpen, onClose }: EditSpaceModalProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const temp = e.target.value;
      console.log({ temp });
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </label>
        <h3 className="font-bold text-lg">Edit space details</h3>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type space name here"
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            placeholder="Type space description here"
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <input
            type="text"
            placeholder="Type tags here"
            className="input input-bordered w-full max-w-xs"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="modal-action">
          <label htmlFor="my-modal" className="btn">
            Yay!
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditSpaceModal;
