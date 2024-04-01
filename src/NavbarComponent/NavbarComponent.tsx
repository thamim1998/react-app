import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import "./NavbarComponent.css";
import Row from "react-bootstrap/Row";

function NavbarComponent() {
  return (
    <Navbar className="nav-head">
      <Container>
        <Navbar.Brand className="nav-div">
          <span className="title"> CoCrafter File Management System </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form>
            <Row>
              <div className="wrap">
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Search a file or folder"
                  />
                  <button className="searchButton" disabled>
                    <img
                      className="search-image"
                      src="/assets/icons/search.svg"
                      alt="Logo"
                    />
                  </button>
                </div>
              </div>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
