import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateComponent from "../CreateComponent/CreateComponent";

interface FileSystemResponse {
  fileSystem: fileData[]; // Define the structure of a single FileSystemResponse
}

interface fileData {
  name: string;
  path: string;
  type: string;
}

const FolderIcon = () => (
  <img src="./assets/icons/folder-icon.png" alt="Folder Icon" />
);
const FileIcon = () => (
  <img src="./assets/icons/file-icon.png" alt="File Icon" />
);

function RootComponent() {
  const [showModal, setShowModal] = useState(false);
  const [fileData, setFiledata] = useState<fileData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FileSystemResponse[]>(
          "http://localhost:4000/api/fileSystem",
        );
        console.log("res", response.data);
        if (response.data.length > 0) {
          // Assuming the response contains an array of FileSystemResponse
          setFiledata(response.data[0].fileSystem); // Access the 'fileSystem' property of the first FileSystemResponse
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <Container>
      <div>
        {fileData ? (
          <ul>
            {fileData.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
        {/* <Link to={`/${id}`}>
      <FolderIcon/>
        Thamim
      </Link> */}
      </div>
      <button onClick={handleShowModal}>Show Modal</button>
      {/* <ModalComponent showModal={showModal} onClose={handleCloseModal} /> */}

      <CreateComponent showModal={showModal} onClose={handleCloseModal} />
    </Container>
  );
}

export default RootComponent;
