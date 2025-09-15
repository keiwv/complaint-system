import { ComplaintResponse, ComplaintCreate, ComplaintUpdate } from "@/interfaces/complaint";
import { LoginCredentials, LoginResponse } from "@/interfaces/login/auth";
import { NoteCreate } from "@/interfaces/note";
import { API_URL } from "./URL";


function getAuthHeaders(): HeadersInit {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}


export async function createComplaint(complaint: ComplaintCreate): Promise<ComplaintResponse> {
    const response = await fetch(`${API_URL}/complaints`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaint),
    });

    if (!response.ok) {
        throw new Error('Failed to create complaint, please try again later.');
    }

    return response.json();
}


export async function updateComplaintStatusApi(complaint: ComplaintUpdate, complaintId: string): Promise<ComplaintResponse> {
    const response = await fetch(`${API_URL}/complaints/${complaintId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(complaint),
    });

    if (!response.ok) {
      throw new Error('Failed to update status');
    }
    return response.json();
}

export async function getComplaints(): Promise<ComplaintResponse[]> {
    const response = await fetch(`${API_URL}/complaints`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch complaints');
    }
    return response.json();
}

export async function getComplaint(id: string): Promise<ComplaintResponse> {
    const response = await fetch(`${API_URL}/complaints/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch complaint');
    }
    return response.json();
}

export async function updateComplaintNotes(complaintId: string, notes: string): Promise<ComplaintResponse> {
    const response = await fetch(`${API_URL}/complaints/${complaintId}/notes`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes }),
    });

    if (!response.ok) {
        throw new Error('Failed to update notes');
    }
    return response.json();
}

export async function updateComplaint(complaintId: string, complaint: ComplaintUpdate): Promise<ComplaintResponse> {
    const response = await fetch(`${API_URL}/complaints/${complaintId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(complaint),
    });

    if (!response.ok) {
        throw new Error('Failed to update complaint');
    }
    return response.json();
}


export async function getNotesFromComplaint(complaintId: Number)
{
    const response = await fetch(`${API_URL}/notes/complaint/${complaintId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return response.json();
}

export async function createNoteForComplaint(complaintId: Number, note: NoteCreate)
{
    const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(note),
    });
    if (!response.ok) {
        throw new Error('Failed to create note');
    }
    return response.json();

}