import axios from 'axios';
import * as type from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: type.FETCH_USER, payload: res.data });
};

export const loadForm = (authId) => async dispatch => {
    
    const res = await axios.get('/api/notes/' + authId)
    dispatch({ type: type.LOAD_FORM, payload: res.data })
}

export const addForm = (data) => async dispatch => {
    const editedData = {
        ...data,
        editedDay: Date.now()
    };
    const res = await axios.post('/api/notes', editedData);
       
    dispatch({ type: type.ADD_FORM, payload: res.data });
};

export const editForm = (data, id) => dispatch => {
    const editedData = {
        ...data,
        editedDay: Date.now()
    };
    dispatch({ type: type.EDIT_FORM, payload: editedData, id: id });
};

export const deleteForm = (data, id) => async dispatch => {
    await axios.delete('/api/notes/' + id, data);
    dispatch({ type: type.DELETE_FORM, id: id });
}

export const updateDB = (data) => async dispatch => {
    data.map(async item => {
        await axios.patch('/api/notes/' + item._id, item)
    });

    dispatch({ type: type.UPDATE_DB });
}
 