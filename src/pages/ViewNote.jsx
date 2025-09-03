import React, { useEffect, useState } from 'react';
import { getNoteById } from '../services/api';
import { useParams } from 'react-router-dom';

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNoteById(id).then(res => setNote(res.data));
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
  <h2 className="text-3xl font-bold text-gray-800 mb-4">{note.title}</h2>
  
  <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">
    {note.content}
  </p>
  
  <p className="text-sm text-gray-600">
    <span className="font-semibold">Share URL:</span> {note.shareUrl}
  </p>
</div>

  );
};

export default ViewNote;