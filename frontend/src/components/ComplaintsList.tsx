import React from 'react';
import ComplaintCard from './ComplaintCard';
import { ComplaintResponse } from '@/interfaces/complaint';
import { getComplaints } from '@/services/api/api';



export default async function ComplaintsList() {
  const  complaints : ComplaintResponse[] = await getComplaints();

  if (!complaints) {
    return (
      <div className="w-full bg-gray-50 py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-600 text-lg font-medium">Error fetching complaints</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complaints Management</h1>
        </div>

        {complaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            No complaints found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
