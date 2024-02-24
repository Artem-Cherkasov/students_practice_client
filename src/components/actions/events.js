import axios from "axios";

export const getEvents = () => {
    return axios.get('http://localhost:5000/api/events/getAll');
    // return async (dispatch) => {
    //     const response = axios.get('http://localhost:5000/api/events/getAll')
    // }
}