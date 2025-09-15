'use client';

import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { NoteResponse } from '@/interfaces/note';

interface NotesProps {
    complaintId: number;
}

export default function Notes({ complaintId }: NotesProps) {
    const { notes, loading, error, createNote, createLoading, createError } = useNotes(complaintId);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteContent.trim()) return;

        try {
            await createNote({
                content: newNoteContent.trim(),
                authorId: 1 // TODO: Replace with actual user ID from auth context
            });
            setNewNoteContent('');
            setShowCreateForm(false);
        } catch (err) {
            // Error is handled in the hook
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    // Sort notes by creation date (newest first)
    const sortedNotes = [...notes].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    {showCreateForm ? 'Cancel' : 'Add Note'}
                </button>
            </div>

            {/* Create Note Form */}
            {showCreateForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <form onSubmit={handleCreateNote}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Note Content
                            </label>
                            <textarea
                                value={newNoteContent}
                                onChange={(e) => setNewNoteContent(e.target.value)}
                                placeholder="Enter your note here..."
                                rows={4}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                required
                            />
                        </div>

                        {createError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-800 text-sm">{createError}</p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={createLoading || !newNoteContent.trim()}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {createLoading ? 'Creating...' : 'Create Note'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewNoteContent('');
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="text-gray-500">Loading notes...</div>
                </div>
            )}

            {/* Notes List */}
            {!loading && (
                <div className="space-y-4">
                    {sortedNotes.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No notes found for this complaint.
                        </div>
                    ) : (
                        sortedNotes.map((note: NoteResponse, index: number) => (
                            <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm text-gray-500">
                                        Note #{sortedNotes.length - index}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
                                </div>
                                <div className="text-xs text-gray-400">
                                    Created: {formatDate(note.createdAt)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
