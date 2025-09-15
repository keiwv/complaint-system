import { cookies } from 'next/headers';
import Link from 'next/link';
import ComplaintForm from "@/views/ComplaintForm";
import ManagementComplaints from "@/views/ManagementComplaints";
import { TabContentProps } from "@/interfaces/Tab/tab";

/* This component renders the content area based on the active tab */
export default async function TabContent({ activeTab }: TabContentProps) {
    // Access cookies in server component
    const cookieStore = cookies();
    const userSession = (await cookieStore).get('token');
    
    // You can now use cookie data for conditional rendering or pass to child components
    
    switch (activeTab) {
        case "view-complaints":
            if (!userSession) {
                return (
                    <div className="w-full bg-gray-50 flex items-center justify-center py-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
                            <p className="text-red-500 mb-4 text-lg">Please log in to view complaints.</p>
                            <Link 
                                href="/login"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Go to Login
                            </Link>
                        </div>
                    </div>
                );
            }
            return <div className="w-full"><ManagementComplaints /></div>;
        case "submit-complaint":
        default:
            return (
                <div className="w-full bg-gray-50 flex justify-center">
                    <div className="max-w-2xl w-full">
                        <ComplaintForm />
                    </div>
                </div>
            );
    }
}


