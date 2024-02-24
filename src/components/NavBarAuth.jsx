import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import styles from './NavBar.module.scss';

const NavBarAuth = (props) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                    <Container>
                        <div className={`${styles.navbarPadding}`}>
                            <Navbar.Brand href="/"><span className={`${styles.textWhite}`}>IT-training</span></Navbar.Brand>
                            <Nav className="me-auto" variant="tabs" defaultActiveKey="/">
                                <Nav.Link href="/auth/auth_form"><span className={`${styles.textWhite}`}>Войти</span></Nav.Link>
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

export default NavBarAuth;