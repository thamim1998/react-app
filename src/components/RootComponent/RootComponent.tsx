import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateComponent from "../CreateComponent/CreateComponent";
import DisplayComponent from "../DisplayComponent/DisplayComponent";

interface fileData {
  docName: string;
  path: string;
  type: string;
}

function RootComponent() {
  const [showModal, setShowModal] = useState(false);
  const [fileData, setFiledata] = useState<fileData[]>([]);

  useEffect(() => {
    let currentPath = window.location.pathname;
    console.log('path', currentPath);
    
    const fetchData = async () => {
      try {
        const response = await axios.get<fileData[]>(
          `http://localhost:4000/api/fileSystem/doc?path=${currentPath}`,
        );
        console.log("thamim", response.data);
        setFiledata(response.data);
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

  const handleObjectAdded = (newObject: {
    docName: string;
    path: string;
    type: string;
  }) => {
    setFiledata((prevFileData) => [...prevFileData, newObject]);
  };

  const handleDeleteItem = (itemToDelete: { docName: string; path: string; type: string }) => {
    setFiledata((prevFileData) =>
      prevFileData.filter(item => !(item.path === itemToDelete.path && item.docName === itemToDelete.docName && item.type === itemToDelete.type))
    );
  };


  return (
    <Container>
      <Row>
        <Col xs={12} md={4} lg={3} className="mt-4">
          <div onClick={handleShowModal}>
            <img src="/assets/icons/add-folder.png" />
          </div>
        </Col>

        {fileData &&
          fileData.map((item, index) => (
            <Col key={index} xs={12} md={4} lg={3} className="mt-2 mb-4">
              <DisplayComponent {...item} onDelete={handleDeleteItem} />
            </Col>
          ))}
      </Row>
      <CreateComponent
        onObjectAdded={handleObjectAdded}
        showModal={showModal}
        onClose={handleCloseModal}
      />
    </Container>
  );
}

export default RootComponent;
