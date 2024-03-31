import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
};

const CreateComponent: React.FC<ModalProps> = ({ showModal, onClose }) => {
  const [fileName, setFilename] = useState("");
  const [path, setPath] = useState('');

  const handleClose = () => {
    console.log(showModal);
  };

  const createFolderFile = (event: any) => {
    event.preventDefault();
    const data = { fileName };
    const isFolder = data.fileName;
    let type;
    if (isFolder.includes(".")) {
      type = "file";
    } else {
      type = "folder";
    }
    console.log(window.location.href);
    const url = new URL(window.location.href);

    const pathname = url.pathname;
    console.log("path", pathname);

    setPath(pathname === "/" ? "root" : pathname);

    console.log(
      { docName: data.fileName, type: type, path: pathname },
      "registration",
    );

    axios
      .post("http://localhost:4000/api/fileSystem/add", {
        docName: data.fileName,
        type: type,
      })
      .then((response) => {
        console.log(response);
        alert("successful created ");
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };

  return (
    <Modal show={showModal} onHide={onClose} className="modal-style">
      <Modal.Header closeButton>
        <Modal.Title>Create a Folder/File</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={(event) => createFolderFile(event)}>
          <input
            type="text"
            className="input-modal"
            placeholder="folder-name"
            value={fileName}
            onChange={(e) => setFilename(e.target.value)}
          />
          {fileName}
          <div>
            {/* <Button onClick={onClose}>Close</Button> */}
            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateComponent;
