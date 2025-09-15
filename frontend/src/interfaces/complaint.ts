import { ComplaintStatus } from "@/interfaces/enum";

export interface ComplaintResponse {
    id: number;
    customerEmail: string;
    description: string;
    status: ComplaintStatus;
    createdAt: string;
    updatedAt: string;
}

export interface ComplaintCreate {
    customerEmail: string;
    description: string;
}

export interface ComplaintUpdate {
    status: ComplaintStatus;
}