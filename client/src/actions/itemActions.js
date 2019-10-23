import axios from 'axios';
import {GET_ITEMS, GET_ITEMS_BY_ID, ADD_ITEMS, DELETE_ITEMS} from './types';

export const getRecientes = () => dispatch => {
    axios
        .get('/api/items/recent/')
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            });
        });
}

export const getById = id => dispatch => {
    axios
        .get(`/api/items/${id}`)
        .then(res => {
            dispatch({
                type: GET_ITEMS_BY_ID,
                payload: res.data
            })
        });
}