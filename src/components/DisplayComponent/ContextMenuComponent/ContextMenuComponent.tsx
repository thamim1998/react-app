import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContextMenuComponent.css";

type MenuProps = {
  showMenu: boolean;
  docName: string;
  path: string;
};

const ContextMenuComponent: React.FC<MenuProps> = ({
  showMenu,
  docName,
  path,
}) => {
  const [show, setShow] = useState(false);
  const currentPath = window.location.pathname;
  let isRoot = currentPath === "/";
  return (
    <>
      {showMenu ? (
        <div className="context-menu">
          <ul className="dropdown-content">
            <Link
              className="link-tag"
              to={isRoot ? `/${docName}` : `${path}/${docName}`}
            >
              <li>Open</li>
            </Link>
            <li>Delete</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ContextMenuComponent;
