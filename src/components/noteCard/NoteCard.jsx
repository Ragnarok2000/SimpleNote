import React from 'react';
import { deleteNote } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteNote(note.id);
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
  <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
  <p className="text-gray-700 mb-4">{note.content}</p>
  <div className="flex gap-3">
    <button
      onClick={() => navigate(`/note/${note.id}`)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
    >
      View
    </button>
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
    >
      Delete
    </button>
  </div>
</div>
  );
};

export default NoteCard;