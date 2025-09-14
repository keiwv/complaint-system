
/* This interface represents the props for the content area of each tab */
export interface TabContentProps {
  activeTab: string;
}

/* This interface represents a single tab with an id and label */
export interface Tab {
  id: string;
  label: string;
}

/* This interface represents the props for the tab header component */
export interface TabHeaderProps {
  tabs: Tab[];
  activeTab: string;
}

/* This interface helps with the props for the page component (routing) */
export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}