"use client";

import { useState, useEffect } from "react";
import { ComplaintResponse, ComplaintUpdate } from "@/interfaces/complaint";
import { ComplaintStatus } from "@/interfaces/enum";
import { getComplaints } from "@/services/api/complaint";
import { updateComplaintStatusApi } from "@/services/api/complaint";

interface UseComplaintsProps {
    initialComplaints?: ComplaintResponse[];
}

interface UseComplaintsReturn {
    complaints: ComplaintResponse[];
    loading: boolean;
    error: string | null;
    refreshComplaints: () => Promise<void>;
}

export function useComplaints(): UseComplaintsReturn {
    const [complaints, setComplaints] =
        useState<ComplaintResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchComplaints = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getComplaints();

            if (!response) {
                throw new Error("Failed to fetch complaints");
            }
            setComplaints(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Failed to fetch complaints:", err);
        } finally {
            setLoading(false);
        }
    };

    const refreshComplaints = async () => {
        await fetchComplaints();
    };

    useEffect(() => {
        // Only fetch if we don't have initial complaints and we're authenticated
        if (
            complaints.length === 0 &&
            localStorage.getItem("token")
        ) {
            fetchComplaints();
        }
    }, [complaints.length]);

    return {
        complaints,
        loading,
        error,
        refreshComplaints,
    };
}
