import styles from './Header.module.scss';
import NavBarAdmin from './NavBarAdmin';
import NavBarAuth from './NavBarAuth';
import NavBarCompany from './NavBarCompany';
import NavBarEmployee from './NavBarEmployee';
import NavBarStudent from './NavBarStudent'

const Header = () => {
    switch (window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"))) {
        case "/employee":
            return (
                <header className={`${styles.header}`}>
                    <NavBarEmployee />
                </header>
            );

        case "/student":
            return (
                <header className={`${styles.header}`}>
                    <NavBarStudent />
                </header>
            );

        case "/company":
            return (
                <header className={`${styles.header}`}>
                    <NavBarCompany />
                </header>
            );

        case "/auth":
            return (
                <header className={`${styles.header}`}>
                    <NavBarAuth />
                </header>
            );

        case "/admin":
            return (
                <header className={`${styles.header}`}>
                    <NavBarAdmin />
                </header>
            )

        case "":
            return (
                <header className={`${styles.header}`}>
                    <NavBarAuth />
                </header>
            )

        default:
            break;

    }

    // if(props.path === "/auth") {
    //     if(props.path === "/departments") {
    //         return (
    //             <header className={`${styles.header}`}>
    //                 <NavBarAdmin />
    //             </header>
    //         )
    //     }
    //     else {
    //         return (
    //             <header className={`${styles.header}`}>
    //                 <NavBarAuth />
    //             </header>
    //         );
    //     }
    // }
    // else {
    //     return (
    //         <header className={`${styles.header}`}>
    //             <NavBar />
    //         </header>
    //     );
    // }
}

export default Header;