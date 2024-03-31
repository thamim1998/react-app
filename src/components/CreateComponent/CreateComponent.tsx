import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  onObjectAdded: (newObject: any) => void; 
};

const CreateComponent: React.FC<ModalProps> = ({ showModal, onClose, onObjectAdded }) => {
  const [fileName, setFilename] = useState("");
  const [path, setPath] = useState('');

  let currentPath = window.location.pathname

  const createFolderFile = (event: any) => {
    event.preventDefault();
    const data = { fileName };
    const isFolder = data.fileName;
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    let type : string;
    if (isFolder.includes(".")) {
      type = "file";
    } else {
      type = "folder";
    }

    setPath(pathname === "/" ? "root" : pathname);

    axios
      .post("http://localhost:4000/api/fileSystem/add", {
        docName: data.fileName,
        type: type,
        path:currentPath
      })
      .then((response) => {
        console.log(response);
        onObjectAdded({
          docName: data.fileName,
          type: type,
          path:currentPath
        }); 
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
          {currentPath}
          <div>
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
