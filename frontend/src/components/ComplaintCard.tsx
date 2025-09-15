"use client";

import React from 'react';
import { ComplaintResponse } from '@/interfaces/complaint';
import { ComplaintStatus } from '@/interfaces/enum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Mail, MessageSquare } from 'lucide-react';

interface ComplaintCardProps {
  complaint: ComplaintResponse;
}

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  const getStatusVariant = (status: ComplaintStatus) => {
    switch (status) {
      case ComplaintStatus.RESOLVED:
        return 'default' as const;
      case ComplaintStatus.IN_PROGRESS:
        return 'secondary' as const;
      default:
        return 'destructive' as const;
    }
  };

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case ComplaintStatus.RESOLVED:
        return 'bg-green-50 text-green-700 border-green-200';
      case ComplaintStatus.IN_PROGRESS:
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const handleViewDetails = (id: number) => {
    // Handle view details action - can be navigation or modal
    console.log('View details for complaint:', id);
  };

  return (
    <Card className="w-full h-full min-h-[280px] hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden group">
      <CardHeader className="pb-4 bg-gradient-to-r  border-b border-gray-100">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              Complaint #{complaint.id}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-indigo-600 truncate">
                {complaint.customerEmail}
              </span>
            </div>
          </div>
          <Badge 
            variant={getStatusVariant(complaint.status)}
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(complaint.status)} shrink-0`}
          >
            {complaint.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-start gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
              <h4 className="text-sm font-medium text-gray-900">Description</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed pl-6 line-clamp-3">
              {complaint.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 pl-6">
            <Calendar className="w-4 h-4" />
            <span>Created {new Date(complaint.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button
            onClick={() => handleViewDetails(complaint.id)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            size="sm"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}