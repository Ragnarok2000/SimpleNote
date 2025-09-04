import React, { useEffect, useState } from 'react';
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  getNoteById
} from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', shareUrl: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getAllNotes();
      const data = res.data;

      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.warn('Expected array, received:', data);
        setNotes([]);
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
      setNotes([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional validation for shareUrl
    if (form.shareUrl && !form.shareUrl.startsWith('http')) {
      alert('Please enter a valid Share URL starting with http or https');
      return;
    }

    try {
      const payload = {
        title: form.title,
        content: form.content,
        shareUrl: form.shareUrl
      };

      if (editingId) {
        await updateNote(editingId, payload);
        setEditingId(null);
      } else {
        const res = await createNote(payload);
        const newNote = res.data;
        await updateNote(newNote.id, payload);
      }

      setForm({ title: '', content: '', shareUrl: '' });
      fetchNotes();
    } catch (err) {
      console.error('Error submitting note:', err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getNoteById(id);
      const { title, content, shareUrl } = res.data;
      setForm({
        title: title || '',
        content: content || '',
        shareUrl: shareUrl || ''
      });
      setEditingId(id);
    } catch (err) {
      console.error('Error loading note for edit:', err);
    }
  };

  const handleCancelEdit = () => {
    setForm({ title: '', content: '', shareUrl: '' });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 My Notes</h1>

      {/* Note Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
          rows="4"
          className="w-full border px-4 py-2 rounded resize-none"
        />
        <input
          name="shareUrl"
          value={form.shareUrl}
          onChange={handleChange}
          placeholder="Share URL (optional)"
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update Note' : 'Create Note'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Notes List */}
      <div className="grid gap-4">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="text-gray-700 whitespace-pre-line">{note.content}</p>

                <Link
                  to={`/note/${note.id}`}
                  className="inline-block mt-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-200"
                >
                  🔗 View Note
                </Link>

                {/* Share URL Block */}
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Share URL:</span>{' '}
                  {note.shareUrl ? (
                    <>
                      <a
                        href={note.shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {note.shareUrl}
                      </a>
                      <button
                        onClick={() => handleCopyLink(note.shareUrl)}
                        className="ml-2 text-xs text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700"
                      >
                        📋 Copy
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-400">Not provided</span>
                  )}
                </div>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(note.id)}
                  className="text-sm bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notes found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;