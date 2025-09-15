import { useState, useEffect } from 'react';
import { ComplaintResponse, ComplaintUpdate } from '@/interfaces/complaint';
import { getComplaint, updateComplaint } from '@/services/api/api';

export function useComplaint(id: string) {
    const [complaint, setComplaint] = useState<ComplaintResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchComplaint();
    }, [id]);

    const fetchComplaint = async () => {
        try {
            setLoading(true);
            const data = await getComplaint(id);
            setComplaint(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch complaint');
        } finally {
            setLoading(false);
        }
    };

    return { complaint, loading, error, refetch: fetchComplaint };
}

export function useUpdateComplaint() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateComplaintData = async (complaintId: string, updateData: ComplaintUpdate) => {
        try {
            setLoading(true);
            setError(null);
            const updated = await updateComplaint(complaintId, updateData);
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update complaint');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateComplaint: updateComplaintData, loading, error };
}

