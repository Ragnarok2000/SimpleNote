import React, { useState } from 'react';
import { createNote, updateNote } from '../../services/api';

const NoteForm = ({ existingNote, onSuccess }) => {
  const [note, setNote] = useState(existingNote || { title: '', content: '', shareUrl: '' });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (note.id) {
        await updateNote(note.id, note);
      } else {
        await createNote(note);
      }
      onSuccess();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  return (
    <>
    <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md space-y-4"
>
  <h2 className="text-2xl font-semibold text-gray-800 text-center">
    {note.id ? 'Update Note' : 'Create Note'}
  </h2>

  <input
    name="title"
    value={note.title}
    onChange={handleChange}
    placeholder="Title"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <textarea
    name="content"
    value={note.content}
    onChange={handleChange}
    placeholder="Content"
    required
    rows="5"
    className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    name="shareUrl"
    value={note.shareUrl}
    onChange={handleChange}
    placeholder="Share URL"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
  >
    {note.id ? 'Update' : 'Create'} Note
  </button>
</form>
    </>
  );
};

export default NoteForm;