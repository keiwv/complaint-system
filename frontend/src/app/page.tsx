import TabNavigator from '@/components/Tab/TabNavigator';
import { PageProps } from '@/interfaces/Tab/tab';

export default function Page({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Complaints
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create complaints and manage them
          </p>
        </div>
        
        <TabNavigator searchParams={searchParams} />
      </div>
    </main>
  );
}
