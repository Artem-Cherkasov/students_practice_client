import React, { useState, useEffect } from "react";
import axios from "axios";

const trainingTypeURL = 'http://localhost:5000/api/trainingTypes/getOneTrainingType/';

const Places = props => {
    const [trainingType, setTrainingType] = useState([]);

    useEffect(() => {
        axios.get(trainingTypeURL + props.offer.id_training_type).then(response => setTrainingType(response.data))
    }, []);

    return (
        <span>{`${trainingType.places_taken}/${trainingType.places_total} мест`}</span>
    )
}

export default Places;