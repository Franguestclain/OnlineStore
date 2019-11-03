import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return errores

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
}

// Limpiar errores

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
}