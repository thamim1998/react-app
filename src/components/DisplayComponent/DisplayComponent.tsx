import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DisplayComponent.css";

const FolderIcon = () => (
<img src="/assets/icons/folder-icon.png" alt="Folder Icon" />
);
const FileIcon = () => (
<img src="/assets/icons/file-icon.png" alt="File Icon" />
);

type DisplayProps = {
  docName: string;
  type: string;
  path: string;
};

const DisplayComponent: React.FC<DisplayProps> = ({ docName, type, path }) => {
  return (
    <Col  lg={12} className="mt-2 mb-4 text-center folder-icon">
      {type === "folder" ? <Link to={`${path}/${docName}`}> <FolderIcon /></Link>  : <FileIcon />}
      <p>{docName}</p>
    </Col>
  );
};

export default DisplayComponent;
