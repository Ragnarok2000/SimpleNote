import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/notes';

export const getAllNotes = () => axios.get(`${BASE_URL}/getAllNotes`);
export const getNoteById = (id) => axios.get(`${BASE_URL}/getNote/${id}`);
export const getNoteByUrl = (url) => axios.get(`${BASE_URL}/getByUrl`, { params: { url }});
export const createNote = (note) => axios.post(`${BASE_URL}/addNote`, note);
export const updateNote = (id, note) => axios.put(`${BASE_URL}/updateNote/${id}`, note);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/removeNote/${id}`);