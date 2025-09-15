import { useState, useEffect, useCallback } from 'react';
import { NoteResponse, NoteCreate } from '@/interfaces/note';
import { getNotesFromComplaint, createComplaint, createNoteForComplaint } from '@/services/api/api';

export const useNotes = (complaintId: Number) => {
    const [notes, setNotes] = useState<NoteResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getNotesFromComplaint(complaintId);
            setNotes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    }, [complaintId]);

    const createNote = async (noteData: Omit<NoteCreate, 'complaintId'>) => {
        try {
            setCreateLoading(true);
            setCreateError(null);
            const newNote = await createNoteForComplaint(complaintId, {
                ...noteData,
                complaintId: parseInt(complaintId as unknown as string)
            });
            setNotes(prev => [newNote, ...prev]);
            return newNote;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create note';
            setCreateError(errorMessage);
            throw err;
        } finally {
            setCreateLoading(false);
        }
    };

    useEffect(() => {
        if (complaintId) {
            fetchNotes();
        }
    }, [complaintId, fetchNotes]);

    return {
        notes,
        loading,
        error,
        createNote,
        createLoading,
        createError,
        refetch: fetchNotes
    };
};
