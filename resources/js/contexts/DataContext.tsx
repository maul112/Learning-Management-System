import { DataContextType } from '@/types';
import { createContext, useContext, useState } from 'react';

type DataContextValue = {
  data: DataContextType | null;
  setData: (data: DataContextType | null) => void;
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: DataContextType;
}) {
  const [data, setData] = useState<DataContextType | null>(
    initialData as DataContextType,
  );

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useData must be used within a DataContextProvider');
  }

  return context;
}
