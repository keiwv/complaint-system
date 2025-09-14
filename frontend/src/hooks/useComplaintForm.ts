import { useState } from "react";
import { ComplaintCreate } from "@/interfaces/complaint";
import { createComplaint } from "@/api/api";


export const useComplaintForm = () => {
    const [formData, setFormData] = useState<ComplaintCreate>({
        customerEmail: "",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const updateField = (field: keyof ComplaintCreate, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({ customerEmail: "", description: "" });
        setMessage("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await createComplaint(formData);

            if (response) {
                setMessage("Complaint submitted successfully");
                setFormData({ customerEmail: "", description: "" });
            } else {
                setMessage("Error submitting complaint. Please try again.");
            }
        } catch (error) {
            setMessage("Error submitting complaint. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        message,
        updateField,
        resetForm,
        handleSubmit,
    };
};
