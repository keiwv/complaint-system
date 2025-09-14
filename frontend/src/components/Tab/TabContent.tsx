import ComplaintForm from "@/views/ComplaintForm";
import ManagementComplaints from "@/views/ManagementComplaints";
import { TabContentProps } from "@/interfaces/Tab/tab";

/* This component renders the content area based on the active tab */
export default function TabContent({ activeTab }: TabContentProps) {
    switch (activeTab) {
        case "view-complaints":
            return <ManagementComplaints />;
        case "submit-complaint":
        default:
            return <ComplaintForm />;
    }
}
