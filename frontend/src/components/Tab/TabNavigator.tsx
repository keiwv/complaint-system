import { Suspense } from 'react';
import TabContent from './TabContent';
import TabHeader from './TabHeader';
import { Tab, PageProps } from '@/interfaces/Tab/tab';

const tabs: Tab[] = [
  {
    id: 'submit-complaint',
    label: 'Submit Complaint',
  },
  {
    id: 'view-complaints',
    label: 'View Complaints',
  }
];

export default async function TabNavigator({ searchParams }: PageProps) {
  const params = await searchParams;
  let activeTab: string = 'submit-complaint';
  
  /* Determine the active tab from URL parameters */
  if (params?.tab) {
    activeTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  }

  return (
    <div className="w-full">
      <TabHeader tabs={tabs} activeTab={activeTab} /> {/* Tab header for navigation */}
      
      <div className="mt-8 flex justify-center">
        <Suspense fallback={<div>Loading...</div>}> {/* Suspense for lazy loading the tab content */}
          <TabContent activeTab={activeTab} />
        </Suspense>
      </div>
    </div>
  );
}