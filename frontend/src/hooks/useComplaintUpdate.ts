import { useState, useEffect } from 'react';
import { ComplaintStatus } from '@/interfaces/enum';
import { ComplaintResponse } from '@/interfaces/complaint';
import { useUpdateComplaint } from './useComplaint';

export function useComplaintUpdate(complaint: ComplaintResponse | null, onUpdate: () => void) {
    const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus | ''>('');
    const [dueDateValue, setDueDateValue] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { updateComplaint: updateComplaintData, loading: updateLoading, error: updateError } = useUpdateComplaint();

    // Initialize form fields with complaint data
    useEffect(() => {
        if (complaint) {
            setSelectedStatus(complaint.status);
            if (complaint.dueDate) {
                const date = new Date(complaint.dueDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                setDueDateValue(`${year}-${month}-${day}`);
            } else {
                setDueDateValue('');
            }
        }
    }, [complaint]);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleUpdate = async () => {
        if (!complaint) return;

        const updateData: any = {};
        let messages: string[] = [];
        
        if (selectedStatus !== complaint.status) {
            updateData.status = selectedStatus;
            messages.push('The status has been updated');
        }
        
        const currentDueDate = complaint.dueDate ? (() => {
            const date = new Date(complaint.dueDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        })() : '';
        
        if (dueDateValue !== currentDueDate) {
            updateData.dueDate = dueDateValue;
            messages.push('Due date has been changed');
        }

        if (Object.keys(updateData).length === 0) {
            return; // Nothing to update
        }

        try {
            await updateComplaintData(complaint.id.toString(), updateData);
            await onUpdate();
            setSuccessMessage(messages.join(' and '));
        } catch (err) {
            console.error('Failed to update complaint:', err);
        }
    };

    return {
        selectedStatus,
        setSelectedStatus,
        dueDateValue,
        setDueDateValue,
        handleUpdate,
        updateLoading,
        updateError,
        successMessage
    };
}
