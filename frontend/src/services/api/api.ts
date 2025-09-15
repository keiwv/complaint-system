import { ComplaintResponse, ComplaintCreate, ComplaintUpdate } from "@/interfaces/complaint";
import { LoginCredentials, LoginResponse } from "@/interfaces/login/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


function getAuthHeaders(): HeadersInit {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
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


export async function updateComplaintStatusApi(complaint: ComplaintUpdate, complaintId: number): Promise<ComplaintResponse> {
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

export async function getComplaintsServerSide(token: string): Promise<ComplaintResponse[]> {
    const response = await fetch(`${API_URL}/complaints`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch complaints');
    }
    return response.json();
}

