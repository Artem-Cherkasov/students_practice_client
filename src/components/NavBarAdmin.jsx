import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import styles from './NavBar.module.scss';

const NavBarAdmin = (props) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                    <Container>
                        <div className={`${styles.navbarPadding}`}>
                            <Navbar.Brand href='/admin/main'><span className={`${styles.textWhite}`}>IT-training</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Nav className="me-auto" variant="tabs" defaultActiveKey="/">
                                <Nav.Link href="/admin/departments"><span className={`${styles.textWhite}`}>Кафедры</span></Nav.Link>
                                <Nav.Link href="/admin/employees"><span className={`${styles.textWhite}`}>Сотрудники</span></Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown className={`${styles.dropdown_title}`} title={<span className={`${styles.textWhite}`}>Admin</span>} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item href="/admin/profile">Профиль</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => localStorage.clear()} href="/auth/auth_form">Выйти</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </div>
                    </Container>
            </Navbar>
        </div>
    );
};

/*<Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/">Мероприятия</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/students">Студенты</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="companies">Компании</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="documents">Документы</Nav.Link>
                </Nav.Item>
            </Nav>*/

export default NavBarAdmin;