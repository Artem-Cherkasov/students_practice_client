import React, { useState, useEffect } from 'react';
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import styles from './NavBar.module.scss';

const NavBarCompany = (props) => {
    const user = JSON.parse(localStorage.getItem("user_info"))
    const department = JSON.parse(localStorage.getItem("department"))
    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                    <Container>
                        <div className={`${styles.navbarPadding}`}>
                            <Navbar.Brand href="/company/main"><span className={`${styles.textWhite}`}>IT-training</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Nav className="me-auto" variant="tabs" defaultActiveKey="/">
                                <Nav.Link href="/company/events"><span className={`${styles.textWhite}`}>Мероприятия</span></Nav.Link>
                                <Nav.Link href="/company/students"><span className={`${styles.textWhite}`}>Студенты</span></Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown className={`${styles.dropdown_title}`} title={<span className={`${styles.textWhite}`}>{user.name}</span>} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item href="/company/profile">Профиль</NavDropdown.Item>
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

export default NavBarCompany;