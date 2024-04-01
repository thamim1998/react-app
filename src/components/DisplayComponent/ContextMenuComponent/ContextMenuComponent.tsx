import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./ContextMenuComponent.css";

type MenuProps = {
  showMenu: boolean;
  docName: string;
  path: string;
  type: string;
  onDelete: (deleteDoc: any) => void;
};

const ContextMenuComponent: React.FC<MenuProps> = ({
  showMenu,
  docName,
  path,
  type,
  onDelete,
}) => {
  const currentPath = window.location.pathname;
  let isRoot = currentPath === "/";

  const handleDeleteDoc = (name: string, type: string, path: string) => {
    const url = "http://localhost:4000/api/fileSystem/delete";
    axios
      .delete(url, {
        data: {
          docName: docName,
          type: type,
          path: path,
        },
      })
      .then((response) => {
        console.log("Document deleted successfully:", response);
        onDelete({
          docName: docName,
          type: type,
          path: currentPath,
        });
        alert("Successfully delete");
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };
  return (
    <>
      {showMenu ? (
        <div className="context-menu">
          <ul className="dropdown-content">
            {type === "folder" ? (
              <Link
                className="link-tag"
                to={isRoot ? `/${docName}` : `${path}/${docName}`}
              >
                <li>Open</li>
              </Link>
            ) : null}
            <li onClick={() => handleDeleteDoc(docName, type, path)}>Delete</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ContextMenuComponent;
