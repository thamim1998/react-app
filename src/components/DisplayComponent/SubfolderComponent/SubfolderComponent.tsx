import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CreateComponent from "../../CreateComponent/CreateComponent";
import DisplayComponent from "../DisplayComponent";
import "./SubfolderComponent.css";
import { useLocation } from "react-router-dom";

interface fileData {
  docName: string;
  path: string;
  type: string;
}

function SubfolderComponent() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [fileData, setFiledata] = useState<fileData[]>([]);

  useEffect(() => {
    let currentPath = window.location.pathname;
    const fetchData = async () => {
      try {
        const response = await axios.get<fileData[]>(
          `http://localhost:4000/api/fileSystem/doc?path=${currentPath}`,
        );
        setFiledata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location]);

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
            <img src="/assets/icons/add-folder.png" alt="Folder" />
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

export default SubfolderComponent;
