import React from 'react';
import OffersTable from './OffersTable';
import styles from './Offers.module.scss';

const Offers = () => {
    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.title}`}>Предложения</span>
                </div>
                <div className={`${styles.table_content}`}>
                    <OffersTable />
                </div>
            </div>
        </div>
    );
};

export default Offers;