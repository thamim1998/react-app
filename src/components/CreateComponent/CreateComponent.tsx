import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CreateComponent.css";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  onObjectAdded: (newObject: any) => void;
};

const CreateComponent: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onObjectAdded,
}) => {
  const [fileName, setFilename] = useState("");

  let currentPath = window.location.pathname;

  const createFolderFile = (event: any) => {
    event.preventDefault();
    const data = { fileName };
    const isFolder = data.fileName;
    let type: string;
    if (isFolder.includes(".")) {
      type = "file";
    } else {
      type = "folder";
    }

    axios
      .post("http://localhost:4000/api/fileSystem/add", {
        docName: data.fileName,
        type: type,
        path: currentPath,
      })
      .then((response) => {
        onObjectAdded({
          docName: data.fileName,
          type: type,
          path: currentPath,
        });
        alert("successful created ");
        setFilename("");
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };

  return (
    <Modal show={showModal} onHide={onClose} className="modal-style mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Create a Folder or File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Note - Enter extension to create a file (eg: Image.png)</p>
        <form onSubmit={(event) => createFolderFile(event)}>
          <input
            type="text"
            className="input-modal"
            placeholder="Create"
            value={fileName}
            onChange={(e) => setFilename(e.target.value)}
          />
          <div>
            <Button className="p-2 mt-1 mb-2" variant="secondary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateComponent;
