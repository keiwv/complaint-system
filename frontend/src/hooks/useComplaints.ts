"use client";

import { useState, useEffect } from "react";
import { ComplaintResponse, ComplaintUpdate } from "@/interfaces/complaint";
import { ComplaintStatus } from "@/interfaces/enum";
import { getComplaints } from "@/services/api/api";
import { updateComplaintStatusApi } from "@/services/api/api";

interface UseComplaintsProps {
    initialComplaints?: ComplaintResponse[];
}

interface UseComplaintsReturn {
    complaints: ComplaintResponse[];
    loading: boolean;
    error: string | null;
    updateComplaintStatus: (
        complaintId: number,
        newStatus: ComplaintUpdate
    ) => Promise<void>;
    refreshComplaints: () => Promise<void>;
    addNote: (complaintId: number) => void;
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

    const updateComplaintStatus = async (
        complaintId: number,
        newStatus: ComplaintUpdate
    ) => {
        try {
            const response = await updateComplaintStatusApi(
                newStatus,
                complaintId
            );

            if (!response) {
                throw new Error("Failed to update complaint status");
            }

            // Optimistically update the local state
            setComplaints((prev) =>
                prev.map((complaint) =>
                    complaint.id === complaintId
                        ? { ...complaint, status: newStatus.status }
                        : complaint
                )
            );
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to update status"
            );
            console.error("Failed to update complaint status:", err);
        }
    };

    const addNote = (complaintId: number) => {
        // For now, just show an alert - can be enhanced later with modal or navigation
        alert(`Add note for complaint ID: ${complaintId}`);
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
        updateComplaintStatus,
        refreshComplaints,
        addNote,
    };
}
