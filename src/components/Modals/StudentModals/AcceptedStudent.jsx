import React, { useState, useEffect } from 'react';
import axios from "axios";
import { IconContext } from 'react-icons/lib';
import { FaCheck } from "react-icons/fa";

const offersURL = "http://localhost:5000/api/offers/"

const AcceptedStudent = props => {

    const [offersData, setOffers] = useState([])

    useEffect(() => {
        axios.get(offersURL).then((response) => {
            setOffers(response.data);
        });
    }, []);

    return (
        <>
            <IconContext.Provider value={{
                size: '25px'
            }}>
                <div>
                    <FaCheck />
                </div>

            </IconContext.Provider>  
        </>
    );
};

export default AcceptedStudent;