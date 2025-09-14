export interface ComplaintResponse {
    id: number;
    customerEmail: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
    createdAt: string;
    updatedAt: string;
}

export interface ComplaintCreate {
    customerEmail: string;
    description: string;
}