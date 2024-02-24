import React from 'react';
import styles from './Home.module.scss'

const Home = () => {

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Главная</span>
                </div>
            </div>
        </div>
    );
};

export default Home;