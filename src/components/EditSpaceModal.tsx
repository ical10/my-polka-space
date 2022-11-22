import { useState, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import type { SpaceData } from "@subsocial/api/types";
import { useSubSocialApiHook } from "src/hooks/use-subsocial-api";
import { useWalletStore } from "src/store";

type EditSpaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editedSpace: SpaceData | null;
};

const EditSpaceModal = ({
  isOpen,
  onClose,
  editedSpace,
}: EditSpaceModalProps) => {
  useEffect(() => {
    if (editedSpace && editedSpace.content) {
      setSelectedTags([...editedSpace.content.tags]);
      setUpdatedName(editedSpace.content.name);
      setUpdatedAbout(editedSpace.content.about);
    }
  }, [editedSpace]);

  const { updateSpace } = useSubSocialApiHook();

  const { account } = useWalletStore((state) => ({
    account: state.account,
  }));

  const [selectedTags, setSelectedTags] = useState([""]);
  const [updatedName, setUpdatedName] = useState(editedSpace?.content?.name);
  const [updatedAbout, setUpdatedAbout] = useState(editedSpace?.content?.about);

  const handleClose = () => {
    onClose();
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(event.target.value);
  };

  const handleChangeAbout = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedAbout(event.target.value);
  };

  const handleLog = () => {
    console.log({ account, editedSpace, updatedName, updatedAbout });
    updateSpace({
      account: account!,
      spaceId: editedSpace?.id!,
      name: updatedName!,
      about: updatedAbout!,
      tags: selectedTags,
    });
  };

  if (!editedSpace || (editedSpace && !editedSpace.content)) return null;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </label>
        <h3 className="font-bold text-lg">Edit space details</h3>
        <div className="form-control w-full max-w-lg">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={updatedName}
            onChange={handleChangeName}
            placeholder="Type space name here"
            className="input input-info bg-white w-full max-w-lg"
          />

          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={updatedAbout}
            onChange={handleChangeAbout}
            placeholder="Type space description here"
            className="textarea textarea-info bg-white w-full max-w-lg"
          />

          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <TagsInput
            value={selectedTags}
            onChange={setSelectedTags}
            name="tags"
            placeHolder="enter tags"
          />
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleLog}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSpaceModal;
