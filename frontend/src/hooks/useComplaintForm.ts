import { useState } from "react";
import { ComplaintCreate } from "@/interfaces/complaint";
import { createComplaint } from "@/services/api/api";


export const useComplaintForm = () => {
    const [formData, setFormData] = useState<ComplaintCreate>({
        customerEmail: "",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // To update the field, first parameter is the field name, second is the value
    // This function will update the specific field in the formData state
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
                setMessage("Error submitting complaint. Please try again later.");
            }
        } catch (error) {
            setMessage("Error submitting complaint. Please try again later.");
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
