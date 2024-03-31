import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import ContextMenuComponent from "./ContextMenuComponent/ContextMenuComponent";
import "./DisplayComponent.css";

interface FolderIconProps {
  onClick: () => void;
}
interface FileIconProps {
  onClick: () => void;
}

const FolderIcon: React.FC<FolderIconProps> = ({ onClick }) => (
  <img src="/assets/icons/folder-icon.png" alt="Folder Icon" onClick={onClick} />
);
const FileIcon: React.FC<FileIconProps> = ({ onClick }) => (
  <img src="/assets/icons/file-icon.png" alt="File Icon" onClick={onClick} />
);

type DisplayProps = {
  docName: string;
  type: string;
  path: string;
  onDelete: (newObject: { docName: string; path: string; type: string }) => void;
};

const DisplayComponent: React.FC<DisplayProps> = ({ docName, type, path, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleFolderIconClick = () => {
    setShowMenu(!showMenu)
  }

  const handleDelete = () => {
    onDelete({ docName, path, type });
  };

  return (
    <Col lg={12} className="mt-2 mb-4 text-center folder-icon">
      {type === "folder" ? (
        <div style={{ position: 'relative' }}>
        <FolderIcon onClick={handleFolderIconClick} />
        {showMenu && (
          <div className="context-menu" style={{ position: 'absolute', top: '0px', right: 0 }}>
            <ContextMenuComponent showMenu={showMenu} path={path} type={type} docName={docName} 
        onDelete={handleDelete}
        />
          </div>
        )}
      </div>
      ) : (
        <div style={{ position: 'relative' }}>
        <FileIcon onClick={handleFolderIconClick} />
        {showMenu && (
          <div className="context-menu" style={{ position: 'absolute', top: '0px', right: 0 }}>
            <ContextMenuComponent showMenu={showMenu} path={path} type={type} docName={docName} 
        onDelete={handleDelete}
        />
          </div>
        )}
      </div>
      )}
      <p>{docName}</p>
    </Col>
  );
};

export default DisplayComponent;
