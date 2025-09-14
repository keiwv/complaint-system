"use client";

import { useComplaintForm } from "@/hooks/useComplaintForm";

export default function ComplaintForm() {
    const { formData, isSubmitting, message, updateField, handleSubmit } =
        useComplaintForm();

    return (
        <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    Submit Complaint
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.customerEmail}
                            onChange={(e) =>
                                updateField("customerEmail", e.target.value)
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Complaint Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                updateField("description", e.target.value)
                            }
                            required
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                            placeholder="Describe your complaint in detail..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Complaint"}
                    </button>
                </form>
                
                {/* Display Message once the complaint is submitted */}
                {message && (
                    <div
                        className={`mt-4 p-3 rounded-md text-sm ${
                            message.includes("successfully")
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
