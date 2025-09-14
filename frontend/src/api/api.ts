import { ComplaintCreate, ComplaintResponse } from '@/interfaces/complaint';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
