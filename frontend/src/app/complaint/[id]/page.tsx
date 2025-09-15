'use client';

import { useParams, useRouter } from 'next/navigation';
import { ComplaintStatus } from '@/interfaces/enum';
import { useComplaint } from '@/hooks/useComplaint';
import { useComplaintUpdate } from '@/hooks/useComplaintUpdate';

export default function ComplaintDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    
    const { complaint, loading, error, refetch } = useComplaint(id);
    const {
        selectedStatus,
        setSelectedStatus,
        dueDateValue,
        setDueDateValue,
        handleUpdate,
        updateLoading,
        updateError,
        successMessage
    } = useComplaintUpdate(complaint, refetch);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
    if (!complaint) return <div className="p-6">Complaint not found</div>;

    const getStatusColor = (status: ComplaintStatus) => {
        switch (status) {
            case ComplaintStatus.RESOLVED:
                return 'bg-green-100 text-green-800';
            case ComplaintStatus.IN_PROGRESS:
                return 'bg-yellow-100 text-yellow-800';
            case ComplaintStatus.PENDING:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Complaint Details
                        </h1>
                        <button
                            onClick={() => router.back()}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Back to List
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Complaint ID</label>
                            <p className="mt-1 text-sm text-gray-900">#{complaint.id}</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                            <p className="mt-1 text-sm text-gray-900">{complaint.customerEmail}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Current Status</label>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(complaint.status)}`}>
                                {complaint.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Due Date</label>
                            <p className="mt-1 text-sm text-gray-900">
                                {complaint.dueDate ? new Date(complaint.dueDate).toLocaleDateString() : 'Not set'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Created Date</label>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(complaint.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(complaint.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                            <p className="text-sm text-gray-900">{complaint.description}</p>
                        </div>
                    </div>

                    {/* Update Section */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Update Complaint</h3>
                        
                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-green-800 text-sm">{successMessage}</p>
                            </div>
                        )}
                        
                        {updateError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-800 text-sm">{updateError}</p>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Status Update */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select 
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value as ComplaintStatus)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={ComplaintStatus.PENDING}>Pending</option>
                                    <option value={ComplaintStatus.IN_PROGRESS}>In Progress</option>
                                    <option value={ComplaintStatus.RESOLVED}>Resolved</option>
                                </select>
                            </div>

                            {/* Due Date Update */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDateValue}
                                    onChange={(e) => setDueDateValue(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Update Button */}
                        <button
                            onClick={handleUpdate}
                            disabled={updateLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {updateLoading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 