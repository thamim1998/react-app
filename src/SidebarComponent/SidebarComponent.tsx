import "./SidebarComponent.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li> <span> <img src="/assets/icons/recent.png"/> </span> Recent</li>
        <li> <span> <img src="/assets/icons/starred.png"/> </span> Starred</li>
        <li> <span> <img src="/assets/icons/home.png"/> </span>  Home </li>
        <li> <span> <img src="/assets/icons/documents.png"/> </span> Documents</li>
        <li> <span> <img src="/assets/icons/download.png"/> </span> Downloads </li>
        <li> <span> <img src="/assets/icons/music.png"/> </span> Music </li>
      </ul>
    </div>
  );
};

export default Sidebar;
